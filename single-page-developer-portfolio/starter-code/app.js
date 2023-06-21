let email = document.getElementById("email")
let name = document.getElementById("name")
let message = document.getElementById("message");
let inputs = [email, name, message];

//RegExp for valiation 
let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let namePattern = /^[A-z0-9]+$/
let messagePattern = /^[\s\S]{1,255}$/

inputs.forEach(input => {
    input.addEventListener("input", ()=>{
        validateInput(input);
    })
})

function validateInput(input) {
    switch (true) {
        case input === name:
            console.log("helo1")
            if(!namePattern.test(input.value)){
                input.classList.add("invalid")
                console.log("helo2")
            } else {
                input.classList.remove("invalid");
                input.classList.add("valid");
            }
            break;
    
        default:
            break;
    }

}

function invalidInput(validityArray) {
    if (validityArray[0] === false) {
        highlightInvalid(inputs[0])
    }
    if (validityArray[1] === false) {
        highlightInvalid(inputs[1])
        console.log("email invalid");
    }
    if (validityArray[2] === false) {
        highlightInvalid(inputs[2])
        console.log("message invalid");
    }
}

function validInput() {
    inputs.forEach(input => {
        removeInvalid(input);
    })
    console.log("everything works");
}

function highlightInvalid(input) {
    input.classList.add("invalid")
}

function removeInvalid(input) {
    input.classList.remove("invalid");
}

