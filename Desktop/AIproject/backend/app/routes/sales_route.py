from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.product_model import Product
from app.models.sales_model import Sale
from app.schemas.sales_schema import SaleCreate

router = APIRouter()
@router.post("/sales")
def create_sales(sale:create_sales,db:Session=Depends(get_db)):
    product=db.query(product).filter(product.id==sale.product_id).first()
    if not  product:
        return{
            "message":"Prodduct not Found"
            
        }
    if product.quantity<Sale.quantity_sold:
        return{
            "message":"Insufficent stock"
        }
    total_price=(sale.quantity_sold*product.price)
    new_sale=Sale(
        product_id=product.id,
        product_name=product.name,
        quantity_sold=sale.quantity_sold,
        total_price=total_price)
        
    product.quantity-=sale.quantity_sold
    db.add(new_sale)
    db.commit()
    db.refresh(new_sale)
    return{
        "message":"Sales Added",
        "sale":new_sale
        }
@router.get("/sales")
def get_sales(db:Session=Depends(get_db)):
    sales=db.query(sales).all()
    return sales
@router.get("/sales-report")
def sales_report(db:Session=Depends(get_db)):
    sales=db.query(Sale).all()
    return sales
    