let metricBtn = document.getElementById("metric");
let imperialBtn = document.getElementById("imperial");

let metricForm = document.getElementById("inputs-metric");
let imperialForm = document.getElementById("inputs-imperial");
let unit = "metric";
let inputs = document.querySelectorAll("input[type='number']");
let radioBtns = document.getElementById("radio-btns");

let inputsObjectMetric = {
    heightCm: "",
    weightKg: "",
}

let inputsObjectImperial = {
    heightFt: "",
    heigthIn: "",
    weightSt: "",
    weightIbs: "",
}

// Startup
metricBtn.checked = true;

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

// Validation of the input - shoe message if value is out of specified range
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

// Set height and weigth every time values has been changed

console.log(inputs);
function convertInputs() {
    if (unit === "metric"){
        //Height        
        inputsObjectMetric.heightCm = inputs[4].value;
        //Convert centimeters to feet
        let CmToFt = inputsObjectMetric.heightCm * 0.0328;
        //Assign a total number of feet
        inputsObjectImperial.heightFt = Math.floor(CmToFt);
        //Convert remaining fraction of foot to inches and assign in
        inputsObjectImperial.heigthIn = Number.parseInt(((CmToFt%1) * 12).toFixed(0));

        //Weight
        inputsObjectMetric.weightKg = inputs[5].value;
        //Convert kg to stones
        let KgToSt = inputsObjectMetric.weightKg * 0.157473;
        //Assign a total number of stones
        inputsObjectImperial.weightSt = Math.floor(KgToSt);
        //Convert remaining fraction of stones to ibs and assign it
        inputsObjectImperial.weightIbs = Number.parseInt(((KgToSt%1)*14).toFixed(0));
        console.log(inputsObjectImperial.weightSt, inputsObjectImperial.weightIbs);
    }
}

convertInputs()


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

