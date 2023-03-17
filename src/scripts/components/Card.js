import { elementCaptionSelector, elementImageSelector, elementSelector, favButtonSelector, removeButtonSelector } from "../utils/constants.js";

export class Card {
  constructor(data, templateSelector, openImagePopup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openImagePopup = openImagePopup;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(elementSelector)
      .cloneNode(true);
  }

  _setEventListeners(element) {
    element
      .querySelector(removeButtonSelector)
      .addEventListener('click', () => this._removeHandler(element));
    element
      .querySelector(favButtonSelector)
      .addEventListener('click', this._likeToggleHandler);
    element
      .querySelector(elementImageSelector)
      .addEventListener('click', (evt) => {
        this._openImagePopup({ name: evt.target.alt, link: evt.target.src });
      });
  }

  _removeHandler(element) {
    element.remove();
    element = null;
  }

  _likeToggleHandler(evt) {
    evt.target.classList.toggle('element__fav_active');
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners(this._element);
    this._imageCaption = this._element.querySelector(elementCaptionSelector);
    this._image = this._element.querySelector(elementImageSelector);
    this._image.src = this._link;
    this._image.alt = this._name;
    this._imageCaption.textContent = this._name;

    return this._element;
  }
}
