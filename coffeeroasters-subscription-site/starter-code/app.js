let hamMenuOpenBtn= document.getElementById("ham-btn-open")
let hamMenuCloseBtn= document.getElementById("ham-btn-close")
let hamMenu = document.getElementById("menu");


//Hamburger menu 
hamMenuOpenBtn.addEventListener("click", ()=>{
    hamMenuOpenBtn.classList.add("hidden");
    hamMenuCloseBtn.classList.remove("hidden");
    hamMenu.classList.remove("hidden");
})
hamMenuCloseBtn.addEventListener("click", ()=>{
    hamMenuOpenBtn.classList.remove("hidden");
    hamMenuCloseBtn.classList.add("hidden");
    hamMenu.classList.add("hidden");
})

