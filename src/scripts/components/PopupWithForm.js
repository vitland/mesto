import { formSelector, inputListSelector } from '../utils/constants.js';
import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector(formSelector);
    this._inputList = Array.from(this._form.querySelectorAll(inputListSelector));
  }

  _getInputValues() {
    return this._inputList.reduce((acc, cur) => {
      acc[cur.name] = cur.value;
      return acc;
    }, {});
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

  open(){
    super.open()
  }
}
