//Попапы
const popupPlace = document.querySelector(".popup_type_place");
const popupProfile = document.querySelector(".popup_type_profile");
const popupImage = document.querySelector(".popup_type_image");

const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__occupation");

//Кнопки и форма попап профиля
const popupCloseBtns = document.querySelectorAll(".popup__close-icon");
const changeProfileBtn = document.querySelector(".profile__button-change");
const popupForm = document.querySelectorAll(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_occupation");

// Кнопка и инпуты попап новое место
const addPlaceBtn = document.querySelector(".profile__button-add");
const placeNameInput = document.querySelector(".popup__input_type_place-name");
const placeImageInput = document.querySelector(".popup__input_type_place-image");

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
  return element
}

function closePopup() {
  popupProfile.classList.remove("popup_opened");
  popupPlace.classList.remove("popup_opened");
  popupImage.classList.remove("popup_opened")
}

function openPopup(e) {
  //Открытие попапа с картинкой
  if (e.target.className.includes('element__image')) {
    popupImage.classList.add("popup_opened")
    popupImage.querySelector('.popup__image').src = e.target.src
    popupImage.querySelector('.popup__image-caption').textContent = e.target.parentElement.textContent
  }
  //Открытие попапа с профилем
  if (e.currentTarget.className.includes("button-change")) {
    popupProfile.classList.add("popup_opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
  //Открытие попапа с новым местом
  if (e.currentTarget.className.includes("button-add")) {
    popupPlace.classList.add("popup_opened");
  }
}

function submit(e) {
  e.preventDefault();
  closePopup();
  //Сохранение профиля
  if (e.currentTarget.className.includes("type_profile")) {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
  }
  //Сохранение места
  if (e.currentTarget.className.includes("type_place") && placeNameInput && placeImageInput) {
    //Добавление нового места
    const element = createElement({name: placeNameInput.value, url: placeImageInput.value})
    elementsContainer.prepend(element)
    //Очистка полей
    placeNameInput.value = ''
    placeImageInput.value = ''
  }
}

function removePlace(e) {
  if (e.target.className.includes('bin')) {
    e.target.parentElement.remove()
  }
}

function likePlace(e) {
  if (e.target.className.includes('fav')) {
    e.target.classList.toggle("element__fav_active");
  }
}

populateElements(elementsArr)

//Обработчик на все кнопки закрытия
popupCloseBtns.forEach((btn) => btn.addEventListener("click", closePopup));

changeProfileBtn.addEventListener("click", openPopup);
addPlaceBtn.addEventListener("click", openPopup);

//Обработчик на все кнопки сохранить
popupForm.forEach((btn) => btn.addEventListener("submit", submit));

elementsContainer.addEventListener("click", likePlace);
elementsContainer.addEventListener("click", removePlace);
elementsContainer.addEventListener("click", openPopup);