import { Popup } from './Popup';

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._button = this._popup.querySelector('.form__submit-button');
    this._handleSubmit = handleSubmit
  }

  _setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener('mousedown', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._cardId, this._element);
    });
  }

  close() {
    super.close();
  }

  open(cardId, element) {
    super.open();
    this._cardId = cardId;
    this._element = element;
    this._setEventListeners()
  }
}
