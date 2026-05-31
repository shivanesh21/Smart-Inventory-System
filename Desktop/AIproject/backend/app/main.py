from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.db import engine, Base
from app.routes.product_route import router as product_router
from app.routes.sales_route import router as sales_router
from app.models.sales_model import sale
from app.models.product_model import Product
from app.routes.dashboardroute import router as dashboard_router
app = FastAPI()
Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(product_router)
app.include_router(sales_router)
app.include_router(dashboard_router)
@app.get("/")
def home():
    return {
        "message": "Smart Inventory System API Running"
    }