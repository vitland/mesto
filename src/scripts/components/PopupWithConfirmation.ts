import { Popup } from './Popup';
import { config } from '../utils/constants';

export class PopupWithConfirmation extends Popup {
  _handleSubmit: (cardId: string, element: Element) => void;
  _button;
  _cardId: string;
  _element: Element;

  constructor(
    popupSelector: string,
    handleSubmit: (cardId: string, element: Element) => void
  ) {
    super(popupSelector);
    this._button = this._popup.querySelector(config.submitButtonSelector);
    this._handleSubmit = handleSubmit;
  }

  _setEventListeners(): void {
    super.setEventListeners();
    this._button.addEventListener('mousedown', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._cardId, this._element);
    });
  }

  open(cardId?: string, element?: Element): void {
    super.open();
    this._cardId = cardId;
    this._element = element;
    this._setEventListeners();
  }
}
