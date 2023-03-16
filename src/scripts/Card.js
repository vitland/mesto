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
      .content.querySelector('.element')
      .cloneNode(true);
  }

  _setEventListeners(element) {
    element
      .querySelector('.element__bin')
      .addEventListener('click', () => this._removeHandler(element));
    element
      .querySelector('.element__fav')
      .addEventListener('click', this._likeToggleHandler);
    element
      .querySelector('.element__image')
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

    this._imageCaption = this._element.querySelector('.element__text');
    this._image = this._element.querySelector('.element__image');
    this._image.src = this._link;
    this._image.alt = this._name;
    this._imageCaption.textContent = this._name;

    return this._element;
  }
}
