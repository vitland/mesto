const changeIcon = document.querySelector('.profile__button-change');

const openPopup = () => {
  const profileName = document.querySelector('.profile__name').textContent;
  const profileOccupation = document.querySelector(
    '.profile__occupation'
  ).textContent;
  const inputs = popUp.querySelectorAll('.popup__input');
  popUp.classList.add('popup_opened');
  inputs[0].value = profileName;
  inputs[1].value = profileOccupation;
};

changeIcon.addEventListener('click', openPopup);
