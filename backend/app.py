import cloudinary.uploader
from flask import Flask, make_response, jsonify, session,request 
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS
from flask_session import Session
from flask_mail import Message,Mail
from models import db, User, Claim, Review,Item_Lost,Category,email_pattern,phone_pattern,Review
import os
from dotenv import load_dotenv
import re
from datetime import datetime, timedelta
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, create_refresh_token, decode_token, jwt_required, get_jwt_identity, JWTManager
from config import ApplicationConfig
import cloudinary
from cloudinary import uploader
from common import get_itemName




# start flask app
app = Flask(__name__)
app.config.from_object(ApplicationConfig)
jwt=JWTManager(app)
bcrypt=Bcrypt(app)
mail=Mail(app)
# cross-origin resource sharing enabling
CORS(app,supports_credentials=True)
# initialize the restful API
api = Api(app)

#Migration initializer
migrate = Migrate(app, db)

#start the flask app
db.init_app(app)

#create context with flask
with app.app_context():
    db.create_all()

app.json.compact = False

# secret key just for testing to be changed later
app.secret_key = os.urandom(24)
# initialize app instance

#function to verify the access_token
def verify_token(token, identity):
        decoded_token = decode_token(token)
        my_identity = decoded_token['sub']
        print(my_identity, identity)
        return my_identity == identity



# index Restful
class Index(Resource):
    def get(self):
        return {'message': 'Welcome to Lost and Found API'}, 200
api.add_resource(Index,'/')

class UserInfo(Resource):
    def get(self):
        users = User.query.with_entities(User.id, User.name).all()
        user_data = [{'id': user.id, 'name': user.name} for user in users]
        if not user_data:
            return make_response(jsonify({"error": "User information loading..."}), 200)
        return make_response(jsonify(user_data), 200)

api.add_resource(UserInfo,'/userInfo')

#Users get,post API endpoints
class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        if not users:
            return make_response(jsonify({"error": "User information loading..."}), 200)
        return make_response(jsonify(users), 200)

    def post(self):
        data = request.get_json()
        name=data.get("name")
        email = data.get("email")
        password = data.get("password")
        phone_number = data.get("phone_number")
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        if not re.match(email_pattern, email):
            response = make_response(jsonify({"error": "Invalid email"}), 402)
            return response
        
        if not re.match(phone_pattern, phone_number):
            response = make_response(jsonify({"error": "Invalid Phone Number"}), 403)
            return response

        user_exists = User.query.filter_by(email=email).first() is not None
        if user_exists:
            response = make_response(jsonify({"error": f"user with email {email} already exists"}), 401)
            return response
        userName_existst=User.query.filter_by(name=name).first() is not None
        if userName_existst:
            response = make_response(jsonify({"error": f"user with name {name} already exists"}), 404)
            return response


        data['password'] = hashed_password
        try:
            new_user = User(**data)
            db.session.add(new_user)
            db.session.commit()

            response=make_response(jsonify({"message":"User added successfully"},201))
            return response
        except Exception as e:
            response=make_response(jsonify({"message":f"{str(e)}"},500))
            return response



api.add_resource(Users, '/users')


#user get ,patch and delete by ID  endpoints 

class UserBy_ID(Resource):
    def get(self,id):
        user=User.query.filter_by(id=id).first()
        if not user:
            return make_response(jsonify({"message" : f"User {id} is not available"}),404)
        return make_response(jsonify(user.to_dict()),200)
    
    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        data = request.get_json()
        if not user:
            return make_response(jsonify({"message": f"User {id} is not available"}), 404)

        for attr, value in data.items():
            if attr == "password":
                hashed_password = bcrypt.generate_password_hash(value).decode('utf-8')
                setattr(user, "password", hashed_password)
            else:
                setattr(user, attr, value)

        db.session.add(user)
        db.session.commit()
        return make_response(jsonify({"user": user.to_dict()}), 200)
        
    def delete(self, id):
        user=User.query.filter_by(id=id).first()
        if not user:
            return make_response(jsonify({"message" : f"User {id} is not available"}),404)
        db.session.delete(user)
        db.session.commit()
        return make_response(jsonify({"message" : f"User {id} has been sucessfully deleted"} ),200)
    
