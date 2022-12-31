const submitButton = document.querySelector('.popup__submit');

const submit = (e) => {
  const profileName = document.querySelector('.profile__name');
  const profileOccupation = document.querySelector('.profile__occupation');

  const inputs = popUp.querySelectorAll('.popup__input');
  e.preventDefault();
  popUp.classList.remove('popup_opened');
  profileName.textContent = inputs[0].value;
  profileOccupation.textContent = inputs[1].value;
};

submitButton.addEventListener('click', submit);
