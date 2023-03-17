
export const popupPlaceSelector = '.popup_type_place';
export const popupProfileSelector = '.popup_type_profile';
export const popupImageSelector = '.popup_type_image';

export const userName = '.profile__name';
export const userJob = '.profile__occupation';

export const elementsContainer = '.elements';
export const elementsTemplate = '.elements__template';
export const elementSelector = '.element';
export const elementImageSelector = '.element__image';
export const elementCaptionSelector = '.element__text'
export const removeButtonSelector = '.element__bin';
export const favButtonSelector = '.element__fav';


//Кнопка и форма попап профиля
export const popupWithUserInfoOpenButton = document.querySelector(
  '.profile__button-change'
);
export const inputListSelector = '.form__input';
export const nameInput = document.querySelector('.form__input_type_name');
export const jobInput = document.querySelector('.form__input_type_occupation');
// Кнопка и инпуты попап новое место
export const popupWithPlaceInfoOpenButton = document.querySelector(
  '.profile__button-add'
);
export const elementImage = document.querySelector('.popup__image');
export const elementImageCaption = document.querySelector(
  '.popup__image-caption'
);
export const formSelector = '.form';
export const profileForm = document.forms['profile-form'];
export const placeForm = document.forms['place-form'];

export const cards = [{
  name: "Домбай", link: "https://i.ibb.co/1m7JJCD/dombai.jpg",
}, {
  name: "Эльбрус", link: "https://i.ibb.co/2NmW2cp/elbrus.jpg",
}, {
  name: "Красноярск", link: "https://i.ibb.co/wWLHmvH/krasnoyarsk.jpg",
}, {
  name: "Сочи", link: "https://i.ibb.co/brGLRJ6/sochi.jpg",
}, {
  name: "Москва", link: "https://i.ibb.co/NxXrbCV/moscow.jpg",
}, {
  name: "Сочи, дендрарий", link: "https://i.ibb.co/TKL1Bnf/sochi2.jpg",
},];
