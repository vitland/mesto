function enableValidation(options) {
  setEventListeners(options);
}

function setEventListeners(options) {
  const formList = [...document.querySelectorAll(options.formSelector)];
//Сброс стандартного поведения для форм
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    
    const inputList = [...formElement.querySelectorAll(options.inputSelector)];
    const buttonElement = formElement.querySelector(".form__submit-button");
    //Установка состояния кнопки до ввода данных
    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) =>
      inputElement.addEventListener("input", () => {
        //Проверка всех инпутов и установка состояния кнопки
        checkInputValidity(formElement, inputElement, options.errorClass, options.inputErrorBorder);
        toggleButtonState(inputList, buttonElement);
      })
    );
  });
}

function checkInputValidity(formElement, inputElement, errorClass,inputErrorBorder) {
  !inputElement.validity.valid
    ? showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      errorClass,
      inputErrorBorder
    )
    : hideInputError(formElement, inputElement, errorClass, inputErrorBorder);
}

function showInputError(formElement, inputElement, errorMessage, errorClass, inputErrorBorder) {
  //Выбор нужного инпута с ошибкой
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
  inputElement.classList.add(inputErrorBorder)
}

function hideInputError(formElement, inputElement, errorClass,inputErrorBorder) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
  errorElement.classList.remove(errorClass);
  inputElement.classList.remove(inputErrorBorder)
}

function hasInvalidInput(inputList) {
  return inputList.some(input => !input.validity.valid)
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', 'disabled')
    buttonElement.classList.remove('form__submit-button_active')
  } else {
    buttonElement.removeAttribute('disabled', 'disabled')
    buttonElement.classList.add('form__submit-button_active')
  }
}


