import { formSelector, inputListSelector, config } from '../utils/constants.js';
import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector(formSelector);
    this._inputList = Array.from(this._form.querySelectorAll(inputListSelector));
    this._submitButton = this._form.querySelector(config.submitButtonSelector)
  }

  _getInputValues() {
    return this._inputList.reduce((acc, cur) => {
      acc[cur.name] = cur.value;
      return acc;
    }, {});
  }

  renderLoading(isLoading){
    if(isLoading){
      this._submitButton.textContent = 'Сохранение...'
    }else {
    this._submitButton.textContent = 'Сохранить'
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
