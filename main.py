from website import create_app,db,Workspace, User, Channel, Chats
from flask_socketio import SocketIO, send, emit, join_room
from flask import session
from flask_login import login_user, logout_user, login_required, current_user

app = create_app()

socketio = SocketIO(app,logger=True, engineio_logger=True)

@socketio.on('message')
def handle_message(data):
    print(data)
    if session.get("USERNAME") is None:
        username = current_user.name
    else:
        username = session['username']
    user = User.query.filter_by(name = username).first()
    if user.workspace_list:
        wlist = user.workspace_list.split()
        wid = int(wlist[0])
        room = Workspace.query.filter_by(id = wid).first()
        join_room(room.name)
    send({"msg": data['data'], "wid":"1", "channel_d":"2"})

@socketio.on('createWorkspace')
def handle_createWorkspace(data):
    print(data)
    w = Workspace()
    w.admin_username = data['username']
    w.name = data['name']
    db.session.add(w)
    db.session.commit()
    room = Workspace.query.filter_by(name = data['name']).first()
    user = User.query.filter_by(name = data['username']).first()
    if user.workspace_list:
        user.workspace_list = user.workspace_list + str(room.id) + " "
    else:
        user.workspace_list = str(room.id) +" "
    db.session.commit()
    print("hello",user.workspace_list)
    join_room(room.name)
    data = {
        "name":data['name'],
        "admin_username": data['username'],
        "id": room.id,
    }
    emit('createWorkspaceJS',data, broadcast=True)

@socketio.on('createChannel')
def handle_createChannel(data):
    c = Channel()
    c.admin_username = data['username']
    c.name = data['name']
    c.wid = data['wid']
    room = Workspace.query.filter_by(id = data['wid']).first()
    db.session.add(c)
    db.session.commit()
    room = Workspace.query.filter_by(id = data['wid']).first()
    data = {
        "name":data['name'],
        "admin_username": data['username'],
        "id": room.id,
        "wid":data['wid'],
    }
    emit('createChannelJS',data, room=room.name, broadcast= True)

@socketio.on('join')
def joinRoom(data):
    if (data['wid']):
        room = Workspace.query.filter_by(id = data['wid']).first()
        join_room(room.name)
    else:
        join_room(data['name'])   

@socketio.on('getChannels')
def sendChannels(data):
    wid = data['wid']
    room = Workspace.query.filter_by(id = wid).first()
    Channels = Channel.query.filter_by(wid = wid).all()
    ch = []
    ChannelCount = Channel.query.filter_by(wid = wid).count()
    i = 0
    for c in Channels:
        ch.append({i:{
            'id': c.id,
            'name': c.name,
            'admin_username': c.admin_username,
            'wid':c.wid
        }})
        i = i + 1
    emit('getChannelsJS', {"channels":ch, "channelCount":ChannelCount, "name":room.name})

@socketio.on('getWorkspaceName')
def get_workspaceName(data):
    wid = data['wid']
    room = Workspace.query.filter_by(id = wid).first()
    emit('changeWorkspaceName', {"name":room.name})

@socketio.on('chatmsg')
def chat_msg(data):
    c = Chats()
    c.message = data['msg']
    c.username = data['username']
    c.wid = data['wid']
    c.channel_id = data['channel_id']
    db.session.add(c)
    db.session.commit()
    print(c)
    wid = data['wid']
    room = Workspace.query.filter_by(id = wid).first()
    join_room(room.name)
    emit('receiveMessage', data, broadcast= True, room=room.name)

@socketio.on('getMessages')
def sendMessages(data):
    chats = Chats.query.filter_by(wid = data['wid'], channel_id = data['channel_id']).all()
    chatscount = len(chats)
    i = 0
    ch = []
    wid = data['wid']
    room = Workspace.query.filter_by(id = wid).first()
    join_room(room.name)
    for c in chats:
        ch.append({i:{
            'id': c.id,
            'message': c.message,
            'username': c.username,
            'wid':c.wid,
            'channel_id': c.channel_id,
        }})
        i = i + 1
    emit('receiveMessageJS', {"chats":ch}, broadcast= True, room=room.name)

if __name__ == '__main__':
    socketio.run(app, debug=True)