from pydantic import BaseModel
from datetime import datetime

class CommentBase(BaseModel):
    content: str
    project_id: int

class CommentCreate(CommentBase):
    pass

class CommentResponse(CommentBase):
    id: int
    user_id: int
    created_at: datetime
    username: str
    
    class Config:
        from_attributes = True