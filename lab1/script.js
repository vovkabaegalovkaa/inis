//let shirtsArr = localStorage.getItem("shirts");
//console.log(typeof shirtsArr)
shirts.forEach((shirt, index) => {
    let shirtName = document.createElement("span");
    shirtName.classList.add("name");
    shirtName.innerHTML = shirt.name ? shirt.name : "Some name";
    let shirtDescription = document.createElement("span");
    shirtDescription.classList.add("info-text");
    let colorsSize = Object.keys(shirt.colors).length;
    shirtDescription.innerHTML = shirt.colors ? `Available in ${colorsSize} ${colorsSize == 1 ? "color" : "colors"}` : "Some description";
    let shirtPhotoe = document.createElement("img");
    shirtPhotoe.classList.add("photoe");
    shirtPhotoe.setAttribute('src', shirt.default.front ? shirt.colors.white.front : shirt.default.front);

    let container = document.querySelector(".container");
    
    let shirtContainer = document.createElement("div");
    shirtContainer.classList.add("shirt-cont");
    container.appendChild(shirtContainer);

    let photoe = document.createElement("div");
    photoe.classList.add("photoe");
    shirtContainer.appendChild(photoe);
    photoe.appendChild(shirtPhotoe);

    let info = document.createElement("div");
    info.classList.add("info");
    shirtContainer.appendChild(info);
    info.appendChild(shirtName);
    info.appendChild(shirtDescription);

    let buttons = document.createElement("div");
    buttons.classList.add("buttons");
    info.appendChild(buttons);

    let btnView = document.createElement("button");
    btnView.classList.add("view");
    btnView.setAttribute("id", index);
    btnView.innerHTML = "Quick view"
    buttons.appendChild(btnView);

    let btnSee = document.createElement("button");
    btnSee.classList.add("see-page");
    btnSee.setAttribute("id", index);
    btnSee.innerHTML = "See page"
    buttons.appendChild(btnSee);
});
let megaContainer = document.querySelector(".mega-container");
let quickViews = document.querySelectorAll(".view");
let pages = document.querySelectorAll(".see-page");
megaContainer.addEventListener("click", (event) => {
    for(let view of quickViews){
        if(event.target == view){
            openModal(view.getAttribute("id"));
        }
    }
    for(let page of pages){
        if(event.target == page ){
            seePage(page.getAttribute("id"));
        }
    }
})
function openModal(id){
    let shirtName = shirts[id].name;
    let shirtPrice = shirts[id].price;
    let shirtFront = shirts[id].colors.white.front;
    let shirtBack = shirts[id].colors.white.back;
    document.querySelector(".shirt-name").innerHTML = shirtName;
    document.querySelector(".shirt-price").innerHTML = shirtPrice;
    document.querySelector("#front").setAttribute("src", shirtFront);
    document.querySelector("#back").setAttribute("src", shirtBack);
    let modal = document.querySelector(".modal");
    modal.showModal();
    modal.addEventListener("click", () => {
        if(event.target == modal){
            modal.close();
        }
    })
}
function seePage(id){
    // localStorage.setItem("shirtName",shirts[id].name);
    // localStorage.setItem("shirtDescription",shirts[id].description);
    // localStorage.setItem("shirtPrice",shirts[id].price);
    // let colors = shirts[id].colors;
    // console.log(colors);
    // localStorage.setItem("shirtColor",colors);
    localStorage.setItem("shirtInfo", JSON.stringify(shirts[id]));
    window.location.href = "../lab2/index.html";
}
