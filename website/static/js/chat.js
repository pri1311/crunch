window.onload = function() {
var x = document.getElementById("chats").lastElementChild;
x.focus();
};

var createWorkspace = document.getElementById('createWorkspace');
var createChannel = document.getElementById('createChannel');
var createWorkspaceModal = document.getElementById('createWorkspaceModal');
var createChannelModal = document.getElementById('createChannelModal');
var blur = document.getElementById('blur');
var closeCreateWorkspace = document.getElementById('closeCreateWorkspace');
var closeCreateChannel = document.getElementById('closeCreateChannel');

createWorkspace.addEventListener("click", function(){
    createWorkspaceModal.classList.toggle('createWorkspaceModalShow');
    blur.classList.toggle('bluractive');
});

createChannel.addEventListener("click", function(){
    createChannelModal.classList.toggle('createChannelModalShow');
    blur.classList.toggle('bluractive');
});

closeCreateWorkspace.addEventListener("click", function(){
    createWorkspaceModal.classList.toggle('createWorkspaceModalShow');
    blur.classList.toggle('bluractive');
});

closeCreateChannel.addEventListener("click", function(){
    createChannelModal.classList.toggle('createChannelModalShow');
    blur.classList.toggle('bluractive');
});