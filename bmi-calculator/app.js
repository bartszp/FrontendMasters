let metricBtn = document.getElementById("metric");
let imperialBtn = document.getElementById("imperial");
let radioBtns = document.getElementById("radio-btns");

let metricForm = document.getElementById("inputs-metric");
let imperialForm = document.getElementById("inputs-imperial");
let unit = metric;

function selectUnit(unit){
    if(unit ==="imperial"){
        metricBtn.checked = false;
        switchForm();
    } else if (unit==="metric"){
        imperialBtn.checked = false; 
        switchForm();
    }
}

function switchForm(){
    
    metricForm.classList.toggle("hidden");
    imperialForm.classList.toggle("hidden");

}

function calculateBMI(unit, height, weight){
    if (unit === "metric"){
        let bmi = weight/(height**2)
        bmi = bmi.toFixed(1);
        return bmi;
    } else {
        let bmi = weight/height**2
        bmi = bmi.toFixed(1);
        return bmi;
    }
}
console.log(calculateBMI('metric', 1.70, 60));
