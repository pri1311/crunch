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
    count = Workspace.query.count()
    ChannelCount = 0
    if len(Workspaces) > 0:
        Channels = Channel.query.filter_by(wid = Workspaces[0].id).all()
        print(Workspaces[0].id)
        ChannelCount = Channel.query.filter_by(wid = Workspaces[0].id).count()
        print(Channels)
        return render_template('/views/base.html', workspace = Workspaces, count = count, channels = Channels, channelCount = ChannelCount)
    return render_template('/views/base.html', workspace = Workspaces, count = count, channelCount = ChannelCount)

