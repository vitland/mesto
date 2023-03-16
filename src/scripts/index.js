import { Card } from './Card.js';
import { Section } from './Seciton.js';
import { Popup } from './Popup.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { FormValidation } from './FormValidation.js';
import config from './config.js';
import cards from './cards.js';

//Попапы
const popups = document.querySelectorAll('.popup');
const popupPlace = document.querySelector('.popup_type_place');
const popupProfile = document.querySelector('.popup_type_profile');
const popupImage = document.querySelector('.popup_type_image');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__occupation');

//Кнопка и форма попап профиля
const popupWithUserInfoOpenButton = document.querySelector(
  '.profile__button-change'
);
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_occupation');
// Кнопка и инпуты попап новое место
const popupWithPlaceInfoOpenButton = document.querySelector('.profile__button-add');
const placeNameInput = document.querySelector('.form__input_type_place-name');
const placeImageInput = document.querySelector('.form__input_type_place-image');

export const elementImage = popupImage.querySelector('.popup__image');
export const elementImageCaption = popupImage.querySelector(
  '.popup__image-caption'
);
const elementsContainer = '.elements';

const profileForm = document.forms['profile-form'];
const placeForm = document.forms['place-form'];

const profileFormValidation = new FormValidation(config, profileForm);
const placeFormValidation = new FormValidation(config, placeForm);

const placeList = new Section(
  {
    items: cards,
    renderer: (place) => {
      const card = new Card(place, '.elements__template', ({ name, link }) =>
        popupWithImage.open({ name, link })
      );
      const cardElement = card.generateCard();
      placeList.addItem(cardElement);
    },
  },
  elementsContainer
);

const popupWithImage = new PopupWithImage('.popup_type_image');

const popupWithUserInfo = new PopupWithForm(
  '.popup_type_profile',
  ({name, job}) => {
    profileName.textContent = name;
    profileJob.textContent = job;
    popupWithUserInfo.close();
  }
);

const popupWithPlaceInfo = new PopupWithForm(
  '.popup_type_place',
  ({placeName, placeImage}) => {
    const card = new Card(
      {
        name: placeName,
        link: placeImage,
      },
      '.elements__template',
      popupWithImage.open
    ).generateCard();
  
    placeList.addItem(card);

    popupWithPlaceInfo.close();
  }
);

function fillProfileInputs() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

placeList.renderItems();

//Первоначальное заполнение инпутов профиля
fillProfileInputs();

popupWithUserInfoOpenButton.addEventListener('click', () => popupWithUserInfo.open());
popupWithUserInfo.setEventListeners();
popupWithPlaceInfoOpenButton.addEventListener('click', () => popupWithPlaceInfo.open());
popupWithPlaceInfo.setEventListeners()
popupWithImage.setEventListeners();

//Обработчик форм
profileFormValidation.enableValidation();
placeFormValidation.enableValidation();
