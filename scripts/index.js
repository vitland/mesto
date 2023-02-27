import { Card } from "./Card.js";

//Попапы
const popups = document.querySelectorAll(".popup");
const popupPlace = document.querySelector(".popup_type_place");
const popupProfile = document.querySelector(".popup_type_profile");
const popupImage = document.querySelector(".popup_type_image");

const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__occupation");

//Кнопка и форма попап профиля
const changeProfileBtn = document.querySelector(".profile__button-change");
const nameInput = document.querySelector(".form__input_type_name");
const jobInput = document.querySelector(".form__input_type_occupation");
// Кнопка и инпуты попап новое место
const addPlaceBtn = document.querySelector(".profile__button-add");
const placeNameInput = document.querySelector(".form__input_type_place-name");
const placeImageInput = document.querySelector(".form__input_type_place-image");

const elementImage = popupImage.querySelector(".popup__image");
const elementImageCaption = popupImage.querySelector(".popup__image-caption");
const elementsContainer = document.querySelector(".elements");

const profileForm = document.forms["profile-form"];
const placeForm = document.forms["place-form"];

function populateElements(places) {
  const elements = places.map((place) => new Card(place).generateCard());
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

export function openImagePopup({ name, link }) {
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
    link: placeImageInput.value,
  }).generateCard();

  elementsContainer.prepend(card);
  evt.target.reset();
}

populateElements(elementsArr);
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

changeProfileBtn.addEventListener("click", openProfilePopup);
addPlaceBtn.addEventListener("click", openPlacePopup);

//Обработчик форм
profileForm.addEventListener("submit", submitProfile);
placeForm.addEventListener("submit", submitPlace);

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  activeButtonClass: "form__submit-button_active",
  inputErrorClass: "form__input-error",
  errorClass: "form__input-error_visible",
  inputErrorBorder: "form__input_error",
});
