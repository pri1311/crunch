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
    Workspaces = []
    ChannelCount = 0
    count = 0
    if session.get("USERNAME") is None:
        username = current_user.name
    else:
        username = session['username']
    user = User.query.filter_by(name = username).first()
    if user.workspace_list:
        wlist = user.workspace_list.split()
        wlist = [int(i) for i in wlist]
        count = len(wlist)
        for w in wlist:
            Workspaces.append(Workspace.query.filter_by(id = w).first())
    print(username)
    chatscount = 0
    if len(Workspaces) > 0:
        Channels = Channel.query.filter_by(wid = Workspaces[0].id).all()
        print(Workspaces[0].id)
        ChannelCount = Channel.query.filter_by(wid = Workspaces[0].id).count()
        print(Channels)
        if ChannelCount > 0:
            chats = Chats.query.filter_by(wid = Workspaces[0].id, channel_id = Channels[0].id).all()
            chatscount = len(chats)
            if chatscount and chatscount > 0:
                return render_template('/views/base.html', workspace = Workspaces, count = count, channels = Channels, channelCount = ChannelCount,username = username, chats= chats, chatscount = chatscount)
        return render_template('/views/base.html', workspace = Workspaces, count = count, channels = Channels, channelCount = ChannelCount,username = username, chatscount = chatscount)
    return render_template('/views/base.html', workspace = Workspaces, count = count, channelCount = ChannelCount, username = username, chatscount = chatscount)

