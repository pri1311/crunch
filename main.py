from website import create_app,db,Workspace, User, Channel, Chats
from flask_socketio import SocketIO, send, emit, join_room

app = create_app()

socketio = SocketIO(app,logger=True, engineio_logger=True)
# with app.app_context():
#     db.create_all()
#     print("hello")
# # db.create_all(app)

@socketio.on('message')
def handle_message(data):
    print(data)
    send({"msg": data['data'], "wid":"1", "channel_d":"2"})

@socketio.on('createWorkspace')
def handle_createWorkspace(data):
    print(data)
    w = Workspace()
    w.admin_username = data['username']
    w.name = data['name']
    db.session.add(w)
    db.session.commit()
    emit('createWorkspaceJS',data, broadcast=True, namespace='/chat')
    # send({"msg": data['data'], "wid":"1", "channel_d":"2"})

@socketio.on('createChannel')
def handle_createChannel(data):
    print(data)
    c = Channel()
    c.admin_username = data['username']
    c.name = data['name']
    c.wid = data['wid']
    room = Workspace.query.filter_by(id = data['wid']).first()
    print("from workspace")
    print(room.name)
    print("from workspace")
    db.session.add(c)
    db.session.commit()
    emit('createChannelJS',data, room=room.name, broadcast= True)
    # send({"msg": data['data'], "wid":"1", "channel_d":"2"})

@socketio.on('join')
def joinRoom(data):
    print(data['wid'])
    username = "Priya"
    room = Workspace.query.filter_by(id = data['wid']).first()
    print(room.name)
    join_room(room.name)
    

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

if __name__ == '__main__':
    socketio.run(app, debug=True)