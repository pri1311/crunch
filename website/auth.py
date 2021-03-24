from flask import Blueprint, render_template, request, redirect, url_for, session
from flask_login import login_user, logout_user, login_required
from . import db
from .__init__ import User
import cloudinary as Cloud
from cloudinary import uploader
from cloudinary.utils import cloudinary_url

auth = Blueprint('auth', __name__)

Cloud.config( 
  cloud_name = "xyz123456789xyz", 
  api_key = "881914523258343", 
  api_secret = "t5p0GTrAArAQGyj2YJUpg3RUeCM" 
)

@auth.route('/signup', methods=['POST', 'GET'])
def signup_post():
    if request.method == 'POST':
        error = None
        email = request.form.get('email')
        name = request.form.get('name')
        password = request.form.get('password')
        print(request.form.get('image'))
        upload_result = uploader.upload(request.form.get('image'))
        # image = Cloud.CloudinaryImage(request.form.get('image'))
        thumbnail_url1, options = cloudinary_url(
                    upload_result['public_id'],
                    format="jpg",
                    crop="fill",
                    width=100,
                    height=100)
        print(image)
        if not password or not email or not name:
            error = "Invalid Credentials. Please try again."
            return render_template("/auth/login-register.html", error=error)

        if User.query.filter_by(name=name).count() == 1:
            error = "Name already taken. Please try again."
            return render_template("/auth/login-register.html", error=error)

        if User.query.filter_by(email=email).count() == 1:
            error = "Email already taken. Please try again."
            return render_template("/auth/login-register.html", error=error)

        # session['username'] = name
        u = User()
        u.name = name
        u.email = email
        u.image = thumbnail_url1
        u.set_password(password)
        session['username'] = name
        db.session.add(u)
        db.session.commit()    
                
        return redirect(url_for('views.chat'))
    else:
        return render_template("/auth/login-register.html")


@auth.route('/login', methods=['POST'])
def login_post():
    error = None
    name = request.form.get('name')
    password = request.form.get('password')
    remember = True if request.form.get('remember') else False

    if not name or not password:
        error = "Missing Data"
        return render_template("/auth/login-register.html", error=error)

    user = User.query.filter_by(name=name).first()
    if user is None or not user.check_password(password):
        error="Please check your login details and try again."
        return render_template("/auth/login-register.html",error=error)
        
    session.pop('username', None)
    login_user(user, remember=remember)
    return redirect(url_for('views.chat'))


@auth.route('/logout')
@login_required
def logout():
    logout_user()
    session.pop('name', None)
    return render_template('/auth/login-register.html')
