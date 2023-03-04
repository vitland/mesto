import { Card } from "./Card.js";
import { FormValidation } from "./FormValidation.js";
import config from "./config.js";
import cards from "./cards.js";

//Попапы
const popups = document.querySelectorAll(".popup");
const popupPlace = document.querySelector(".popup_type_place");
const popupProfile = document.querySelector(".popup_type_profile");
const popupImage = document.querySelector(".popup_type_image");

const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__occupation");

//Кнопка и форма попап профиля
const popupProfileOpenButton = document.querySelector(".profile__button-change");
const nameInput = document.querySelector(".form__input_type_name");
const jobInput = document.querySelector(".form__input_type_occupation");
// Кнопка и инпуты попап новое место
const popupPlaceOpenButton = document.querySelector(".profile__button-add");
const placeNameInput = document.querySelector(".form__input_type_place-name");
const placeImageInput = document.querySelector(".form__input_type_place-image");

const elementImage = popupImage.querySelector(".popup__image");
const elementImageCaption = popupImage.querySelector(".popup__image-caption");
const elementsContainer = document.querySelector(".elements");

const profileForm = document.forms["profile-form"];
const placeForm = document.forms["place-form"];

const profileFormValidation = new FormValidation(config, profileForm)
const placeFormValidation = new FormValidation(config, placeForm)

function populateElements(places) {
  const elements = places.map((place) => new Card(place, ".elements__template", openImagePopup).generateCard());
  elementsContainer.append(...elements);
}

function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  window.removeEventListener("keydown", closePopupByEsc, false);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  //Слушатель на закрытие попапа по Esc
  window.addEventListener("keydown", closePopupByEsc, false);
}

function openProfilePopup() {
  //Актуализация информации в инпутах профиля
  fillProfileInputs();
  openPopup(popupProfile);
}

function openPlacePopup() {
  openPopup(popupPlace);
}

function openImagePopup({ name, link }) {
  openPopup(popupImage);
  elementImage.src = link;
  elementImage.alt = name;
  elementImageCaption.textContent = name;
}

function fillProfileInputs() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function submitProfile() {
  closePopup(popupProfile);
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

function submitPlace(evt) {
  closePopup(popupPlace);

  const card = new Card({
    name: placeNameInput.value,
    link: placeImageInput.value
  },".elements__template", openImagePopup).generateCard();

  elementsContainer.prepend(card);
  evt.target.reset();
}

populateElements(cards);
//Первоначальное заполнение инпутов профиля
fillProfileInputs();

//Слушатель на попапы и кнопки закрытия
popups.forEach((popup) =>
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__close-icon")
    ) {
      closePopup(popup);
    }
  })
);

popupProfileOpenButton.addEventListener("click", openProfilePopup);
popupPlaceOpenButton.addEventListener("click", openPlacePopup);

//Обработчик форм
profileForm.addEventListener("submit", submitProfile);
placeForm.addEventListener("submit", submitPlace);

profileFormValidation.enableValidation()
placeFormValidation.enableValidation()

