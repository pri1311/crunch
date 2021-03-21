from flask import Flask
from flask_sqlalchemy import SQLAlchemy

import os
# init SQLAlchemy so we can use it later in our models
db = SQLAlchemy()


def create_app():
    current_direc = os.getcwd()
    databasePath = os.path.join(current_direc,"db.sqlite")
    print(databasePath)
    app = Flask(__name__)
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'xyzxyz xyzxyz xyzxyz'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
    
    db.init_app(app)

    with app.app_context():
        db.create_all()
    

    from .views import views
    from .auth import auth

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    return app
