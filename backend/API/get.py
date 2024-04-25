from flask import jsonify, request, make_response
from models import Item_Lost, Review, Category, User

def getData(endpoint):
    if endpoint == 'lost_items':
        lost_items = [lost_item.to_dict() for lost_item in Item_Lost.query.all()]
        if not lost_items:
            raise ValueError("item information loading...")
        return make_response(jsonify(lost_items), 200)

    elif endpoint == 'reviews':
        reviews = [review.to_dict() for review in Review.query.all()]
        if not reviews:
            raise ValueError("Reviews information loading...")
        return make_response(jsonify(reviews), 200)

    elif endpoint == 'categories':
        categories = [category.to_dict() for category in Category.query.all()]
        if not categories:
            raise ValueError("Category information loading...")
        return make_response(jsonify(categories), 200)

    elif endpoint == 'users':
        users = [user.to_dict() for user in User.query.all()]
        if not users:
            raise ValueError("User information loading...")
        return make_response(jsonify(users), 200)

    else:
        return make_response(jsonify({"error": "Invalid endpoint"}), 404)
