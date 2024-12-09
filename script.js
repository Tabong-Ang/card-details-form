const cardHolder = document.querySelector("#card-holder");
const cardNumber = document.querySelector("#card-number");
const expiryMonth = document.querySelector("#expiry-month");
const expiryYear = document.querySelector("#expiry-year");
const cvcNumber = document.querySelector("#cvc-number");
const cardNumErr = document.querySelector("#card-number + span.error");
const cvcErr = document.querySelector("#cvc-number + span.mm-yy-cvv-error");
const modal = document.querySelector("#continue");
let continueBtn = document.querySelector("#continue-btn");

function validateField(inputElement, errorElement, minLength) {
  if (inputElement.validity.valueMissing) {
    errorElement.textContent = "can't be blank";
    inputElement.classList.add("invalid");
  } else if (isNaN(inputElement.value)) {
    errorElement.textContent = "Please enter numbers only";
    inputElement.classList.add("invalid");
  } else if (inputElement.value.length < minLength) {
    errorElement.textContent = `Please enter at least ${minLength} characters`;
    inputElement.classList.add("invalid");
  } else {
    errorElement.textContent = "";
    inputElement.classList.remove("invalid");
  }
}

cardNumber.addEventListener("input", () => {
  validateField(cardNumber, cardNumErr, 16);
});

expiryMonth.addEventListener("input", () => {
  validateField(expiryMonth, cvcErr, 2);
});

expiryYear.addEventListener("input", () => {
  validateField(expiryYear, cvcErr, 4);
});

cvcNumber.addEventListener("input", () => {
  validateField(cvcNumber, cvcErr, 3);
});

function resetForm() {
  cardHolder.value = "";
  cardNumber.value = "";
  expiryMonth.value = "";
  expiryYear.value = "";
  cvcNumber.value = "";
  cardNumErr.textContent = "";
  cvcErr.textContent = "";
}

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  validateField(cardNumber, cardNumErr, 16);
  validateField(expiryMonth, cvcErr, 2);
  validateField(expiryYear, cvcErr, 4);
  validateField(cvcNumber, cvcErr, 3);

  document.querySelector('form').style.display = 'none';
  if (
    cardNumber.validity.valid &&
    expiryMonth.validity.valid &&
    expiryYear.validity.valid &&
    cvcNumber.validity.valid
  ) {
    resetForm();
    modal.style.display = "block";
  } else {
    alert("Please fill in every field in the form correctly");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  continueBtn.addEventListener("click", () => {
    resetForm();
    modal.style.display = "none";
    document.querySelector('form').style.display = 'block';
  });
});
