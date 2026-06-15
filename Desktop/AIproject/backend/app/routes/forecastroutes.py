from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.models.sales_model import Sale
from app.forecasting.forecast import moving_average
from app.models.product_model import Product
router = APIRouter()
@router.get("/forecast")
def forecast_sales(
    db: Session = Depends(get_db)
):
    sales = db.query(Sale).all()
    sales_data = [
        sale.quantity_sold
        for sale in sales
    ]
    prediction = moving_average(
        sales_data
    )
    return {
        "forecast_quantity": round(prediction, 2)
    }
@router.get("/restock")
def restock_recommendation(
    db: Session = Depends(get_db)
):

    products = db.query(Product).all()

    recommendations = []

    for product in products:

        if product.quantity < 5:

            recommendations.append({

                "product": product.name,

                "current_stock":
                    product.quantity,

                "recommendation":
                    "Restock Immediately"

            })

    return recommendations