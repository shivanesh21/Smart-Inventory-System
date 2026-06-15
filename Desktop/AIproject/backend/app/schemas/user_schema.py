from pydantic import BaseModel
class usercreate(BaseModel):
    username:str
    password:str
class userlogin(BaseModel):
    username:str
    password:str
    