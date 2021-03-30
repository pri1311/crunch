window.onload = function() {
var x = document.getElementById("chats").lastElementChild;
x.focus();
};

var createWorkspace = document.getElementById('createWorkspace');
var joinWorkspace = document.getElementById('joinWorkspace');
var createChannel = document.getElementById('createChannel');
var createWorkspaceModal = document.getElementById('createWorkspaceModal');
var joinWorkspaceModal = document.getElementById('joinWorkspaceModal');
var createChannelModal = document.getElementById('createChannelModal');
var blur = document.getElementById('blur');
var closeCreateWorkspace = document.getElementById('closeCreateWorkspace');
var closeJoinWorkspace = document.getElementById('closeJoinWorkspace');
var closeCreateChannel = document.getElementById('closeCreateChannel');

createWorkspace.addEventListener("click", function(){
    createWorkspaceModal.classList.toggle('createWorkspaceModalShow');
    blur.classList.toggle('bluractive');
});

createChannel.addEventListener("click", function(){
    createChannelModal.classList.toggle('createChannelModalShow');
    blur.classList.toggle('bluractive');
});

joinWorkspace.addEventListener("click", function(){
    joinWorkspaceModal.classList.toggle('joinWorkspaceModalShow');
    blur.classList.toggle('bluractive');
});

closeCreateWorkspace.addEventListener("click", function(){
    createWorkspaceModal.classList.toggle('createWorkspaceModalShow');
    blur.classList.toggle('bluractive');
});

closeJoinWorkspace.addEventListener("click", function(){
    joinWorkspaceModal.classList.toggle('joinWorkspaceModalShow');
    blur.classList.toggle('bluractive');
});

closeCreateChannel.addEventListener("click", function(){
    createChannelModal.classList.toggle('createChannelModalShow');
    blur.classList.toggle('bluractive');
});

// /*===== SCROLL REVEAL ANIMATION =====*/
// const sr = ScrollReveal({
//     origin: 'top',
//     distance: '80px',
//     duration: 2000,
//     reset: true
// })


// /*===== SCROLL REVEAL ANIMATION-CARDS =====*/
// sr.reveal('.createWorkspace', {})
// sr.reveal('.createChannel', {})
// sr.reveal('.card', {})
// sr.reveal('.chat-workspace-name', {delay: 100})
// sr.reveal('.channel-heading', {delay: 100})
// sr.reveal('.workspace', {delay: 200})
// sr.reveal('.channel', {delay: 200})
// sr.reveal('.card-body', {delay: 200})
// sr.reveal('.send-message-container', {delay: 400})
