import { popupImageSelector, popupImageCaptionSelector } from "../utils/constants.js";
import { Popup } from "./Popup";
export class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._popupImage = this._popup.querySelector(popupImageSelector);
    this._popupImageCaption = this._popup.querySelector(popupImageCaptionSelector)
  }

  open({name, link}){
    super.open()
    console.log(this._popup)
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupImageCaption.textContent = name;
  }
}