from sqlalchemy import Integer,String,Float,Column
from app.database.db import Base
class sale(Base):
    __tablename__ = "sales"
    id=Column(Integer,primary_key=True,index=True)
    product_id=Column(Integer)
    product_name=Column(String)
    quantity_sold=Column(Integer)
    total_price=Column(Float)
    