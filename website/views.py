from flask import Blueprint, render_template, session
views = Blueprint('views', __name__)
from flask_login import login_user, logout_user, login_required, current_user
from flask_socketio import SocketIO, send
from .__init__ import User, Workspace,db, Channel,Chats


@views.route('/')
def main_page():
    return render_template("/auth/login-register.html")

@views.route('/chat')
@login_required
def chat():
    Workspaces = Workspace.query.all()
    count = Workspace.query.count()
    ChannelCount = 0
    if session['username'] is None:
        username = current_user.name
    else:
        username = session['username']
    print(username)
    if len(Workspaces) > 0:
        Channels = Channel.query.filter_by(wid = Workspaces[0].id).all()
        print(Workspaces[0].id)
        ChannelCount = Channel.query.filter_by(wid = Workspaces[0].id).count()
        print(Channels)
        return render_template('/views/base.html', workspace = Workspaces, count = count, channels = Channels, channelCount = ChannelCount,username = username)
    return render_template('/views/base.html', workspace = Workspaces, count = count, channelCount = ChannelCount, username = username)

