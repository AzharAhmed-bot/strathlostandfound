
from models import User,Item_Lost


def get_username(user_id):
    user=User.query.filter_by(id==user_id).first()
    if user:
        return user.name
    else:
        return {"error":f"Undefined user with user id {user_id}"}

def get_useremail(user_id):
    user=User.query.filter_by(id==user_id).first()
    if user:
        return user.email
    else:
        return {"error":f"Undefined user with user id {user_id}"}
    
def get_itemName(item_id):
    item=Item_Lost.query.filter(id==item_id).first()
    if item:
        return item.name
    else:
        return {"error":f"Undefined user with item id {item_id}"}
