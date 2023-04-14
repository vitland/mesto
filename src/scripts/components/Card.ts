import {
  elementCaptionSelector,
  elementImageSelector,
  elementSelector,
  elementLikeCounter,
  favButtonSelector,
  removeButtonSelector,
} from '../utils/constants.js';

interface cardData {
  name: string;
  link: string;
  likes: {_id:string}[];
  _id: string;
  owner: {
    _id: string;
  }
}
export class Card {
  _cardData;
  _likeHandler;
  _currentUser;
  _templateSelector;
  _openImagePopup;
  _openConfirmPopup;
  element;
  _image;
  _likeCounter;
  _imageCaption;
  _removeIcon;
  _favButton;

  constructor(
    cardData: cardData,
    currentUser: { name: string; about: string; id: string; avatar: string },
    templateSelector: string,
    openImagePopup: (args: { name: string, link: string }) => void,
    openConfirmPopup: (cardId: string, element: HTMLElement) => void,
    likeHandler: (evt: Event, cardId: string, likeCounter: Element) => void
  ) {
    this._cardData = cardData;
    this._likeHandler = likeHandler;
    this._currentUser = currentUser;
    this._templateSelector = templateSelector;
    this._openImagePopup = openImagePopup;
    this._openConfirmPopup = openConfirmPopup;
    this.element = this._getTemplate();
    this._image = this.element.querySelector(elementImageSelector) as HTMLImageElement;
    this._likeCounter = this.element.querySelector(elementLikeCounter);
    this._imageCaption = this.element.querySelector(elementCaptionSelector);
    this._removeIcon = this.element.querySelector('.element__bin');
    this._favButton = this.element.querySelector(favButtonSelector);
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector) as HTMLTemplateElement
    return template.content.querySelector(elementSelector)
      .cloneNode(true) as HTMLElement;
  }

  _setEventListeners() {
    this.element
      .querySelector(removeButtonSelector)
      .addEventListener('click', () =>
        this._openConfirmPopup(this._cardData._id, this.element)
      );
    this.element
      .querySelector(favButtonSelector)
      .addEventListener('click', (evt) =>
        this._likeHandler(evt, this._cardData._id, this._likeCounter)
      );
    this.element
      .querySelector(elementImageSelector)
      .addEventListener('click', (evt) => {
        this._openImagePopup({ name: (evt.target as HTMLImageElement).alt, link: (evt.target as HTMLImageElement).src });
      });
  }

  generateCard() {
    if (this._currentUser.id === this._cardData.owner._id) {
      this._removeIcon.classList.remove('disabled');
    }
    if (this._cardData.likes.find((el) => el._id === this._currentUser.id)) {

      this._favButton.classList.toggle('element__fav_active');
    }

    this._setEventListeners();
    this._image.src = this._cardData.link;
    this._image.alt = this._cardData.name;
    this._imageCaption.textContent = this._cardData.name;
    this._likeCounter.textContent = this._cardData.likes.length.toString();
    return this.element;
  }
}
