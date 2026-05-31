from pydantic import BaseModel


class ProductCreate(BaseModel):
    name: str
    category: str
    quantity: int
    price: float

    class Config:
        orm_mode = True