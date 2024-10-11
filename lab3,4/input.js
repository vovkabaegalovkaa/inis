let divToDrag = document.querySelectorAll(".target");
let workSpace = document.querySelector("#workspace");
let holderItem;
let startCoords = {
    x: 0,
    y: 0
};
let itemSize = {
    width: 0,
    height: 0,
    square: 0,
    newSquare: 0,
    direction: 1,
}
let isDragging = false;
let offsetX, offsetY;



for (let item of divToDrag) {
    let lastTap = 0;
    item.setAttribute("draggable", true);
    item.addEventListener("dragstart", (event) => {
        holderItem = event.target;
        offsetX = event.clientX - holderItem.offsetLeft;
        offsetY = event.clientY - holderItem.offsetTop;
    });
    item.addEventListener("dragend", (event) => {
        holderItem.style.left = `${event.clientX - offsetX}px`;
        holderItem.style.top = `${event.clientY - offsetY}px`;
    });
    item.addEventListener("dblclick", (event) => {
        isDragging = true;
        holderItem = event.target;
        startCoords.x = holderItem.offsetLeft;
        startCoords.y = holderItem.offsetTop;
        offsetX = event.clientX - holderItem.offsetLeft;
        offsetY = event.clientY - holderItem.offsetTop;
        holderItem.style.backgroundColor = newColor();
    })
    item.addEventListener('touchstart', () => {
        event.preventDefault();
        if(isDragging && event.touches.length > 1){
            isDragging = false;
            holderItem.style.left = `${startCoords.x}px`;
            holderItem.style.top = `${startCoords.y}px`;
        }
        let currentTime = new Date().getTime();
        let difference = currentTime - lastTap;
        if(difference < 300){
            holderItem = item;
            isDragging = true;
            startCoords.x = holderItem.offsetLeft;
            startCoords.y = holderItem.offsetTop;
            offsetX = event.touches[0].clientX - holderItem.offsetLeft;
            offsetY = event.touches[0].clientY - holderItem.offsetTop;
            itemSize.width = parseInt(window.getComputedStyle(holderItem).width, 10);
            itemSize.height = parseInt(window.getComputedStyle(holderItem).height, 10);
            itemSize.square = itemSize.width * itemSize.height;
            itemSize.newSquare = itemSize.square;
        }
        lastTap = currentTime;
    })
}
workSpace.addEventListener("mousemove", (event) => {
    if (isDragging && holderItem) {
        holderItem.style.left = `${event.clientX - offsetX}px`;
        holderItem.style.top = `${event.clientY - offsetY}px`;
    }
})
workSpace.addEventListener("touchmove", () => {
    event.preventDefault();
    if (isDragging && holderItem) {
        let i = 1 * itemSize.direction;
        itemSize.newSquare = (itemSize.width + i) * (itemSize.height + i);
        if(itemSize.newSquare >= itemSize.square * 0.5 && itemSize.newSquare <= itemSize.square * 2){
            itemSize.width += i;
            itemSize.height += i;
            holderItem.style.width =`${itemSize.width}px`;
            holderItem.style.height =`${itemSize.height}px`;
        }
        else{
            itemSize.direction *= -1;
        }
        holderItem.style.left = `${event.touches[0].clientX - offsetX}px`;
        holderItem.style.top = `${event.touches[0].clientY - offsetY}px`;
    }
})
workSpace.addEventListener("touchstart", () => {
    event.preventDefault();
    if(holderItem && isDragging){
        if(event.target !== holderItem){
            isDragging = false;
            holderItem = null;
        }
    }
})
workSpace.addEventListener('click', () => {
    if(holderItem && isDragging){
        isDragging = false;
    }
});
document.addEventListener('keydown', () => {
    if(holderItem && event.keyCode == 27){
        isDragging = false;
        holderItem.style.left = `${startCoords.x}px`;
        holderItem.style.top = `${startCoords.y}px`;
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