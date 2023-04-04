
export const popupPlaceSelector = '.popup_type_place';
export const popupProfileSelector = '.popup_type_profile';
export const popupImageSelector = '.popup_type_image';
export const popupNewAvatarSelector = '.popup_type_avatar';
export const popupConfirmSelector = '.popup_type_confirm';

export const userName = '.profile__name';
export const userJob = '.profile__occupation';
export const userAvatar = '.profile__avatar'

export const elementsContainer = '.elements';
export const elementsTemplate = '.elements__template';
export const elementSelector = '.element';
export const elementImageSelector = '.element__image';
export const elementCaptionSelector = '.element__text'
export const elementLikeCounter = '.element__fav-counter'
export const removeButtonSelector = '.element__bin';
export const favButtonSelector = '.element__fav';

export const config = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".popup__submit-button",
  activeButtonClass: "popup__submit-button_active",
  inputErrorClass: "form__input-error",
  errorClass: "form__input-error_visible",
  inputErrorBorder: "form__input_error",
}

// Кнопка изменения аватара
export const edtiAvatarButton = document.querySelector('.profile__avatar-container')
// Кнопка и форма попап профиля
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
export const avatarForm = document.forms['avatar-form']
