import {
  elementCaptionSelector,
  elementImageSelector,
  elementSelector,
  elementLikeCounter,
  favButtonSelector,
  removeButtonSelector,
} from '../utils/constants.js';

export class Card {
  constructor(
    data,
    currentUser,
    templateSelector,
    openImagePopup,
    openConfirmPopup,
    likeHandler
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._likeHandler = likeHandler;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._currentUser = currentUser;
    this._templateSelector = templateSelector;
    this._openImagePopup = openImagePopup;
    this._openConfirmPopup = openConfirmPopup;
    this.element = this._getTemplate();
    this._image = this.element.querySelector(elementImageSelector);
    this._likeCounter = this.element.querySelector(elementLikeCounter);
    this._imageCaption = this.element.querySelector(elementCaptionSelector);
    this._removeIcon = this.element.querySelector('.element__bin');
    this._favButton = this.element.querySelector(favButtonSelector);
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(elementSelector)
      .cloneNode(true);
  }

  _setEventListeners() {
    this.element
      .querySelector(removeButtonSelector)
      .addEventListener('click', () =>
        this._openConfirmPopup(this._cardId, this.element)
      );
    this.element
      .querySelector(favButtonSelector)
      .addEventListener('click', (evt) =>
        this._likeHandler(evt, this._cardId, this._likeCounter)
      );
    this.element
      .querySelector(elementImageSelector)
      .addEventListener('click', (evt) => {
        this._openImagePopup({ name: evt.target.alt, link: evt.target.src });
      });
  }

  generateCard() {
      if (this._currentUser.id === this._ownerId) {
        this._removeIcon.classList.remove('disabled');
      }
      if (this._likes.find((el) => el._id === this._currentUser.id)) {
        
        this._favButton.classList.toggle('element__fav_active');
      }

    this._setEventListeners();
    this._image.src = this._link;
    this._image.alt = this._name;
    this._imageCaption.textContent = this._name;
    this._likeCounter.textContent = this._likes.length;
    return this.element;
  }
}
