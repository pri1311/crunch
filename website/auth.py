from flask import Blueprint, render_template,request, redirect, url_for
from . import db
from .__init__ import User

auth = Blueprint('auth', __name__)

@auth.route('/')
def main_page():
    return render_template("/auth/login-register.html")

@auth.route('/signup',methods=['POST'])
def signup_post():
    error=None
    email = request.form.get('email')
    name = request.form.get('name')
    password = request.form.get('password')
    if not password or not email or not name:
        error = "Invalid Credentials. Please try again."
        return render_template("/auth/login-register.html",error=error)

    if User.query.filter_by(name=name).count() == 1:
        error = "Name already taken. Please try again."
        return render_template("/auth/login-register.html",error=error)

    if User.query.filter_by(email=email).count() == 1:
        error = "Email already taken. Please try again."
        return render_template("/auth/login-register.html",error=error)

    u = User()
    u.name = name
    u.email = email
    u.set_password(password)

    db.session.add(u)
    db.session.commit()
    
        
    return render_template("/views/base.html",error=error)

@auth.route('/login', methods=['POST'])
def login_post():
    error = None
    username = request.form.get('username')
    password = request.form.get('password')
    print(username)
    print(password)

    
    if not username or not password:
        error = "Missing Data"
        return render_template("/auth/login-register.html",error=error)

    user = User.query.filter_by(name=username).first()
    if user is None or not user.check_password(password):
        error="Please check your login details and try again."
        return render_template("/auth/login-register.html",error=error)
    
    return render_template("/views/base.html",error=error)    