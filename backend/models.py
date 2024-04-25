from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
# from uuid import uuid4
import re
#initialize database
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db=SQLAlchemy(metadata=metadata)
email_pattern=r'^[a-zA-Z]+\.[a-zA-Z]+@strathmore\.edu$'
phone_pattern=r'^\+\d{12}$'

# def get_uuid():
#     return uuid4().hex

#User model
class User(db.Model,SerializerMixin):
    #name for table
    __tablename__="users"
    #columns for users
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120),unique=True,nullable=False)
    password = db.Column(db.String(64),nullable=False)
    Secret=db.Column(db.String, nullable=False ,default="Seaka2244")
    role=db.Column(db.String, nullable=False, default="student")
    phone_number = db.Column(db.String(15))
    status=db.Column(db.String, nullable=False ,default="Active")

    #define backref for one-to-many relationship
    items_lost=db.relationship("Item_Lost", backref='user')
    claims=db.relationship("Claim", backref='user')
    history=db.relationship("History", backref='user')
    reviews=db.relationship("Review", backref='user')

    serialize_rules=('-items_lost.user','-claims.user','-history.user','-reviews.user')


    #function to validate email
    @validates("email")
    def validate_email(self,key,email):
        if not re.match(email_pattern,email):
            raise ValueError('Invalid Email')
        return email
    
    #function to validate phone_number
    @validates("phone_number")
    def validate_number(self,key,phone_number):
        phone_pattern=r'^\+\d{12}$'
        if not re.match(phone_pattern,phone_number):
            raise ValueError('Invalid Phone Number')
        return phone_number
    
#Admin model    
class Admin(db.Model, SerializerMixin):
    #table name
    __tablename__='admins'
    #table columns
    id=db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120),unique=True,nullable=False)
    password = db.Column(db.String(64))
    phone_number = db.Column(db.String(15))

    #function to validate correct email
    @validates("email")
    def validate_email(self,key,email):
        email_pattern=r'^[\w\.-]+@[\w\.-]+\.\w+$'
        if not re.match(email_pattern,email):
            raise ValueError('Invalid Email')
        return email
    #function to validate correct number
    @validates("phone_number")
    def validate_number(self,key,phone_number):
        if not re.match(phone_pattern,phone_number):
            raise ValueError('Invalid Phone Number')
        return phone_number


#Items lost model
class Item_Lost(db.Model, SerializerMixin):
    __tablename__="items_lost"

    serialize_rules=('-user','-category')

    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String)
    user_id=db.Column(db.Integer,db.ForeignKey('users.id'))
    category_id=db.Column(db.Integer,db.ForeignKey('categories.id'))
    location=db.Column(db.String)
    date=db.Column(db.String, nullable=False)
    image=db.Column(db.String(700))
    description=db.Column(db.String(100))
    Status=db.Column(db.String, nullable=False,default="Pending")

    #backref for the necessary foreignkeys
    claims=db.relationship("Claim",backref='item_lost')
    history=db.relationship("History",backref='item_lost')

#Category class to mark the category of item lost
class Category(db.Model,SerializerMixin):
    __tablename__="categories"
    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String, nullable=False)
    item_lost=db.relationship("Item_Lost", backref="category")
    claim=db.relationship("Claim",backref="category")
    serialize_rules=('-item_lost.category','-claim.category')



#Claims model    
class Claim(db.Model, SerializerMixin):
    #table name and columns
    __tablename__="claims"

    serialize_rules=('-user','-item_lost','-category')

    id=db.Column(db.Integer,primary_key=True)
    user_id=db.Column(db.Integer,db.ForeignKey('users.id'))
    category_id=db.Column(db.Integer,db.ForeignKey('categories.id'))
    item_id=db.Column(db.Integer,db.ForeignKey('items_lost.id'))
    location = db.Column(db.String, nullable=False, default="Unknown")
    Status=db.Column(db.String,default="Pending")
    image_proof=db.Column(db.String(700))
    description_proof=db.Column(db.String)

#History model to keep records
class History(db.Model, SerializerMixin):
    __tablename__="history"

    serialize_rules=('-user','-item_lost')

    id=db.Column(db.Integer, primary_key=True)
    user_id=db.Column(db.Integer,db.ForeignKey('users.id'))
    item_id=db.Column(db.Integer,db.ForeignKey('items_lost.id'))
    Status=db.Column(db.String, nullable=False, default="Pending")
    image_proof=db.Column(db.String(700))
    description_proof=db.Column(db.String)


class Review(db.Model,SerializerMixin):
    __tablename__ = "reviews"

    # serialize_rules=('-user')
    serialize_rules=('-user',)

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String,nullable=False)
    rating = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    answer=db.Column(db.String)
    