api.add_resource(UserBy_ID,'/users/<int:id>')



#Login endpoint for users with account
class User_Login(Resource):
    def post(self):
        data = request.get_json()
        name=data.get("name")
        email = data.get("email")
        password = data.get("password")
        user = User.query.filter_by(email=email).first()
        
        if user is None:
            return make_response(jsonify({"error": "Account Doesn't Exist!"}), 402)
        elif user.status != "Active":
            return make_response(jsonify({"error": "Account Is deactivated!"}), 400)


        if bcrypt.check_password_hash(user.password, password): 
            session["user_id"] = user.id
            access_token = create_access_token(identity=email)
            refresh_token=create_refresh_token(identity=email)
            session_expiration= datetime.now() + timedelta(minutes=1)
            response_data = {
                "id": user.id,
                "name": user.name,
                "access_token": access_token,
                "refresh_token":refresh_token,
                "session_expiration":session_expiration.timestamp(),
                "role":user.role,
            }
            response=make_response(jsonify(response_data))
            return response
        else:
            response = make_response(jsonify({"error": "Invalid Password"}), 401)
            return response
        
            
    
api.add_resource(User_Login, "/login")

class Forgot(Resource):
    def post(self):
        data=request.get_json()
        email = data.get("email")
        user = User.query.filter_by(email=email).first()
        if user is None:
            return make_response(jsonify({"error": "Account Doesn't Exist!"}), 402)
        
        token=create_access_token(identity=email)
        url=f"http://localhost:5173/reset/{user.id}?{token}"
        msg=Message("Password Reset", sender='no-reply@example.com', recipients=[email])
        msg.body=f"Click the following link to reset your password: {url}"
        try:
            mail.send(msg)
            return make_response(jsonify({"message": "Email sent successfully"}), 200)
        except Exception as e:
            return make_response(jsonify({"error": f"Failed to send email: {str(e)}"}), 500)

api.add_resource(Forgot, '/forgot')



class Reset(Resource):
    @jwt_required()
    def patch(self, id):
        current_user_email = get_jwt_identity()
      
        token = request.headers.get("Authorization")
        token_part=token.split()
        actual_token=token_part[1]
        if not verify_token(actual_token, current_user_email):
         
            return make_response(jsonify({"error": "Invalid token"}), 401)
        
        # Check if the user exists and the provided ID matches the current user's ID
        user = User.query.filter_by(id=id, email=current_user_email).first()
        if user is None:
            return make_response(jsonify({"error": "Invalid user "}), 402)

        
        # For example, you might get the new password from the request data and update the user's password
        data = request.get_json()
        for attr, value in data.items():
            if attr == "password":
                hashed_password = bcrypt.generate_password_hash(value).decode('utf-8')
                setattr(user, "password", hashed_password)
            else:
                setattr(user, attr, value)

        db.session.add(user)
        db.session.commit()
        return make_response(jsonify({"message": f"User {id}'s Password is updated"}), 200)

api.add_resource(Reset, '/reset/<int:id>')

        

class RefreshToken(Resource):
    @jwt_required(refresh=True)
    def post(self):
        identity=get_jwt_identity()
        access_token=create_access_token(identity=identity)
        response_data={
            "access":access_token
        }
        response=make_response(jsonify(response_data))
        return response
    
api.add_resource(RefreshToken, '/refresh')







