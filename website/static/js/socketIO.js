document.addEventListener('DOMContentLoaded', ()=>{
    var socket = io.connect('http://127.0.0.1:5000/' );

    socket.on('connect', function() {
        socket.emit('message',{data: 'I\'m connected!'});
    });

    socket.on('message', data => {
        if (data.wid == "1" && data.channel_id=="2"){
            console.log(data.msg);
        }
    });

    socket.on('receiveMessage', data=>{
        console.log(data)
        var saved = document.getElementById('workspace-id-saved').innerHTML;
        var channelid = document.getElementById('channel-id-saved').innerHTML;
        var username = document.getElementById('username').innerHTML
        if (data['channel_id'].toString() == channelid.toString() && data['wid'].toString()==saved.toString()){
            var list = document.getElementById('chats');
            list.classList.add('chats')
            list.classList.add('flex-column')
            list.classList.add('d-flex')
            if (username == data['username']){
                var div = document.createElement("div");
                var p = document.createElement("p");
                div.classList.add('chatbubble');
                div.classList.add('chatbubble-right');
                p.innerHTML= data['msg']
                div.appendChild(p);
                list.appendChild(div);
            }
            else{
                var div = document.createElement("div");
                var p = document.createElement("p");
                var b = document.createElement("b");
                div.classList.add('chatbubble');
                div.classList.add('chatbubble-left');
                b.innerHTML = data['username']
                p.innerHTML= data['msg']
                div.appendChild(b)
                div.appendChild(p)
                list.appendChild(div);
            }
        }
    })

    socket.on('changeWorkspaceName',data=>{
        var heading = document.getElementById('channel-heading');
        heading.innerHTML = data['name'];
        var saved = document.getElementById('workspace-id-saved');
        socket.emit('join',{wid: saved.innerHTML});
    })

    socket.on('createWorkspaceJS', data => {
        if (username.innerHTML == data['admin_username']){
            var div = document.createElement("div");
            var img = document.createElement("img");
            var span = document.createElement("span");
            span.classList.add('wid');
            div.classList.add('workspace');
            span.innerHTML = data['id'];
            img.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5su_e5EULmaSR0GPr9PxMGcOVm22Tsg5Eyg&usqp=CAU";
            img.classList.add('workspaceIcon');
            div.appendChild(img);
            div.appendChild(span);
            var list = document.getElementById('workspaceList');
            list.appendChild(div);
            div.addEventListener('click',function(){
                var saved = document.getElementById('workspace-id-saved');
                console.log(this.childNodes)
                saved.innerHTML=this.childNodes[1].innerHTML;
                console.log(saved.innerHTML)
                socket.emit('join',{wid: saved.innerHTML});
                socket.emit('getChannels', {wid:saved.innerHTML});
                socket.emit('changeWorkspaceName', {wid:saved.innerHTML});
            })
            socket.emit('join',{wid: data['id']});
        }
    });

    socket.on('createChannelJS', data => {
        var saved = document.getElementById('workspace-id-saved').innerHTML;
        if (data['wid'] == saved){
            const div = document.createElement("div");
            const button = document.createElement("button");
            const span = document.createElement("span");
            var list = document.getElementById('channelList');
            div.classList.add('channel');
            span.classList.add('cid');
            span.innerHTML = data['id'];
            button.innerHTML = "#" + data['name'];
            button.classList.add('channelName');
            div.appendChild(button);
            div.appendChild(span);
            list.appendChild(div);
            div.addEventListener('click', function(){
                var saved = document.getElementById('channel-id-saved');
                console.log(div.childNodes)
                console.log(this.childNodes)
                saved.innerHTML=div.childNodes[1].innerHTML;
                console.log(saved.innerHTML)
                var saved = document.getElementById('workspace-id-saved');
                socket.emit('join',{wid: saved.innerHTML});
                // console.log(this.childNodes[3].innerHTML)
                // console.log(saved.innerHTML)
            })
        }
    });

    socket.on('getChannelsJS', data=>{
        var heading = document.getElementById('channel-heading');
        heading.innerHTML = data['name']
        var list = document.getElementById('channelList');
        removeAllChildNodes(list);
        var channels = data['channels']
        for (var i = 0; i < data['channelCount']; i++){
            const div = document.createElement("div");
            const button = document.createElement("button");
            const span = document.createElement("span");
            div.classList.add('channel');
            button.innerHTML = "#" + channels[i][i].name;
            button.classList.add('channelName');
            span.classList.add('cid');
            span.innerHTML = channels[i][i].wid;
            div.appendChild(button);
            div.appendChild(span);
            list.appendChild(div);
            div.addEventListener('click', function(){
                console.log(div.childNodes)
                console.log(this.childNodes)
                var saved = document.getElementById('channel-id-saved');
                saved.innerHTML=div.childNodes[1].innerHTML;
                console.log(saved.innerHTML)
                var saved = document.getElementById('workspace-id-saved');
                socket.emit('join',{wid: saved.innerHTML});
                // console.log(this.childNodes[3].innerHTML)
                // console.log(saved.innerHTML)
            })
        }
    })


    var createWorkspaceButton = document.getElementById('createWorkspaceButton');
    var createChannelButton = document.getElementById('createChannelButton');
    var sendMessage = document.getElementById('send-message');
    var chatMessageInput = document.getElementById('chatMessageInput');
    var workspaces = document.querySelectorAll('.wid');
    var channels = document.querySelectorAll('.cid');
    var username = document.getElementById('username');

    createWorkspaceButton.addEventListener('click', function(){
        var workspaceNameInput = document.getElementById('workspaceNameInput');
        var workspaceNameUsername = document.getElementById('workspaceNameUsername');
        var createWorkspaceModal = document.getElementById('createWorkspaceModal');
        var blur = document.getElementById('blur');
        createWorkspaceModal.classList.toggle('createWorkspaceModalShow');
        blur.classList.toggle('bluractive');
        // console.log(list)
        socket.emit('createWorkspace', {name: workspaceNameInput.value, username:workspaceNameUsername.value});
    });

    createChannelButton.addEventListener('click', function(){
        // console.log("hello");
        var ChannelNameInput = document.getElementById('ChannelNameInput');
        var ChannelNameUsername = document.getElementById('ChannelNameUsername');
        var createChannelModal = document.getElementById('createChannelModal');
        var blur = document.getElementById('blur');
        var saved = document.getElementById('workspace-id-saved');
        createChannelModal.classList.toggle('createChannelModalShow');
        blur.classList.toggle('bluractive');
        socket.emit('createChannel', {name: ChannelNameInput.value, username:ChannelNameUsername.value, wid: saved.innerHTML});
        ChannelNameInput.value = "";
    });

    sendMessage.addEventListener('click', function(){
        var msg = chatMessageInput.value;
        var saved = document.getElementById('workspace-id-saved').innerHTML;
        var channelid = document.getElementById('channel-id-saved').innerHTML;
        var username = document.getElementById('username').innerHTML
        socket.emit('join',{wid: saved});
        socket.emit('chatmsg', {msg: msg, wid: saved, channel_id:channelid, username:username})
        chatMessageInput.value = ""; 
    });

    for (var w =0; w<workspaces.length;w++){
        var el = workspaces[w].parentNode
        el.addEventListener('click', function(){
            var saved = document.getElementById('workspace-id-saved');
            saved.innerHTML=this.childNodes[3].innerHTML;
            console.log(saved.innerHTML)
            socket.emit('join',{wid: saved.innerHTML});
            socket.emit('getChannels', {wid:saved.innerHTML});
            socket.emit('changeWorkspaceName', {wid:saved.innerHTML});
            // console.log(this.childNodes[3].innerHTML)
            // console.log(saved.innerHTML)
        })
    }

    for (var w =0; w<channels.length;w++){
        var el = channels[w].parentNode
        el.addEventListener('click', function(){
            var saved = document.getElementById('channel-id-saved');
            saved.innerHTML=this.childNodes[3].innerHTML;
            console.log(saved.innerHTML)
            // console.log(this.childNodes[3].innerHTML)
            // console.log(saved.innerHTML)
        })
    }

    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

})