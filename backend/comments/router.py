from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from database.connection import get_db
from auth import utils, models as auth_models
from projects import models as project_models
from comments import models, schemas

router = APIRouter(prefix="/comments", tags=["comments"])

@router.post("/", response_model=schemas.CommentResponse)
def create_comment(
    comment: schemas.CommentCreate,
    token: str,
    db: Session = Depends(get_db)
):
    username = utils.verify_token(token)
    if username is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )
    
    user = db.query(auth_models.User).filter(auth_models.User.username == username).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    project = db.query(project_models.Project).filter(project_models.Project.id == comment.project_id).first()
    if project is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    db_comment = models.Comment(
        content=comment.content,
        user_id=user.id,
        project_id=comment.project_id
    )
    
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    
    return schemas.CommentResponse(
        id=db_comment.id,
        content=db_comment.content,
        user_id=db_comment.user_id,
        project_id=db_comment.project_id,
        created_at=db_comment.created_at,
        username=user.username
    )

@router.get("/project/{project_id}", response_model=List[schemas.CommentResponse])
def get_comments_by_project(project_id: int, db: Session = Depends(get_db)):
    comments = db.query(models.Comment).join(auth_models.User).filter(models.Comment.project_id == project_id).all()
    
    result = []
    for comment in comments:
        result.append(schemas.CommentResponse(
            id=comment.id,
            content=comment.content,
            user_id=comment.user_id,
            project_id=comment.project_id,
            created_at=comment.created_at,
            username=comment.user.username
        ))
    
    return result