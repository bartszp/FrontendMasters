let email = document.getElementById("email")
let name = document.getElementById("name")
let message = document.getElementById("message");
let inputs = [email, name, message];
let sendButton = document.getElementById("sendButton");

//RegExp for valiation 
let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let namePattern = /^[A-z0-9\sąśłęóżzźń]+$/
let messagePattern = /^[\s\S]{1,255}$/

inputs.forEach(input => {
    input.addEventListener("input", () => {
        validateInput(input);
    })
})

sendButton.addEventListener("click", function (e) {
    e.preventDefault();
    if (validateInput(name) === "OK" && validateInput(email) == "OK" && validateInput(message) === "OK") {
        alert("Message sent!");
        document.getElementById("contact-form").reset();
    } else {
        validateInput(name);
        validateInput(email);
        validateInput(message);
        setTimeout(() => { alert("Incorrect input, please correct.") }, 300);
    }



})

function validateInput(input) {
    //depends what input is being changed,validate it and if invalid then show validation info
    switch (true) {
        case input === name:
            if (!namePattern.test(input.value)) {

                input.classList.add("invalid")
                if (input.parentElement.children.length < 2) {
                    showValidationInfo(input, "Name cannot be empty");
                }
            } else {
                input.classList.remove("invalid");
                input.classList.add("valid");
                if (input.parentElement.children.length === 2) {
                    document.getElementById("nameValidationInfo").remove()
                }
                return "OK"
            }
            break;
        case input === email:
            if (!emailPattern.test(input.value)) {
                input.classList.add("invalid");
                if (input.parentElement.children.length < 2) {
                    showValidationInfo(input, "Invalid email address");
                }
            } else {

                input.classList.remove("invalid");
                input.classList.add("valid");
                if (input.parentElement.children.length === 2) {
                    document.getElementById("emailValidationInfo").remove()
                }
                return "OK"

            }
            break;
        case input === message:
            if (!messagePattern.test(input.value)) {
                input.classList.add("invalid")
                if (input.parentElement.children.length < 2) {
                    showValidationInfo(input, "Message cannot be empty");
                }
            } else {
                input.classList.remove("invalid");
                input.classList.add("valid");
                if (input.parentElement.children.length === 2) {
                    document.getElementById("messageValidationInfo").remove()
                }
            }
            return "OK"

            break;
        default:
            return "OK"
            break;
    }
}

function showValidationInfo(input, text) {
    let element = document.createElement("div");
    element.id = `${input.name}ValidationInfo`
    element.classList.add("validationInfo")
    element.innerText = text;
    input.insertAdjacentElement("afterend", element);
}



// function invalidInput(validityArray) {
//     if (validityArray[0] === false) {
//         highlightInvalid(inputs[0])
//     }
//     if (validityArray[1] === false) {
//         highlightInvalid(inputs[1])
//         console.log("email invalid");
//     }
//     if (validityArray[2] === false) {
//         highlightInvalid(inputs[2])
//         console.log("message invalid");
//     }
// }

// function validInput() {
//     inputs.forEach(input => {
//         removeInvalid(input);
//     })
//     console.log("everything works");
// }

// function highlightInvalid(input) {
//     input.classList.add("invalid")
// }

// function removeInvalid(input) {
//     input.classList.remove("invalid");
// }

