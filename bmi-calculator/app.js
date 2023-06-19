let metricBtn = document.getElementById("metric");
let imperialBtn = document.getElementById("imperial");
let metricForm = document.getElementById("inputs-metric");
let imperialForm = document.getElementById("inputs-imperial");
let BMIdisplay = document.getElementById("result");
let perfectRangeMin = document.getElementsByClassName("perfect-range-min");
let perfectRangeMax = document.getElementsByClassName("perfect-range-max");
let category = document.getElementById("category");

let heightCmInput = document.getElementById("height");
let weightKgInput = document.getElementById("weight");
let heightFtInput = document.getElementById("height-ft");
let heightInInput = document.getElementById("height-in");
let weightStInput = document.getElementById("weight-st");
let weightIbsInput = document.getElementById("weight-ibs");


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
if (unit === "metric") {
    metricBtn.checked = true;
} else {
    imperialBtn.checked = true;
}
switchForm()
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
    calculateBMI(inputsObjectMetric.heightCm, inputsObjectMetric.weightKg);
}

// Validation of the input - shoe message if value is out of specified range
inputs.forEach(input => {
    input.addEventListener("input", (e) => { validateInput(e, input) });
})

function validateInput(e, input,) {
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

function convertInputs(populateInputs) {
    if (unit === "metric") {
        //Set imperial values based on values in metric system - height    
        inputsObjectMetric.heightCm = parseInt(inputs[4].value);
        //Convert centimeters to feet
        let CentimetersToFeet = inputsObjectMetric.heightCm * 0.0328;
        //Assign a total number of feet
        inputsObjectImperial.heightFt = Math.floor(CentimetersToFeet);
        //Convert remaining fraction of foot to inches and assign in
        inputsObjectImperial.heigthIn = Number.parseInt(((CentimetersToFeet % 1) * 12).toFixed(0));

        //Weight
        inputsObjectMetric.weightKg = parseInt(inputs[5].value);
        let KgToSt = inputsObjectMetric.weightKg * 0.157473;
        inputsObjectImperial.weightSt = Math.floor(KgToSt);
        inputsObjectImperial.weightIbs = Number.parseInt(((KgToSt % 1) * 14).toFixed(0));
    } else if (unit === "imperial") {
        //Set metric values based on values in imperial system -height
        //assign values from inputs
        inputsObjectImperial.heightFt = parseInt(inputs[0].value);
        inputsObjectImperial.heigthIn = parseInt(inputs[1].value);
        let totalInches = inputsObjectImperial.heightFt * 12 + inputsObjectImperial.heigthIn;
        // Assign calulated height in cm
        inputsObjectMetric.heightCm = Math.round(totalInches * 2.54);
        console.log(inputsObjectMetric.heightCm, inputsObjectImperial.heightFt);

        //weight
        inputsObjectImperial.weightSt = parseInt(inputs[2].value);
        inputsObjectImperial.weightIbs = parseInt(inputs[3].value);
        let totalIbs = inputsObjectImperial.weightSt * 14 + inputsObjectImperial.weightIbs;
        inputsObjectMetric.weightKg = Math.round(totalIbs * 0.453592);
    }
    populateInputs();
}


//Populate each input based on data from object
function populateInputs() {
    heightFtInput.value = Number.isNaN(inputsObjectImperial.heightFt) ? "" : inputsObjectImperial.heightFt;
    heightInInput.value = Number.isNaN(inputsObjectImperial.heigthIn) ? "" : inputsObjectImperial.heigthIn;
    weightStInput.value = Number.isNaN(inputsObjectImperial.weightSt) ? "" : inputsObjectImperial.weightSt;
    weightIbsInput.value = Number.isNaN(inputsObjectImperial.weightIbs) ? "" : inputsObjectImperial.weightIbs;
    heightCmInput.value = Number.isNaN(inputsObjectMetric.heightCm) ? "" : inputsObjectMetric.heightCm;
    weightKgInput.value = Number.isNaN(inputsObjectMetric.weightKg) ? "" : inputsObjectMetric.weightKg;
    calculateBMI(inputsObjectMetric.heightCm, inputsObjectMetric.weightKg);
}

// Every time value in one of the inputs is changed, the values are converted and populated in opposite measurement system
// e.g. When user enter 170cm and then switch to imperial, the inputs for ft and inches will be populated with converted values 
inputs.forEach(input => {
    input.addEventListener("input", () => { convertInputs(populateInputs) });
})


function calculateBMI(height, weight) {
    if (height && weight) {
        let bmi = weight / ((height / 100) ** 2);
        bmi = bmi.toFixed(1);
        if (bmi > 0 && bmi < 100) {
            BMIdisplay.innerText = bmi;
            populateText(bmi, height);
        } else {
            BMIdisplay.innerText = "invalid input"
        }
    } else {
        BMIdisplay.innerText = "...";
    }
}

function populateText(bmi, height){

    let minWeight = (18 * ((height / 100) ** 2)).toFixed(1);
    let maxWeight = (25 * ((height / 100) ** 2)).toFixed(1);
    Array.from(perfectRangeMin).forEach(field =>{
        field.innerText = (unit ==="metric" ? (minWeight + " kgs") : ((minWeight *2.2).toFixed(0) + " Ibs"));
    });
    Array.from(perfectRangeMax).forEach(field =>{
        field.innerText = (unit ==="metric" ? (maxWeight + " kgs") : ((maxWeight *2.2).toFixed(0) + " Ibs"));;
    });
    switch (true) {
        case bmi <= 18:
            category.innerText = "underweight"
            break;
        case (bmi > 18 && bmi <= 25):
            category.innerText = "healthy weight"
            break;
        case (bmi > 25 && bmi <= 30):
            category.innerText = "overweight"
            break;
        case (bmi > 30):
            category.innerText = "obese"
            break;
        default:
            break;
    }
}


