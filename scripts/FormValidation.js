export class FormValidation {
  constructor(options, formElement) {
    this._options = options;
    this._formElement = formElement;
  }

  _setEventListeners() {
    const inputList = [...this._formElement.querySelectorAll(this._options.inputSelector)];
    const buttonElement = this._formElement.querySelector(
      this._options.submitButtonSelector
    );
    
    this._formElement.addEventListener("submit", (evt) => evt.preventDefault());
    
    //Сброс состояния кнопки, после сабмита
    this._formElement.addEventListener("reset", () => {
      setTimeout(() => this._setButtonState(inputList,buttonElement), 0);
    });
    
    //Установка состояния кнопки до ввода данных
    this._setButtonState(inputList,buttonElement);
    
    //Проверка всех инпутов и установка состояния кнопки
    this._formElement
      .querySelectorAll(this._options.inputSelector).forEach(inputElement => inputElement
      .addEventListener("input", () => {
        this._toggleInputError(inputElement);
        this._setButtonState(inputList,buttonElement);
      }));
  }

  _setButtonState(inputList,buttonElement) {
    if(this._getInputStatus(inputList)){
      buttonElement.setAttribute("disabled", "disabled");
      buttonElement.classList.remove(this._options.activeButtonClass);
    } else {
      buttonElement.removeAttribute("disabled", "disabled");
      buttonElement.classList.add(this._options.activeButtonClass);
    }
  }
  
  //проверка всех инпутов формы
  _getInputStatus(inputList) {
    return inputList.some((input) => !input.validity.valid);
  }

  //Установка\удаление поля с ошибкой
  _toggleInputError(inputElement) {
    !inputElement.validity.valid
      ? this._showInputError(inputElement)
      : this._hideInputError(inputElement)
  }

  _showInputError(inputElement) {
    //Выбор нужного span с ошибкой
    const errorElement = this._formElement.querySelector(
      `.${inputElement.name}-input-error`
    );
    
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._options.errorClass);
    inputElement.classList.add(this._options.inputErrorBorder);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.name}-input-error`
    );
    errorElement.classList.remove(this._options.errorClass);
    inputElement.classList.remove(this._options.inputErrorBorder);
  }

  enableValidation() {
    this._setEventListeners();
  }
}
