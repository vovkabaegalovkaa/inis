let shirtInfo = JSON.parse(localStorage.getItem("shirtInfo"));
document.querySelector("h1").innerHTML = shirtInfo.name;
document.querySelector(".photoe").setAttribute("src", `../lab1/${shirtInfo.colors.white.front}`);
document.querySelector(".price").innerHTML = shirtInfo.price;
document.querySelector(".description").innerHTML = shirtInfo.description;

let pickedColor = "white";
let pickedSide = "front";

let buttonsCont = document.querySelector("#color-cont");
let allButtons = [];
for(let color in shirtInfo.colors){
    let colorButton = document.createElement("button");
    colorButton.classList.add("btn");
    colorButton.setAttribute("id", `${color}`);
    colorButton.style.backgroundColor = `${color}`;
    colorButton.innerHTML = `${color}`;
    allButtons.push(colorButton);
    buttonsCont.appendChild(colorButton);
}
buttonsCont.addEventListener("click", () => {
    for(let btn of allButtons){
        if(event.target == btn){
            let color = btn.getAttribute('id');
            pickedColor = color;
            document.querySelector(".photoe").setAttribute("src", `../lab1/${shirtInfo.colors[color][pickedSide]}`)
        }
    }
})  

let changeSideToFrontBtn = document.querySelector("#front");
let changeSideToBackBtn = document.querySelector("#back");

changeSideToBackBtn.addEventListener("click", () => {
    pickedSide = "back";
    document.querySelector(".photoe").setAttribute("src", `../lab1/${shirtInfo.colors[pickedColor][pickedSide]}`)
})

changeSideToFrontBtn.addEventListener("click", () => {
    pickedSide = "front";
    document.querySelector(".photoe").setAttribute("src", `../lab1/${shirtInfo.colors[pickedColor][pickedSide]}`)
})