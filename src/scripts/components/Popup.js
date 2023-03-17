export class Popup{
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
    window.removeEventListener("keydown", this._handleEscClose)
    this._popup.classList.remove("popup_opened")
    }
  }
  
  open(){
    window.addEventListener("keydown", this._handleEscClose)
    this._popup.classList.add("popup_opened")
  }

  close(){
    window.removeEventListener("keydown", this._handleEscClose)
    this._popup.classList.remove("popup_opened")
  }

  setEventListeners(){
    this._popup.addEventListener("mousedown", (evt)=>{
      if (
        evt.target.classList.contains('popup_opened') ||
        evt.target.classList.contains('popup__close-icon')
      ) {
        this.close()
      }
    })

    window.addEventListener("keydown", this._handleEscClose)
  }
}