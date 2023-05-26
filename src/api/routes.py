"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route('/hello', methods=['GET'])
@jwt_required()
def handle_hello():
    email = get_jwt_identity()

    response_body = {
        "message": "Welcome " + email
    }

    return jsonify(response_body), 200

@api.route('/user', methods=['GET'])
def get_user():
    user = User.query.all()
    all_user = list(map(lambda x: x.serialize(), user))

    return jsonify(all_user), 200

@api.route("/token", methods=["POST"])
def make_token():
    data = request.get_json()

    if not data:
        return jsonify({'error': 'No data provided'}), 400

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    user = User.query.filter_by(email=email).first()

    if not user or user.password != password:
        return jsonify({'error': 'Bad email or password'}), 401        
    

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200

@api.route("/signup", methods=["POST"])
def new_user():
    data = request.get_json()

    if not data:
        return jsonify({"error": "no data provided"}), 400

    email = data.get("email")
    password = data.get("password")  

    if not email or not password:
        return jsonify({"error": "Both email and password are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "email already exits"})

    user = User(email=email, password=password, is_active=True) 
    db.session.add(user)
    db.session.commit()  
    user_email = email

    return jsonify({"msg": "User created successfully", "user": user_email}), 201
