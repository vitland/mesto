//Попапы
const popupPlace = document.querySelector(".popup_type_place");
const popupProfile = document.querySelector(".popup_type_profile");
const popupImage = document.querySelector(".popup_type_image");

const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__occupation");

//Кнопка и форма попап профиля
const changeProfileBtn = document.querySelector(".profile__button-change");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_occupation");
// Кнопка и инпуты попап новое место
const addPlaceBtn = document.querySelector(".profile__button-add");
const placeForm = document.querySelector(".popup__form_type_place");
const placeNameInput = document.querySelector(".popup__input_type_place-name");
const placeImageInput = document.querySelector(".popup__input_type_place-image");

const elementImage = popupImage.querySelector(".popup__image");
const elementImageCaption = popupImage.querySelector(".popup__image-caption");

const popupCloseBtnList = document.querySelectorAll(".popup__close-icon");
const elementsContainer = document.querySelector(".elements");

const elementTemplate = document
  .querySelector(".elements__template")
  .content.querySelector(".element");

function populateElements(places) {
  const elements = places.map((place) => createElement(place));
  elementsContainer.append(...elements);
}

function createElement({ name, link }) {
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
    openImagePopup({ name, link });
  });

  return element;
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function openProfilePopup() {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
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

function submitForm(formElementClass) {
  formElementClass.includes('popup__form_type_profile')?submitProfile():submitPlace()
}

function submitProfile() {
  closePopup(popupProfile);
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

function submitPlace() {
  closePopup(popupPlace);
  const element = createElement({
    name: placeNameInput.value,
    link: placeImageInput.value,
  });
  elementsContainer.prepend(element);
  placeForm.reset();
}

function removePlace(element) {
  element.remove();
}

function likePlace(evt) {
  evt.target.classList.toggle("element__fav_active");
}

populateElements(elementsArr);

//Обработчик на все кнопки закрытия
popupCloseBtnList.forEach((btn) => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", () => {
    closePopup(popup);
  });
});

changeProfileBtn.addEventListener("click", openProfilePopup);
addPlaceBtn.addEventListener("click", openPlacePopup);

//Обработчик на все кнопки сохранить
// profileForm.addEventListener("submit", submitProfile);
// placeForm.addEventListener("submit", submitPlace);
