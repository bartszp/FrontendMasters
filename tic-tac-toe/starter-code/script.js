
// Toogle selection between cross and circle
let oBtn = document.getElementById("select-o");
let xBtn = document.getElementById("select-x");

oBtn.addEventListener("click", ()=>{
    oBtn.classList.add("selected");
    xBtn.classList.remove("selected");
})

xBtn.addEventListener("click", ()=>{
    xBtn.classList.add("selected");
    oBtn.classList.remove("selected");
})

function createElement (type){
    let element = document.createElement("img");
    element.src =  
}