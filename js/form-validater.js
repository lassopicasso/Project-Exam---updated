const formContainer = document.querySelector(".input-text");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const inputMessage = document.getElementById("inputMessage");
const cta = document.getElementById("cta-submit");
const submitMessage = document.getElementById("submit-succeed");

let inputObject = "";
let inputLength = 0;
let eventTarget;

formContainer.addEventListener("focusout", inputCollector);
formContainer.addEventListener("focusin", tempErrorRemover);
formContainer.addEventListener("keydown", checkAll);
cta.addEventListener("click", ctaSubmit);

/* Collect Inputs */
function inputCollector(event) {
  inputObject = event.target.id;
  eventTarget = event.target;

  const feedbackError = document.getElementById(`${inputObject}Error`);
  if (inputObject === "name" || inputObject === "subject" || inputObject === "inputMessage") {
    if (checkLength(inputObject, eventTarget)) {
      feedbackError.style.display = "none";
      eventTarget.style.borderColor = "#92e594";
    } else {
      feedbackError.style.display = "block";
      eventTarget.style.borderColor = "#d93814";
    }
  } else {
    if (checkEmail(eventTarget.value)) {
      feedbackError.style.display = "none";
      eventTarget.style.borderColor = "#92e594";
    } else {
      feedbackError.style.display = "block";
      eventTarget.style.borderColor = "#d93814";
    }
  }
}

/*Validate lengths*/
function checkLength(inputObject, length) {
  length = length.value.replace(/\s+/g, "").length; //"Replace" removes all whitespaces, also between characters.
  if (inputObject === "name" && length > 5) {
    return true;
  } else if (inputObject === "subject" && length > 15) {
    return true;
  } else if (inputObject === "inputMessage" && length > 25) {
    return true;
  } else {
    return false;
  }
}

/*Validate email*/
function checkEmail(email) {
  const regularExpression = /\S+@\S+\.\S+/;
  const matchExpressionString = regularExpression.test(email);
  return matchExpressionString;
}

/*If user didn't typed input correct, hide error if user is refocused on the same input field*/
function tempErrorRemover(event) {
  inputObject = event.target.id;
  const feedbackError = document.getElementById(`${inputObject}Error`);
  feedbackError.style.display = "none";
}

/*Check if all input fields is validated*/
let disableSubmit = "";

function checkAll() {
  if (checkLength("name", fullName) && checkLength("subject", subject) && checkLength("inputMessage", inputMessage) && checkEmail(email.value)) {
    disableSubmit = "true";
    cta.disabled = false;

    cta.classList.remove("cta-opacity");
  } else {
    cta.classList.add("cta-opacity");
    cta.disabled = true;
  }
}
/*If inputs fields are validated, make submit button functional */
function ctaSubmit(event) {
  event.preventDefault();
  if (disableSubmit === "true") {
    submitMessage.style.display = "block";
  }
}
