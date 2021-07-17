from website import create_app,db,Workspace, User, Channel, Chats
from flask_socketio import SocketIO, send, emit, join_room
from flask import session
from flask_login import login_user, logout_user, login_required, current_user
import random  
import string
from flask import Blueprint, render_template, session, redirect, request
import cloudinary as Cloud
from cloudinary import uploader
from cloudinary.utils import cloudinary_url

app = create_app()

socketio = SocketIO(app,logger=True, engineio_logger=True)

# copy cloudinary credentials here

@socketio.on('sendimage')
def sendimage(data):
    print("hello")
    if Chats.query.filter_by(id = session['imageid']).count() == 1:
        i = Chats.query.filter_by(id = session['imageid']).first()
        c = Chats.query.filter_by(message = i.message).first()
        session['imageid'] = -1
        data = {
            'id': c.id,
            'message': c.message,
            'username': c.username,
            'wid':c.wid,
            'channel_id': c.channel_id,
            'image': 1
        }
        room = Workspace.query.filter_by(id = c.wid).first()
        join_room(room.name)
        emit('receiveMessage', data, broadcast= True, room=room.name)
        # emit('receiveimage', data, room = session['name'] )

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
    joining_code = random_string(4,2)
    w.joining_code = joining_code
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
        "joining_code": joining_code,
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
    channel = Channel.query.filter_by(name = data['name']).first()
    data = {
        "name":data['name'],
        "admin_username": data['username'],
        "id": channel.id,
        "wid":data['wid'],
    }
    emit('createChannelJS',data, room=room.name, broadcast= True)

@socketio.on('join')
def joinRoom(data):
    if (data['wid']):
        room = Workspace.query.filter_by(id = data['wid']).first()
        join_room(room.name)
    elif (data['name']):
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
    print(wid)
    room = Workspace.query.filter_by(id = wid).first()
    print("hello",room.joining_code)
    emit('changeWorkspaceName', {"name":room.name, "joining_id" :room.joining_code})

@socketio.on('chatmsg')
def chat_msg(data):
    c = Chats()
    c.message = data['msg']
    c.username = data['username']
    c.wid = data['wid']
    c.channel_id = data['channel_id']
    c.image = 0
    data['image'] = 0
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
    channel = Channel.query.filter_by(id = data['channel_id']).first()
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
            'image':c.image
        }})
        i = i + 1
    emit('receiveMessageJS', {"chats":ch, "channel_id":data['channel_id'], "name":channel.name}, broadcast= True, room=room.name)

@socketio.on('joinWorkspace')
def addWorkspace(data):
    user = User.query.filter_by(name = data['username']).first()
    if Workspace.query.filter_by(name = data['name'], joining_code=data['code']).count() == 1:
        join_room(data['name'])
        if user.workspace_list:
            room = Workspace.query.filter_by(name = data['name'],).first()
            join_room(room.name)
            wlist = user.workspace_list.split()
            wlist = [int(i) for i in wlist]
            wid = room.id
            if wid in wlist:
                emit('error', {"msg":"You have already joined the workspace!", "username":data['username']}, room = room.name)
            else:
                user.workspace_list = user.workspace_list + str(room.id) + " "
                emit('workspaceJoined', {"wid": room.id, "username":data['username'], "name": room.name,}, room = room.name)
        else:
            room = Workspace.query.filter_by(name = data['name'],).first()
            user.workspace_list = str(room.id) +" "
            emit('workspaceJoined', {"wid": room.id, "name": room.name, "username":data['username']}, room = room.name)
    db.session.commit()

def random_string(letter_count, digit_count):  
    str1 = ''.join((random.choice(string.ascii_letters) for x in range(letter_count)))  
    str1 += ''.join((random.choice(string.digits) for x in range(digit_count)))  
  
    sam_list = list(str1) # it converts the string to list.  
    random.shuffle(sam_list) # It uses a random.shuffle() function to shuffle the string.  
    final_string = ''.join(sam_list)  
    return final_string 

@app.errorhandler(405)
  
# inbuilt function which takes error as parameter
def not_found(e):
  return render_template("/views/404.html")

@app.errorhandler(404)
  
# inbuilt function which takes error as parameter
def not_found(e):
  return render_template("/views/404.html")


if __name__ == '__main__':
    socketio.run(app, debug=True, port=5000)
