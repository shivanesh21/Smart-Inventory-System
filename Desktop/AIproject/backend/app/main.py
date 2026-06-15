from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.db import engine, Base, SessionLocal
from app.routes.product_route import router as product_router
from app.routes.sales_route import router as sales_router
from app.models.sales_model import sale
from app.models.product_model import Product
from app.models.user_model import User
from app.routes.dashboardroute import router as dashboard_router
from app.routes.forecastroutes import (router as forecast_router)
from app.routes.chatbot_route import (router as chatbot_router)
from app.routes.auth_route import(router as auth_routrer)
import hashlib

app = FastAPI()
Base.metadata.create_all(bind=engine)


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


def create_default_user():
    db = SessionLocal()
    try:
        existing_admin = db.query(User).filter(User.username == "admin").first()
        default_password = "inventoryofficial"
        default_password_hash = hash_password(default_password)
        if existing_admin:
            if existing_admin.password != default_password_hash:
                existing_admin.password = default_password_hash
                db.commit()
        else:
            db.add(User(username="admin", password=default_password_hash))
            db.commit()
    finally:
        db.close()

create_default_user()

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
app.include_router(forecast_router)
app.include_router(chatbot_router)
app.include_router(auth_routrer)
@app.get("/")
def home():
    return {
        "message": "Smart Inventory System API Running"
    }