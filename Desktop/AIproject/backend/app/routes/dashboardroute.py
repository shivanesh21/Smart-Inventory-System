from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.models.product_model import Product
from app.models.sales_model import sale
router=APIRouter()
@router.get("/dashboard")
def dashboard_data(db:Session=Depends(get_db)):
    Products=db.query(Product).all()
    sales=db.query(sale),all()
    total_product=len(Product)
    total_sales=len(sale)
    revenue=sum(sale.quantity_sold
                for s in sales)
    inventory_value=sum(Product.quantity*Product.price
                        for p in Products)
    low_stock=len([p for p in Products
                   if p.quantity<5])
    return{
        "Total products":total_product,
        "Total sales":total_sales,
        "Inventory value":inventory_value,
        "low_stock":low_stock
    }    