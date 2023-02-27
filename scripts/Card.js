import { openImagePopup } from "./index.js";

export class Card {
  constructor(data) {
    this._name = data.name;
    this._link = data.link;
  }

  _getTemplate() {
    return document
      .querySelector(".elements__template")
      .content.querySelector(".element")
      .cloneNode(true);
  }

  _setEventListeners(element) {
    element
      .querySelector(".element__bin")
      .addEventListener("click", () => this._removeHandler(element));
    element
      .querySelector(".element__fav")
      .addEventListener("click", this._likeToggleHandler);
    element
      .querySelector(".element__image")
      .addEventListener("click", this._clickOnImageHandler);
  }

  _removeHandler(element) {
    element.remove();
  }

  _likeToggleHandler(evt) {
    evt.target.classList.toggle("element__fav_active");
  }

  _clickOnImageHandler(evt) {
    openImagePopup({ name: evt.target.alt, link: evt.target.src });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners(this._element);

    this._imageCaption = this._element.querySelector(".element__text");
    this._image = this._element.querySelector(".element__image");
    this._image.src = this._link;
    this._image.alt = this._name;
    this._imageCaption.textContent = this._name;

    return this._element;
  }
}
