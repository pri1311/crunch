from flask import Blueprint, render_template, session
views = Blueprint('views', __name__)
from flask_socketio import SocketIO, send
from .__init__ import User, Workspace,db, Channel,Chats


@views.route('/')
def main_page():
    return render_template("/auth/login-register.html")

@views.route('/chat')
def chat():
    Workspaces = Workspace.query.all()
    Channels = Channel.query.filter_by(wid = Workspaces[0].id).all()
    print(Workspaces[0].id)
    ChannelCount = Channel.query.filter_by(wid = Workspaces[0].id).count()
    print(Channels)
    count = Workspace.query.count()
    username = session['username']
    return render_template('/views/base.html', workspace = Workspaces, count = count, username = username, channels = Channels, channelCount = ChannelCount)

