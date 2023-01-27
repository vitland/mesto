//Попапы
const popupPlace = document.querySelector(".popup_type_place");
const popupProfile = document.querySelector(".popup_type_profile");
const popupImage = document.querySelector(".popup_type_image");

const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__occupation");

//Кнопка и форма попап профиля
const popupProfileCloseBtn = document.querySelector(".popup__close-icon_type_profile");
const changeProfileBtn = document.querySelector(".profile__button-change");
const profileForm = document.querySelector(".popup__form_type_profile");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_occupation");
// Кнопка и инпуты попап новое место
const addPlaceBtn = document.querySelector(".profile__button-add");
const popupPlaceCloseBtn = document.querySelector(".popup__close-icon_type_place");
const placeForm = document.querySelector(".popup__form_type_place");
const placeNameInput = document.querySelector(".popup__input_type_place-name");
const placeImageInput = document.querySelector(".popup__input_type_place-image");

const elementImage = popupImage.querySelector('.popup__image')
const elementImageCaption = popupImage.querySelector('.popup__image-caption')
const popupImageCloseBtn = document.querySelector(".popup__close-icon_type_image");

const elementsContainer = document.querySelector(".elements");
const elementsArr = [{
  name: "Домбай", url: "https://i.ibb.co/1m7JJCD/dombai.jpg",
}, {
  name: "Эльбрус", url: "https://i.ibb.co/2NmW2cp/elbrus.jpg",
}, {
  name: "Красноярск", url: "https://i.ibb.co/wWLHmvH/krasnoyarsk.jpg",
}, {
  name: "Сочи", url: "https://i.ibb.co/brGLRJ6/sochi.jpg",
}, {
  name: "Москва", url: "https://i.ibb.co/NxXrbCV/moscow.jpg",
}, {
  name: "Сочи, дендрарий", url: "https://i.ibb.co/TKL1Bnf/sochi2.jpg",
},];
const elementTemplate = document.querySelector(".elements__template").content.querySelector(".element");

function populateElements(places) {
  const elements = places.map((place) => createElement(place))
  elementsContainer.append(...elements);
}

function createElement({name, url}) {
  const element = elementTemplate.cloneNode(true);
  element.querySelector(".element__image").src = url;
  element.querySelector(".element__image").alt = name;
  element.querySelector(".element__text").textContent = name;

  //Слушатель на удаление
  element.querySelector(".element__bin").addEventListener('click', () => {
    removePlace(element)
  })
  //Слушатель на лайк
  element.querySelector(".element__fav").addEventListener("click", likePlace)
  //Слушатель на открытие картинки
  element.querySelector('.element__image').addEventListener("click", openImagePopup)

  return element
}

function closePopup(popup) {
  popup.classList.remove("popup_opened")
}

function openPopup(popup) {
  popup.classList.add("popup_opened")
}

function openProfilePopup() {
  openPopup(popupProfile)
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function openPlacePopup() {
  openPopup(popupPlace)
}

function openImagePopup(evt) {
  openPopup(popupImage)
  elementImage.src = evt.target.src
  elementImageCaption.textContent = evt.target.parentElement.textContent
}

function submitProfile(evt) {
  evt.preventDefault();
  closePopup(popupProfile);
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

function submitPlace(evt) {
  evt.preventDefault();
  closePopup(popupPlace);
  const element = createElement({name: placeNameInput.value, url: placeImageInput.value})
  elementsContainer.prepend(element)
  placeNameInput.value = ''
  placeImageInput.value = ''
}

function removePlace(element) {
  element.remove()
}

function likePlace(evt) {
  evt.target.classList.toggle("element__fav_active");
}

populateElements(elementsArr)

//Обработчик на все кнопки закрытия
popupProfileCloseBtn.addEventListener("click", () => {
  closePopup(popupProfile)
})
popupPlaceCloseBtn.addEventListener("click", () => {
  closePopup(popupPlace)
})
popupImageCloseBtn.addEventListener("click", () => {
  closePopup(popupImage)
})

changeProfileBtn.addEventListener("click", openProfilePopup);
addPlaceBtn.addEventListener("click", openPlacePopup);

//Обработчик на все кнопки сохранить
profileForm.addEventListener("submit", submitProfile)
placeForm.addEventListener("submit", submitPlace)
