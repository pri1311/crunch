from website import create_app,db,Workspace, User, Channel, Chats
from flask_socketio import SocketIO, send, emit

app = create_app()

socketio = SocketIO(app)
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
    emit('createWorkspaceJS',data)
    # send({"msg": data['data'], "wid":"1", "channel_d":"2"})

@socketio.on('createChannel')
def handle_createWorkspace(data):
    print(data)
    c = Channel()
    c.admin_username = data['username']
    c.name = data['name']
    c.wid = data['wid']
    db.session.add(c)
    db.session.commit()
    emit('createChannelJS',data)
    # send({"msg": data['data'], "wid":"1", "channel_d":"2"})

@socketio.on('getChannels')
def sendChannels(data):
    wid = data['wid']
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
    emit('getChannelsJS', {"channels":ch, "channelCount":ChannelCount})

if __name__ == '__main__':
    socketio.run(app, debug=True)