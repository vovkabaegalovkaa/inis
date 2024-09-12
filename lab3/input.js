let divToDrag = document.querySelectorAll(".target");
let workSpace = document.querySelector("#workspace");
let workspaceCoords = workSpace.getBoundingClientRect();
let holderItem;
let isDragging = false;
let offsetX, offsetY;



for (let item of divToDrag) {
    item.setAttribute("draggable", true);
    item.addEventListener("dragstart", (event) => {
        holderItem = event.target;  
    });
    item.addEventListener("dragend", (event) => {
        let newTop = event.pageY - workspaceCoords.top;
        let newLeft = event.pageX - workspaceCoords.left;
        holderItem.style.top = `${newTop}px`;
        holderItem.style.left = `${newLeft}px`;
    });
    item.addEventListener("dblclick", (event) => {
        isDragging = true;
        holderItem = event.target;
        offsetX = event.clientX - item.offsetLeft;
        offsetY = event.clientY - item.offsetTop;
        item.style.backgroundColor = newColor();
    })
}
workSpace.addEventListener("mousemove", (event) => {
    if (isDragging && holderItem) {
        console.log("Fwefw");
        holderItem.style.left = `${event.clientX - offsetX}px`;
        holderItem.style.top = `${event.clientY - offsetY}px`;
    }
})
workSpace.addEventListener('click', () => {
    if(holderItem){
        isDragging = false;
    }
});
document.addEventListener('keydown', () => {
    console.log(event.keyCode)
    if(holderItem && event.keyCode == 27){
        isDragging = false;
    }
});
workSpace.addEventListener("dragenter", cancel);
workSpace.addEventListener("dragover", cancel);
function cancel(event) {
    event.preventDefault();
}
function newColor(){
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}