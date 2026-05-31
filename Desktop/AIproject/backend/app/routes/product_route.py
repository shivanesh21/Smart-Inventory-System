from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.models.product_model import Product
from app.schemas.product_schema import ProductCreate

router = APIRouter()

@router.post("/products")
def add_product(product: ProductCreate, db: Session = Depends(get_db)):
    new_product = Product(
        name=product.name,
        category=product.category,
        quantity=product.quantity,
        price=product.price
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return {
        "message": "Product Added Successfully",
        "product": {
            "id": new_product.id,
            "name": new_product.name,
            "category": new_product.category,
            "quantity": new_product.quantity,
            "price": new_product.price,
        }
    }

@router.get("/products")
def get_products(db: Session = Depends(get_db)):
    products = db.query(Product).all()
    return [
        {
            "id": p.id,
            "name": p.name,
            "category": p.category,
            "quantity": p.quantity,
            "price": p.price,
        }
        for p in products
    ]

@router.put("/products/{product_id}")
def update_product(product_id: int, updated_product: ProductCreate, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    product.name = updated_product.name
    product.category = updated_product.category
    product.price = updated_product.price
    product.quantity = updated_product.quantity
    db.commit()
    db.refresh(product)
    return {
        "message": "Product updated",
        "product": {
            "id": product.id,
            "name": product.name,
            "category": product.category,
            "quantity": product.quantity,
            "price": product.price,
        }
    }

@router.delete("/products/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    db.delete(product)
    db.commit()
    return {
        "message": "Product Deleted Successfully"
    }
    