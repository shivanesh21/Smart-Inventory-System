import json
import os
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from app.models.product_model import Product
from app.models.sales_model import Sale


OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://localhost:11434").rstrip("/")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3.2")
OLLAMA_TIMEOUT = float(os.getenv("OLLAMA_TIMEOUT", "30"))


def build_inventory_context(db):
    products = db.query(Product).all()
    sales = db.query(Sale).all()

    low_stock = [product for product in products if product.quantity < 5]
    total_revenue = sum(sale.total_price or 0 for sale in sales)
    total_units_sold = sum(sale.quantity_sold or 0 for sale in sales)

    product_lines = [
        f"- {product.name} | category: {product.category} | stock: {product.quantity} | price: {product.price}"
        for product in products[:50]
    ]
    sales_lines = [
        f"- {sale.product_name} | quantity sold: {sale.quantity_sold} | total: {sale.total_price}"
        for sale in sales[-30:]
    ]

    return "\n".join(
        [
            "Inventory summary:",
            f"Total products: {len(products)}",
            f"Total sales records: {len(sales)}",
            f"Total units sold: {total_units_sold}",
            f"Total revenue: Rs {round(total_revenue, 2)}",
            f"Low stock count: {len(low_stock)}",
            "",
            "Products:",
            "\n".join(product_lines) if product_lines else "No products available.",
            "",
            "Recent sales:",
            "\n".join(sales_lines) if sales_lines else "No sales available.",
        ]
    )


def fallback_answer(message, db):
    query = message.lower()

    if "low stock" in query or "restock" in query:
        products = db.query(Product).all()
        low_stock = [product for product in products if product.quantity < 5]
        if not low_stock:
            return "No low-stock products right now."
        items = ", ".join(
            f"{product.name} ({product.quantity} left)" for product in low_stock
        )
        return f"Restock these products: {items}."

    if "revenue" in query or "sales performance" in query:
        sales = db.query(Sale).all()
        revenue = sum(sale.total_price or 0 for sale in sales)
        units = sum(sale.quantity_sold or 0 for sale in sales)
        return f"Total revenue is Rs {round(revenue, 2)} from {units} units sold."

    if "best" in query or "top" in query:
        sales = db.query(Sale).all()
        totals = {}
        for sale in sales:
            totals[sale.product_name] = totals.get(sale.product_name, 0) + (
                sale.quantity_sold or 0
            )
        if not totals:
            return "No sales data is available yet."
        product, quantity = max(totals.items(), key=lambda item: item[1])
        return f"The best-selling product is {product} with {quantity} units sold."

    if "forecast" in query or "demand" in query or "predict" in query:
        sales = db.query(Sale).all()
        quantities = [sale.quantity_sold or 0 for sale in sales]
        prediction = sum(quantities) / len(quantities) if quantities else 0
        return f"Predicted demand is approximately {round(prediction, 2)} units based on average sales."

    return (
        "I can answer questions about stock availability, low-stock products, "
        "revenue, best-selling products, demand forecasts, and restocking."
    )


def ask_ollama(message, db):
    context = build_inventory_context(db)
    prompt = f"""
You are an AI inventory assistant for a Smart Inventory Management and Demand Forecasting System.
Use only the inventory context below. Be concise, practical, and business-focused.
If the user asks for a restocking or forecasting recommendation, explain the reason briefly.

{context}

User question: {message}
Answer:
""".strip()

    payload = {
        "model": OLLAMA_MODEL,
        "prompt": prompt,
        "stream": False,
        "options": {
            "temperature": 0.2,
        },
    }
    request = Request(
        f"{OLLAMA_HOST}/api/generate",
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    try:
        with urlopen(request, timeout=OLLAMA_TIMEOUT) as response:
            data = json.loads(response.read().decode("utf-8"))
            answer = data.get("response", "").strip()
            return answer or fallback_answer(message, db)
    except (HTTPError, URLError, TimeoutError, json.JSONDecodeError, OSError):
        return fallback_answer(message, db)
