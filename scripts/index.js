//Попапы
const popup = document.querySelector(".popup");

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

const popupCloseBtnList = document.querySelectorAll(".popup__close-icon");
const elementsContainer = document.querySelector(".elements");
const formList = document.querySelectorAll(".form");

const elementTemplate = document
  .querySelector(".elements__template")
  .content.querySelector(".element");

function populateElements(places) {
  const elements = places.map((place) => createElement(place));
  elementsContainer.append(...elements);
}

function createElement({name, link}) {
  const element = elementTemplate.cloneNode(true);
  const image = element.querySelector(".element__image");
  image.src = link;
  image.alt = name;
  element.querySelector(".element__text").textContent = name;

  //Слушатель на удаление
  element.querySelector(".element__bin").addEventListener("click", () => {
    removePlace(element);
  });
  //Слушатель на лайк
  element.querySelector(".element__fav").addEventListener("click", likePlace);
  //Слушатель на открытие картинки
  element.querySelector(".element__image").addEventListener("click", () => {
    openImagePopup({name, link});
  });

  return element;
}

function closeByEsc(key, popup) {
  if (key === "Escape") {
    window.removeEventListener('keydown', closeByEsc)
    closePopup(popup)
  }
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function openPopup(popup) {
  popup.classList.add("popup_opened");

  //Закрывает попап по Esc
  window.addEventListener('keydown', (evt) => closeByEsc(evt.key, popup))
  //Закрывает поппап по клику в оверлей
  popup.addEventListener("click",() => closePopup(popup))
}

function openProfilePopup() {
  populateInputs();
  openPopup(popupProfile);
}

function openPlacePopup() {
  openPopup(popupPlace);
}

function openImagePopup({name, link}) {
  openPopup(popupImage);
  elementImage.src = link;
  elementImage.alt = name;
  elementImageCaption.textContent = name;
}

function populateInputs() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function submitForm(formElement) {
  formElement.classList.contains("form_type_profile")
    ? submitProfile()
    : submitPlace(formElement);
}

function submitProfile() {
  closePopup(popupProfile);
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

function submitPlace(formElement) {
  closePopup(popupPlace);
  const element = createElement({
    name: placeNameInput.value,
    link: placeImageInput.value,
  });
  elementsContainer.prepend(element);
  formElement.reset();
}

function removePlace(element) {
  element.remove();
}

function likePlace(evt) {
  evt.target.classList.toggle("element__fav_active");
}

populateElements(elementsArr);
populateInputs();

//Обработчик на все кнопки закрытия
popupCloseBtnList.forEach((btn) => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", () => {
    closePopup(popup);
  });
});




changeProfileBtn.addEventListener("click", openProfilePopup);
addPlaceBtn.addEventListener("click", openPlacePopup);

//Обработчик всех форм
formList.forEach((formElement) =>
  formElement.addEventListener("submit", () => submitForm(formElement))
);

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_disabled",
  inputErrorClass: "form__input-error",
  errorClass: "form__input-error_visible",
});
