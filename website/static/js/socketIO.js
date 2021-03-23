document.addEventListener('DOMContentLoaded', ()=>{
    var socket = io.connect('http://127.0.0.1:5000/' );

    socket.on('connect', function() {
        socket.emit('message',{data: 'I\'m connected!'});
    });

    socket.on('message', data => {
        // console.log(data);
        if (data.wid == "1" && data.channel_id=="2"){
            console.log(data.msg);
        }
    });

    socket.on('createWorkspaceJS', data => {
        console.log(data);
    });

    socket.on('createChannelJS', data => {
        var saved = document.getElementById('workspace-id-saved').innerHTML;
        // console.log(typeof saved)
        // console.log(typeof data['wid'])
        if (data['wid'] == saved){
            const div = document.createElement("div");
            const button = document.createElement("button");
            var list = document.getElementById('channelList');
            div.classList.add('channel');
            button.innerHTML = "#" + data['name'];
            button.classList.add('channelName');
            div.appendChild(button);
            list.appendChild(div);
        }
        // console.log(data);
    });

    socket.on('getChannelsJS', data=>{
        // console.log(data);
        var heading = document.getElementById('channel-heading');
        heading.innerHTML = data['name']
        var list = document.getElementById('channelList');
        removeAllChildNodes(list);
        var channels = data['channels']
        for (var i = 0; i < data['channelCount']; i++){
            const div = document.createElement("div");
            const button = document.createElement("button");
            div.classList.add('channel');
            // console.log(channels[i][i])
            button.innerHTML = "#" + channels[i][i].name;
            // button.innerHTML = "channel"
            button.classList.add('channelName');
            div.appendChild(button);
            list.appendChild(div);
        }
    })


    var createWorkspaceButton = document.getElementById('createWorkspaceButton');
    var createChannelButton = document.getElementById('createChannelButton');
    var sendMessage = document.getElementById('send-message');
    var chatMessageInput = document.getElementById('chatMessageInput');
    var workspaces = document.querySelectorAll('.wid');
    

    createWorkspaceButton.addEventListener('click', function(){
        // console.log("hello");
        var workspaceNameInput = document.getElementById('workspaceNameInput');
        var workspaceNameUsername = document.getElementById('workspaceNameUsername');
        var createWorkspaceModal = document.getElementById('createWorkspaceModal');
        var blur = document.getElementById('blur');
        // console.log({name: workspaceNameInput.value, username:workspaceNameUsername.value});
        createWorkspaceModal.classList.toggle('createWorkspaceModalShow');
        blur.classList.toggle('bluractive');
        var div = document.createElement("div");
        var img = document.createElement("img");
        div.classList.add('workspace');
        img.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5su_e5EULmaSR0GPr9PxMGcOVm22Tsg5Eyg&usqp=CAU";
        img.classList.add('workspaceIcon');
        div.appendChild(img);
        var list = document.getElementById('workspaceList');
        div.addEventListener('click',function(){
            var saved = document.getElementById('workspace-id-saved');
            saved.innerHTML=this.childNodes[3].innerHTML;
            console.log(saved.innerHTML)
            socket.emit('join',{wid: saved.innerHTML});
            socket.emit('getChannels', {wid:saved.innerHTML});
            // console.log(this.childNodes[3].innerHTML)
            // console.log(saved.innerHTML)
        })
        list.appendChild(div);
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