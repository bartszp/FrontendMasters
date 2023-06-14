let grades = document.getElementById("grades");
let submitBtn = document.getElementById("idBtn");
let ratingCard = document.getElementById("rating-card");
let thankYouCard = document.getElementById("thank-you-card");
let gradeSubmittedDisplay = document.getElementById("gradeSubmitted");
let grade;

// Highlight selected grade
grades.addEventListener("click", selectGrade);
// grades.addEventListener("touchstart", selectGrade);




// Submit response and display thank you card
submitBtn.addEventListener("click", showThankYouCard);

function selectGrade(event) {
    if (event.target.classList.contains("grade")) {
        grade = event.target.id.substring(6, 7);
        Array.from(grades.children).forEach(grade => {
            grade.classList.remove("clicked");
        })
        event.target.classList.add('clicked');
    }
}

function showThankYouCard(){
    ratingCard.style.display = "none";
    thankYouCard.style.display = "block";
    gradeSubmittedDisplay.innerText = grade;
}
