const closeIcon = document.querySelector('.popup__close-icon');
const popUp = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector(
  '.profile__occupation'
);
const submitButton = document.querySelector('.popup__submit');
const changeIcon = document.querySelector('.profile__button-change');
let inputs = popUp.querySelectorAll('.popup__input');

closeIcon.addEventListener('click', closePopup);
changeIcon.addEventListener('click', openPopup);
submitButton.addEventListener('click', submit);

function closePopup() {
  popUp.classList.remove('popup_opened');
};

function openPopup() {
  popUp.classList.add('popup_opened');
  inputs[0].value = profileName.textContent;
  inputs[1].value = profileOccupation.textContent;
};

function submit(e) {
  e.preventDefault();
  popUp.classList.remove('popup_opened');
  profileName.textContent = inputs[0].value;
  profileOccupation.textContent = inputs[1].value;
};

