let metricBtn = document.getElementById("metric");
let imperialBtn = document.getElementById("imperial");

let metricForm = document.getElementById("inputs-metric");
let imperialForm = document.getElementById("inputs-imperial");
let unit = metric;
let inputs = document.querySelectorAll("input[type='number']");
let radioBtns = document.getElementById("radio-btns");

// Startup
metricBtn.checked = true;
inputs[0].setSelectionRange(0,0);
// Startup

// Event Listeners
radioBtns.addEventListener("click", selectUnit);



// Show appropriate form based on chosen unit
function selectUnit(e) {
    if (e.target.id === "imperial" || e.target.id === "imperialLabel") {
        e.stopPropagation();
        unit = "imperial";
        imperialBtn.checked = true;
        metricBtn.checked = false;
        switchForm();
    } else if (e.target.id === "metric" || e.target.id === "metricLabel") {
        e.stopPropagation();
        unit = "metric";
        metricBtn.checked = true;
        imperialBtn.checked = false;
        switchForm();
    }

}

//Switch between forms
function switchForm() {
    if (unit === "metric") {
        metricForm.classList.remove("hidden");
        imperialForm.classList.add("hidden");
    } else if (unit === "imperial") {
        metricForm.classList.add("hidden");
        imperialForm.classList.remove("hidden");
    }
}

// Validation of the input

inputs.forEach(input => {
    input.addEventListener("input", (e) => { validateInput(e, input) });
})

function validateInput(e, input) {
    if (e.target.validity.rangeOverflow) {
        input.setCustomValidity("This number is too high");
        input.reportValidity();
    } else if (e.target.validity.rangeUnderflow) {
        input.setCustomValidity("This number is too low");
        input.reportValidity();
    } else {
        input.setCustomValidity("");
    }
}


function calculateBMI(unit, height, weight) {
    if (unit === "metric") {
        let bmi = weight / (height ** 2)
        bmi = bmi.toFixed(1);
        return bmi;
    } else {
        let bmi = weight / height ** 2
        bmi = bmi.toFixed(1);
        return bmi;
    }
}
console.log(calculateBMI('metric', 1.70, 60));
