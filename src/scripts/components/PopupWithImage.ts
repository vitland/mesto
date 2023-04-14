import { popupImageSelector, popupImageCaptionSelector } from "../utils/constants.js";
import { Popup } from "./Popup";


export class PopupWithImage extends Popup {
  _popupImage;
  _popupImageCaption;

  constructor(popupSelector: string){
    super(popupSelector);
    this._popupImage = this._popup.querySelector(popupImageSelector) as HTMLImageElement;
    this._popupImageCaption = this._popupImage.querySelector(popupImageCaptionSelector)
  }

  open(args?: {name:string, link:string}){
    const {name, link} = args
    super.open()
    console.log(this._popup)
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupImageCaption.textContent = name;
  }
}