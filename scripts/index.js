const closeIcon = document.querySelector('.popup__close-icon');
const popUp = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector(
  '.profile__occupation'
);
const submitForm = document.querySelector('.popup__form');
const changeIcon = document.querySelector('.profile__button-change');
let nameInput = popUp.querySelector('.popup__input_type_name');
let jobInput = popUp.querySelector('.popup__input_type_occupation');

function closePopup() {
  popUp.classList.remove('popup_opened');
};

function openPopup() {
  popUp.classList.add('popup_opened');
  nameInput.value = profileName.textContent
  jobInput.value = profileOccupation.textContent;
};

function submit(e) {
  e.preventDefault();
  closePopup()
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;
};

closeIcon.addEventListener('click', closePopup);
changeIcon.addEventListener('click', openPopup);
submitForm.addEventListener('submit', submit);

