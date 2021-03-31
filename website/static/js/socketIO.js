document.addEventListener('DOMContentLoaded', ()=>{
    scrollDownChatWindow()
    var socket = io.connect('http://127.0.0.1:5000/' );

    socket.on('connect', function() {
        socket.emit('message',{data: 'I\'m connected!'});
        var saved = document.getElementById('workspace-id-saved').innerHTML;
        if (saved){
            socket.emit('getWorkspaceName', {wid:saved});
        }
    });

    socket.on('error', data=>{
        var username = document.getElementById('username');
        if (data['username']== username.innerHTML){
            alert(data['msg'])
        }
    })

    socket.on('receiveimage', data=>{
        console.log(data)
        var saved = document.getElementById('workspace-id-saved').innerHTML;
        var channelid = document.getElementById('channel-id-saved').innerHTML;
        var username = document.getElementById('username').innerHTML
        if (data['channel_id'].toString() == channelid.toString() && data['wid'].toString()==saved.toString()){
            console.log(data)
            var list = document.getElementById('chats');
            list.classList.add('chats')
            list.classList.add('flex-column')
            list.classList.add('d-flex')
            if (username == data['username']){
                var div = document.createElement("div");
                var img = document.createElement("img");
                div.classList.add('chatbubble');
                div.classList.add('chatbubble-right');
                img.setAttribute("src", data['message'])
                div.appendChild(img);
                list.appendChild(div);
            }
            else{
                console.log(data)
                var div = document.createElement("div");
                var img = document.createElement("img");
                var b = document.createElement("b");
                div.classList.add('chatbubble');
                div.classList.add('chatbubble-left');
                b.innerHTML = data['username']
                div.appendChild(b)
                img.setAttribute("src", data['message'])
                div.appendChild(img);
                list.appendChild(div);
            }
        }
        scrollDownChatWindow()
    })

    socket.on('workspaceJoined', data=>{
        var username = document.getElementById('username');
        console.log(username.innerHTML)
        console.log(data['username'])
        if (data['username'] == username.innerHTML){
            var div = document.createElement("div");
            var img = document.createElement("img");
            var span = document.createElement("span");
            span.classList.add('wid');
            div.classList.add('workspace');
            div.setAttribute("data-toggle", "tooltip");
            div.setAttribute("data-placement", "right");
            div.setAttribute("title",data['name'] )
            span.innerHTML = data['wid'];
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
                socket.emit('getWorkspaceName', {wid:saved.innerHTML});
            })
            console.log(data['wid'])
            socket.emit('join',{wid: data['wid']});
        }
    })

    socket.on('message', data => {
        if (data.wid == "1" && data.channel_id=="2"){
            console.log(data.msg);
        }
    });

    socket.on('receiveMessageJS', data=>{
        var channelid = document.getElementById('channel-id-saved').innerHTML;
        if (data['channel_id']== channelid){
            var heading = document.getElementById('chat-workspace-name')
            heading.innerHTML = data['name']
            var list = document.getElementById('chats');
            removeAllChildNodes(list)
            var chats = data['chats']
            var username = document.getElementById('username').innerHTML
            for (var i = 0; i < chats.length; i++){
                if (username == chats[i][i].username){
                    if (chats[i][i].image == 0){
                        var div = document.createElement("div");
                        var p = document.createElement("p");
                        div.classList.add('chatbubble');
                        div.classList.add('chatbubble-right');
                        p.innerHTML= chats[i][i].message
                        div.appendChild(p);
                        list.appendChild(div);
                    }
                    else if (chats[i][i].image == 1){
                        var div = document.createElement("div");
                        var img = document.createElement("img");
                        div.classList.add('chatbubble');
                        div.classList.add('chatbubble-right');
                        img.setAttribute("src", chats[i][i].message)
                        div.appendChild(img);
                        list.appendChild(div);
                    }
                }
                else{
                    if (chats[i][i].image == 0){
                        var div = document.createElement("div");
                        var p = document.createElement("p");
                        var b = document.createElement("b");
                        div.classList.add('chatbubble');
                        div.classList.add('chatbubble-left');
                        b.innerHTML =  chats[i][i].username
                        p.innerHTML= chats[i][i].message
                        div.appendChild(b)
                        div.appendChild(p)
                        list.appendChild(div);
                    }
                    else if (chats[i][i].image == 1){
                        var div = document.createElement("div");
                        var img = document.createElement("img");
                        var b = document.createElement("b");
                        div.classList.add('chatbubble');
                        div.classList.add('chatbubble-left');
                        b.innerHTML = chats[i][i].username
                        div.appendChild(b)
                        img.setAttribute("src", chats[i][i].message)
                        div.appendChild(img);
                        list.appendChild(div);
                    }
                }
            }
            console.log(data)
            scrollDownChatWindow()
        }
        
    })

    socket.on('receiveMessage', data=>{
        console.log(data)
        var saved = document.getElementById('workspace-id-saved').innerHTML;
        var channelid = document.getElementById('channel-id-saved').innerHTML;
        var username = document.getElementById('username').innerHTML
        if (data['channel_id'].toString() == channelid.toString() && data['wid'].toString()==saved.toString()){
            console.log(data)
            var list = document.getElementById('chats');
            list.classList.add('chats')
            list.classList.add('flex-column')
            list.classList.add('d-flex')
            if (username == data['username']){
                console.log(data)
                if (data['image'] == 0 || data['image'] == "0"){
                    console.log(data)
                    var div = document.createElement("div");
                    var p = document.createElement("p");
                    div.classList.add('chatbubble');
                    div.classList.add('chatbubble-right');
                    p.innerHTML= data['msg']
                    div.appendChild(p);
                    list.appendChild(div);
                }
                else if (data['image'] == 1){
                    var div = document.createElement("div");
                    var img = document.createElement("img");
                    div.classList.add('chatbubble');
                    div.classList.add('chatbubble-right');
                    img.setAttribute("src", data['message'])
                    div.appendChild(img);
                    list.appendChild(div);
                }
            }
            else{
                if (data['image'] == 0 || data['image'] == "0"){
                    console.log(data)
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
                else if (data['image'] == 1){
                    var div = document.createElement("div");
                    var img = document.createElement("img");
                    var b = document.createElement("b");
                    div.classList.add('chatbubble');
                    div.classList.add('chatbubble-left');
                    b.innerHTML = data['username']
                    div.appendChild(b)
                    img.setAttribute("src", data['message'])
                    div.appendChild(img);
                    list.appendChild(div);                    
                }
            }
        }
        scrollDownChatWindow()
    })

    socket.on('changeWorkspaceName',data=>{
        var saved = document.getElementById('workspace-id-saved');
        socket.emit('join',{wid: saved.innerHTML});
        var code = document.getElementById('card_code');
        var span = document.createElement("span");
        console.log(data['joining_code'])
        console.log("hello")
        removeAllChildNodes(code)
        span.innerHTML = data['joining_id']
        code.appendChild(span)
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
            div.setAttribute("data-toggle", "tooltip");
            div.setAttribute("data-placement", "right");
            div.setAttribute("title",data['name'] )
            span.innerHTML = data['wid'];
            var list = document.getElementById('workspaceList');
            list.appendChild(div);
            div.addEventListener('click',function(){
                var saved = document.getElementById('workspace-id-saved');
                console.log(this.childNodes)
                saved.innerHTML=this.childNodes[1].innerHTML;
                console.log(saved.innerHTML)
                socket.emit('join',{wid: saved.innerHTML});
                socket.emit('getChannels', {wid:saved.innerHTML});
                socket.emit('getWorkspaceName', {wid:saved.innerHTML});
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
            div.addEventListener('click', function(){
                var saved = document.getElementById('channel-id-saved');
                // console.log(div.childNodes)
                // console.log(this.childNodes)
                saved.innerHTML=this.childNodes[1].innerHTML;
                console.log(saved.innerHTML)
                var saved = document.getElementById('workspace-id-saved');
                socket.emit('join',{wid: saved.innerHTML});
                socket.emit('getMessages', {wid:saved.innerHTML, channel_id: this.childNodes[1].innerHTML});
                // console.log(this.childNodes[3].innerHTML)
                // console.log(saved.innerHTML)
            })
            list.appendChild(div);
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
            span.innerHTML = channels[i][i].id;
            div.appendChild(button);
            div.appendChild(span);
            div.addEventListener('click', function(){
                var saved = document.getElementById('channel-id-saved');
                saved.innerHTML=this.childNodes[1].innerHTML;
                console.log(saved.innerHTML)
                var saved = document.getElementById('workspace-id-saved');
                socket.emit('join',{wid: saved.innerHTML});
                socket.emit('getMessages', {wid:saved.innerHTML, channel_id: this.childNodes[1].innerHTML});
                // console.log(this.childNodes[3].innerHTML)
                // console.log(saved.innerHTML)
            })
            list.appendChild(div);
        }
    })


    var createWorkspaceButton = document.getElementById('createWorkspaceButton');
    var createChannelButton = document.getElementById('createChannelButton');
    var joinWorkspaceButton = document.getElementById('joinWorkspaceButton');
    var sendMessage = document.getElementById('send-message');
    var chatMessageInput = document.getElementById('chatMessageInput');
    var workspaces = document.querySelectorAll('.wid');
    var channels = document.querySelectorAll('.cid');
    var username = document.getElementById('username');
    var imageForm = document.getElementById('file-upload');
    var sendImage = document.getElementById('send-image');

    imageForm.addEventListener('change', function(){
        var saved = document.getElementById('workspace-id-saved').innerHTML;
        var channelid = document.getElementById('channel-id-saved').innerHTML;
        var username = document.getElementById('username').innerHTML
        var imagewid = document.getElementById('imagewid');
        var imagecid = document.getElementById('imagecid');
        var imageusername = document.getElementById('imageusername');
        var file = document.getElementById('file-upload');
        imagewid.value = saved;
        imagecid.value = channelid;
        imageusername.value = username;
        socket.emit('join',{wid: saved});
        console.log(file.value)
        document.getElementById('imageForm').submit()
        setTimeout(() => { socket.emit('sendimage', {"msg":"get image"}) }, 1000);
    })

    sendImage.addEventListener('click',function(){
        
    })

    joinWorkspaceButton.addEventListener('click', function(){
        var joinWorkspaceNameInput = document.getElementById('joinWorkspaceNameInput');
        var workspaceUserid = document.getElementById('workspaceUserid');
        var username = document.getElementById('username');
        var joinWorkspaceModal = document.getElementById('joinWorkspaceModal');
        var blur = document.getElementById('blur');
        socket.emit('joinWorkspace', {name:joinWorkspaceNameInput.value, code :workspaceUserid.value, username:username.innerHTML});
        joinWorkspaceModal.classList.toggle('joinWorkspaceModalShow');
        blur.classList.toggle('bluractive');
        joinWorkspaceNameInput.value = "";
        workspaceUserid.value="";
    })

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
            socket.emit('getWorkspaceName', {wid:saved.innerHTML});
            socket.emit('getChannels', {wid:saved.innerHTML});
            // console.log(this.childNodes[3].innerHTML)
            // console.log(saved.innerHTML)
        })
    }

    for (var w =0; w<channels.length;w++){
        var el = channels[w].parentNode
        el.addEventListener('click', function(){
            var saved = document.getElementById('channel-id-saved');
            var wid = document.getElementById('workspace-id-saved');
            saved.innerHTML=this.childNodes[3].innerHTML;
            console.log(saved.innerHTML)
            socket.emit('getMessages', {wid:wid.innerHTML, channel_id: saved.innerHTML});
            // console.log(this.childNodes[3].innerHTML)
            // console.log(saved.innerHTML)
        })
    }

    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    function scrollDownChatWindow() {
        const chatWindow = document.querySelector("#chats");
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

})
