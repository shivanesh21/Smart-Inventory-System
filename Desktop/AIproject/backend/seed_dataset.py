import csv
import os
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parent
os.chdir(BACKEND_DIR)

from app.database.db import Base, SessionLocal, engine
from app.models.product_model import Product
from app.models.sales_model import Sale


DATA_DIR = BACKEND_DIR / "app" / "data"
PRODUCTS_FILE = DATA_DIR / "products.csv"
SALES_FILE = DATA_DIR / "sales.csv"


def load_products(db):
    created = 0

    with PRODUCTS_FILE.open(newline="") as file:
        for row in csv.DictReader(file):
            name = row["name"].strip()
            existing_product = db.query(Product).filter(Product.name == name).first()

            if existing_product:
                continue

            db.add(
                Product(
                    name=name,
                    category=row["category"].strip(),
                    quantity=int(row["quantity"]),
                    price=float(row["price"]),
                )
            )
            created += 1

    db.commit()
    return created


def load_sales(db):
    if db.query(Sale).first():
        return 0

    created = 0

    with SALES_FILE.open(newline="") as file:
        for row in csv.DictReader(file):
            product = (
                db.query(Product)
                .filter(Product.name == row["product_name"].strip())
                .first()
            )
            quantity_sold = int(row["quantity_sold"])

            if not product or product.quantity < quantity_sold:
                continue

            total_price = quantity_sold * product.price
            product.quantity -= quantity_sold
            db.add(
                Sale(
                    product_id=product.id,
                    product_name=product.name,
                    quantity_sold=quantity_sold,
                    total_price=total_price,
                )
            )
            created += 1

    db.commit()
    return created


def main():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        products_created = load_products(db)
        sales_created = load_sales(db)
        print(f"Products added: {products_created}")
        print(f"Sales added: {sales_created}")
    finally:
        db.close()


if __name__ == "__main__":
    main()
