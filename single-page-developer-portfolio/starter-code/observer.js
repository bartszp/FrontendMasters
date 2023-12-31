let mainHeading = document.getElementById("main-heading");
let mainDesc = document.getElementById("main-desc");
let picture = document.getElementById("my-photo");
let heroButton = document.getElementById("hero-button");
let technologies = document.getElementById("technologies");
let techCards = document.getElementsByClassName("tech-card");

let makeVisibleObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            entry.target.classList.add("slide-in");
        }
    })
}, {threshold: 0});

makeVisibleObserver.observe(mainHeading);
makeVisibleObserver.observe(mainDesc);
makeVisibleObserver.observe(picture);
makeVisibleObserver.observe(heroButton);



window.addEventListener("scroll", showTechnologiesCards)

function showTechnologiesCards (){
    if(window.pageYOffset*4 > technologies.offsetTop){
    Array.from(techCards).forEach(card =>{
        card.classList.add("visible");
        card.classList.add("slide-in");
    })
    }

}