class User_Logout(Resource):
    def post(self):
        data=request.get_json()
        email=data.get("email")
        user=User.query.filter_by(email=email).first()

        if user is None:
            return make_response(jsonify({"error": "Account Doesn't Exist!"}), 401)
        # Clear the JWT cookie by setting it to an empty string and expiring it
        response = make_response(jsonify({"message": f"{user.name} Logged out"}))
        response.set_cookie('access_token', '', expires=0, httponly=True, secure=True, samesite='Strict')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response

api.add_resource(User_Logout, '/logout')

#Lost_reviews Get, Post

class Lost_Items(Resource):

    # @jwt_required()
    def get(self):
        lost_items=[ lost_item.to_dict() for lost_item in Item_Lost.query.all()]
        if not lost_items:
            raise ValueError("item information loading...")
        return make_response(jsonify(lost_items),200)
    
    # @jwt_required()
    def post(self):
        user_id = request.form.get('user_id')
        name = request.form.get('name')
        location = request.form.get('location')
        date = request.form.get('date')
        image_to_upload = request.files['image']
        description = request.form.get('description')
        category_id = request.form.get('category_id')

        print(image_to_upload)

        load_dotenv()
        cloudinary.config(cloud_name=os.getenv('CLOUDINARY_NAME'), api_key=os.getenv('CLOUDINARY_API_KEY'), api_secret=os.getenv('CLOUDINARY_API_SECRET'))
        upload_result = None

        if not image_to_upload:
            return make_response(jsonify({"error": "No image uploaded"}), 401)

        try:
            upload_result = cloudinary.uploader.upload(image_to_upload)
            image = upload_result.get('secure_url')

            new_item = Item_Lost(name=name,user_id=user_id,category_id=category_id,location=location,date=date,image=image,description=description)
    
            db.session.add(new_item)
            db.session.commit()
            msg = Message("New item posted successfully", sender='no-reply@example.com', recipients=["strathnoreply@gmail.com"])
            response = make_response(jsonify({"item": new_item.to_dict()}), 201)
            return response
        except Exception as e:
            return make_response(jsonify({"error": f"Post error: {str(e)}"}), 400)

api.add_resource(Lost_Items, '/lost_items')








#Lost_reviews bY iD get,patch and delete
class Lost_ItemsBy_ID(Resource):
    def get(self,id):
        review=Item_Lost.query.filter_by(id=id).first()
        if not review:
            return make_response(jsonify({"message" : f"item {id} is not available"}),404)
        return make_response(jsonify(review.to_dict()),200)
    def patch(self,id):
        item=Item_Lost.query.filter_by(id=id).first()
        data=request.get_json()
        if not item:
            return make_response(jsonify({"message" : f"item {id} is not available"}),404)
        for attr,value in data.items():
            setattr(item,attr,value)
        db.session.add(item)
        db.session.commit()
        return make_response(jsonify({"item" : item.to_dict()}),200)
    
    def delete(self,id):
        item=Item_Lost.query.filter_by(id=id).first()
        if not item:
            return make_response(jsonify({"message" : f"item {id} is not available"}),404)
        db.session.delete(item)
        db.session.commit()
        return make_response(jsonify({"message" : f"item {id} has been sucessfully deleted"} ),200)


api.add_resource(Lost_ItemsBy_ID,'/lost_items/<int:id>')


