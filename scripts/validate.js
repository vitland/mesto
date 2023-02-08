function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonSelector,
  inputErrorClass,
  errorClass,
}) {
  const formList = [...document.querySelectorAll(formSelector)];

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonSelector, inputErrorClass, errorClass)
  });


}

function setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonSelector, inputErrorClass, errorClass) {
  
}

function checkInputValidity(formElement, inputElement) {
}

function showInputError(formElement, inputElement, errorMessage) {
}

function hideInputError(formElement, inputElement) {
}

function hasInvalidInput(inputList) {
}

function toggleButtonState(inputList, buttonElement) {
}

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
