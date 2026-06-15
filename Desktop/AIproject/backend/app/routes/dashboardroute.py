from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.models.product_model import Product
from app.models.sales_model import Sale

router = APIRouter()

@router.get("/dashboard")
def dashboard_data(db: Session = Depends(get_db)):
    products = db.query(Product).all()
    sales = db.query(Sale).all()
    total_products = len(products)
    total_sales = len(sales)
    revenue = sum(s.total_price or 0 for s in sales)
    inventory_value = sum((p.quantity or 0) * (p.price or 0) for p in products)
    low_stock = len([p for p in products if p.quantity < 5])

    return {
        "total_products": total_products,
        "total_sales": total_sales,
        "revenue": revenue,
        "inventory_value": inventory_value,
        "low_stock": low_stock
    }
    