#Get and Post for Claims
class Claiming(Resource):
    def get(self):
        claimings = [claiming.to_dict() for claiming in Claim.query.all()]
        if not claimings:
            raise ValueError("Claiming information loading...")
        return make_response(jsonify(claimings), 200)
    
    def post(self):
        
        user_id=request.form.get('user_id')
        item_id=request.form.get('item_id')
        category_id=request.form.get('category_id')
        location=request.form.get('location')
        description_proof=request.form.get('description_proof')
        image=request.files['image_proof']
        # user_name=get_username(user_id)
        item_name=get_itemName(item_id)

        print(image)
        
        load_dotenv()
        cloudinary.config(cloud_name=os.getenv('CLOUDINARY_NAME'), api_key=os.getenv('CLOUDINARY_API_KEY'), api_secret=os.getenv('CLOUDINARY_API_SECRET'))
        upload_result = None

        
        try:
            upload_result=cloudinary.uploader.upload(image)
            image_proof=upload_result.get('secure_url')

            new_claim = Claim(user_id=user_id, item_id=item_id,category_id=category_id,location=location,description_proof=description_proof,image_proof=image_proof)

            db.session.add(new_claim)
            db.session.commit()
            msg=Message("New claim created",sender='no-reply@example.com', recipients=["strathnoreply@gmail.com"])
            msg.body=f"{user_id} has made a claim to {item_name}"
            mail.send(msg)
            response=make_response(jsonify({"New_Claim":new_claim.to_dict()}),201)
        except Exception as e:
            print(new_claim)
            response=make_response(jsonify({"error": f"Claim error: {str(e)}"}), 500) 

        return response

api.add_resource(Claiming, '/claims')

class ClaimingBy_ID(Resource):
    def get(self,id):
        claim=Claim.query.filter_by(id=id).first()
        if not claim:
            return make_response(jsonify({"message" : f"Claim {id} is not available"}),404)
        return make_response(jsonify(claim.to_dict()),200)
    
    def patch(self,id):
        claim=Claim.query.filter_by(id=id).first()
        data=request.get_json()
        if not claim:
            return make_response(jsonify({"message" : f"Claim {id} is not available"}),404)
        
        for attr,value in data.items():
            setattr(claim,attr,value)
        db.session.add(claim)
        db.session.commit()
        return make_response(jsonify({"claim" : claim.to_dict()}),200)
    
    def delete(self,id):
        claim=Claim.query.filter_by(id=id).first()
        if not claim:
            return make_response(jsonify({"message" : f"Claim {id} is not available"}),404)
        db.session.delete(claim)
        db.session.commit()
        return make_response(jsonify({"claim" : f"Claim {id} has been sucessfully deleted"}),200)

api.add_resource(ClaimingBy_ID, '/claims/<int:id>')

class Categories(Resource):
    # @jwt_required()
    def get(self):
        categories = [category.to_dict() for category in Category.query.all()]
        if not categories:
            raise ValueError("Category information loading...")
        return make_response(jsonify(categories), 200)
    
api.add_resource(Categories,'/categories')

class Reviews(Resource):
    def get(self):
        reviews = [review.to_dict() for review in Review.query.all()]
        if not reviews:
            raise ValueError("Reviews information loading...")
        return make_response(jsonify(reviews), 200)
    
    def post(self):
        data = request.get_json()
        new_claim = Review(**data)
        db.session.add(new_claim)
        db.session.commit()
        response=make_response(jsonify({"New_review":new_claim.to_dict()}),201)
        return response
    

api.add_resource(Reviews, '/reviews')
    
class ReviewsBy_ID(Resource):
    def get(self,id):
        review=Review.query.filter_by(id=id).first()
        if not review:
            return make_response(jsonify({"message" : f"review {id} is not available"}),404)
        return make_response(jsonify(review.to_dict()),200)
    def patch(self,id):
        review=Review.query.filter_by(id=id).first()
        data=request.get_json()
        if not review:
            return make_response(jsonify({"message" : f"review {id} is not available"}),404)
        for attr,value in data.items():
            setattr(review,attr,value)
        db.session.add(review)
        db.session.commit()
        return make_response(jsonify({"message" : f"review {id}'s information updated"}),200)
    
    def delete(self,id):
        review=Review.query.filter_by(id=id).first()
        if not review:
            return make_response(jsonify({"message" : f"review {id} is not available"}),404)
        db.session.delete(review)
        db.session.commit()
        return make_response(jsonify({"message" : f"review {id} has been sucessfully deleted"} ),200)
   
        


api.add_resource(ReviewsBy_ID, '/reviews/<int:id>')





if __name__ == "__main__":
    app.run(port=5000, debug=True)

