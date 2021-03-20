window.onload = function() {
var x = document.getElementById("chats").lastElementChild;
x.focus();
};

var createWorkspace = document.getElementById('createWorkspace');
var createWorkspaceModal = document.getElementById('createWorkspaceModal');
var blur = document.getElementById('blur');
var closeCreateWorkspace = document.getElementById('closeCreateWorkspace');

createWorkspace.addEventListener("click", function(){
    createWorkspaceModal.classList.toggle('createWorkspaceModalShow');
    blur.classList.toggle('bluractive');
});

closeCreateWorkspace.addEventListener("click", function(){
    createWorkspaceModal.classList.toggle('createWorkspaceModalShow');
    blur.classList.toggle('bluractive');
});