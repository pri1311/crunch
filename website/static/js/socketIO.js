document.addEventListener('DOMContentLoaded', ()=>{
    var socket = io.connect('http://127.0.0.1:5000/' );

    socket.on('connect', function() {
        socket.emit('message',{data: 'I\'m connected!'});
    });

    socket.on('message', data => {
        console.log(data);
        if (data.wid == "1" && data.channel_id=="2"){
            console.log(data.msg);
        }
    });

    socket.on('createWorkspaceJS', data => {
        console.log(data);
    });

    socket.on('createChannelJS', data => {
        console.log(data);
    });


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
        console.log({name: workspaceNameInput.value, username:workspaceNameUsername.value});
        createWorkspaceModal.classList.toggle('createWorkspaceModalShow');
        blur.classList.toggle('bluractive');
        var div = document.createElement("div");
        var img = document.createElement("img");
        div.classList.add('workspace');
        img.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5su_e5EULmaSR0GPr9PxMGcOVm22Tsg5Eyg&usqp=CAU";
        img.classList.add('workspaceIcon');
        div.appendChild(img);
        var list = document.getElementById('workspaceList');
        list.appendChild(div);
        console.log(list)
        socket.emit('createWorkspace', {name: workspaceNameInput.value, username:workspaceNameUsername.value});
        workspaceNameUsername.value = "";
        workspaceNameInput.value = "";
    });

    createChannelButton.addEventListener('click', function(){
        // console.log("hello");
        var ChannelNameInput = document.getElementById('ChannelNameInput');
        var ChannelNameUsername = document.getElementById('ChannelNameUsername');
        var createChannelModal = document.getElementById('createChannelModal');
        var blur = document.getElementById('blur');
        var saved = document.getElementById('workspace-id-saved').innerHTML;
        createChannelModal.classList.toggle('createChannelModalShow');
        blur.classList.toggle('bluractive');
        var div = document.createElement("div");
        var button = document.createElement("button");
        div.classList.add('channel');
        button.innerHTML= "#" +ChannelNameInput.value;
        // console.log(button.innerHTML)
        button.classList.add('channelName');
        div.appendChild(button);
        var list = document.getElementById('channelList');
        list.appendChild(div);
        // console.log(list)
        socket.emit('createChannel', {name: ChannelNameInput.value, username:ChannelNameUsername.value, wid: saved});
        ChannelNameUsername.value = "";
        ChannelNameInput.value = "";
    });

    sendMessage.addEventListener('click', function(){
        var msg = chatMessageInput.value;
        chatMessageInput.value = "";
        
    });

    for (var w =0; w<7;w++){
        var el = workspaces[w].parentNode
        el.addEventListener('click', function(){
            console.log(this.childNodes[3].innerHTML)
            var saved = document.getElementById('workspace-id-saved');
            saved.innerHTML=this.childNodes[3].innerHTML;
        })
    }

})