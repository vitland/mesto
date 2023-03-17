import { elementImage, elementImageCaption } from "../utils/constants.js";
import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
  }

  open({name, link}){
    super.open()
    elementImage.src = link;
    elementImage.alt = name;
    elementImageCaption.textContent = name;
  }
}