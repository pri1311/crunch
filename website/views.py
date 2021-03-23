from flask import Blueprint, render_template
views = Blueprint('views', __name__)
from flask_socketio import SocketIO, send
from .__init__ import User, Workspace,db


@views.route('/')
def main_page():
    return render_template("/auth/login-register.html")

@views.route('/chat')
def chat():
    Workspaces = Workspace.query.all()
    count = Workspace.query.count()
    return render_template('/views/base.html', workspace = Workspaces, count = count)

