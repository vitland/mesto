const closeIcon = document.querySelector('.popup__close-icon')
const popUp = document.querySelector('.popup')

const closePopup = () => {
popUp.classList.remove('popup_opened')
}

closeIcon.addEventListener('click', closePopup)

