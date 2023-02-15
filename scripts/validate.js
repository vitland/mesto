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
    const buttonElement = formElement.querySelector(
      options.submitButtonSelector
    );
    //Установка состояния кнопки до ввода данных
    toggleButtonState(inputList, buttonElement, options.activeButtonClass);

    //Сброс состояния кнопки, после сабмита
    formElement.addEventListener("reset", () => {
      //Таймату, чтобы сброс точно произошел в конце
      setTimeout(() => {
        toggleButtonState(inputList, buttonElement, options.activeButtonClass);
      }, 0);
    });

    inputList.forEach((inputElement) =>
      inputElement.addEventListener("input", () => {
        //Проверка всех инпутов и установка состояния кнопки
        checkInputValidity(
          formElement,
          inputElement,
          options.errorClass,
          options.inputErrorBorder
        );
        toggleButtonState(inputList, buttonElement, options.activeButtonClass);
      })
    );
  });
}

function checkInputValidity(
  formElement,
  inputElement,
  errorClass,
  inputErrorBorder
) {
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

function showInputError(
  formElement,
  inputElement,
  errorMessage,
  errorClass,
  inputErrorBorder
) {
  //Выбор нужного инпута с ошибкой
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-input-error`
  );
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
  inputElement.classList.add(inputErrorBorder);
}

function hideInputError(
  formElement,
  inputElement,
  errorClass,
  inputErrorBorder
) {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-input-error`
  );
  errorElement.classList.remove(errorClass);
  inputElement.classList.remove(inputErrorBorder);
}

function hasInvalidInput(inputList) {
  return inputList.some((input) => !input.validity.valid);
}

function toggleButtonState(inputList, buttonElement, activeButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", "disabled");
    buttonElement.classList.remove(activeButtonClass);
  } else {
    buttonElement.removeAttribute("disabled", "disabled");
    buttonElement.classList.add(activeButtonClass);
  }
}
