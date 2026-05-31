from pydantic import BaseModel
class salescreate(BaseModel):
    product_id=int
    quantity_sold=int 
    