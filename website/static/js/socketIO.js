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


    var createWorkspaceButton = document.getElementById('createWorkspaceButton');
    var sendMessage = document.getElementById('send-message');
    var chatMessageInput = document.getElementById('chatMessageInput');

    createWorkspaceButton.addEventListener('click', function(){
        console.log("hello");
        var workspaceNameInput = document.getElementById('workspaceNameInput');
        var workspaceNameUsername = document.getElementById('workspaceNameUsername');
        var createWorkspaceModal = document.getElementById('createWorkspaceModal');
        var blur = document.getElementById('blur');
        console.log({name: workspaceNameInput.value, username:workspaceNameUsername.value});
        createWorkspaceModal.classList.toggle('createWorkspaceModalShow');
        blur.classList.toggle('bluractive');
        workspaceNameUsername.value = "";
        workspaceNameInput.value = "";
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
    });

    sendMessage.addEventListener('click', function(){
        var msg = chatMessageInput.value;
        chatMessageInput.value = "";
        
    });
})