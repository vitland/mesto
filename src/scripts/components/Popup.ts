export class Popup {
  _popup;

  constructor(popupSelector: string) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose = (evt: KeyboardEvent): void => {
    if (evt.key === 'Escape') {
      window.removeEventListener('keydown', this._handleEscClose);
      this._popup.classList.remove('popup_opened');
    }
  };

  open(): void {
    window.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add('popup_opened');
  }

  close(): void {
    window.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove('popup_opened');
  }

  setEventListeners(): void {
    this._popup.addEventListener(
      'mousedown',
      (evt: Event & { target: Element }) => {
        if (
          evt.target.classList.contains('popup_opened') ||
          evt.target.classList.contains('popup__close-icon')
        ) {
          this.close();
        }
      }
    );

    window.addEventListener('keydown', this._handleEscClose);
  }
}
