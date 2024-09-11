let divToDrag = document.querySelectorAll(".target");
let holderItem;

for (let item of divToDrag) {
  item.setAttribute("draggable", true);
  
  item.addEventListener("dragstart", (event) => {
    holderItem = event.target;  
  });

  item.addEventListener("dragend", (event) => {
    let workspaceCoords = document.querySelector("#workspace").getBoundingClientRect();
    let newTop = event.pageY - workspaceCoords.top;
    let newLeft = event.pageX - workspaceCoords.left;
    
    holderItem.style.top = `${newTop}px`;
    holderItem.style.left = `${newLeft}px`;
  });
}

let workSpace = document.querySelector("#workspace");
workSpace.addEventListener("dragenter", cancel);
workSpace.addEventListener("dragover", cancel);

function cancel(event) {
  event.preventDefault();
}