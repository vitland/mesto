import { Card } from '../components/Card.js';
import { Section } from '../components/Seciton.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { FormValidation } from '../components/FormValidation.js';
import { elementsContainer, elementsTemplate, jobInput, nameInput, placeForm, popupImageSelector, popupPlaceSelector, popupProfileSelector, popupWithPlaceInfoOpenButton, popupWithUserInfoOpenButton, profileForm, userJob, userName, cards } from '../utils/constants.js';
import config from '../utils/validationConfig.js';
import '../../pages/index.css'

const profileFormValidation = new FormValidation(config, profileForm);
const placeFormValidation = new FormValidation(config, placeForm);

const userInfo = new UserInfo({
  nameSelector: userName,
  jobSelector: userJob,
});

function createCard(place){
   const card = new Card(place, elementsTemplate, ({ name, link }) =>
  popupWithImage.open({ name, link })).generateCard()
   return card
}

const placeList = new Section(
  {
    items: cards,
    renderer: (place) => {
      const cardElement = createCard(place)
      placeList.addItem(cardElement);
    },
  },
  elementsContainer
);

const popupWithImage = new PopupWithImage(popupImageSelector);
const popupWithUserInfo = new PopupWithForm(
  popupProfileSelector,
  ({ name, job }) => {
    userInfo.setUserInfo({ name, job });
    popupWithUserInfo.close();
  }
);

const popupWithPlaceInfo = new PopupWithForm(
  popupPlaceSelector,
  ({ placeName, placeImage }) => {
    const card = createCard({
      name: placeName,
      link: placeImage,
    })
    placeList.addItem(card);
    popupWithPlaceInfo.close();
  }
);

placeList.renderItems();

popupWithUserInfoOpenButton.addEventListener('click', () => {
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  profileFormValidation.setButtonState()
  popupWithUserInfo.open();
});

popupWithPlaceInfoOpenButton.addEventListener('click', () =>
popupWithPlaceInfo.open()
);
popupWithUserInfo.setEventListeners();
popupWithPlaceInfo.setEventListeners();
popupWithImage.setEventListeners();

//Валидация форм
profileFormValidation.enableValidation();
placeFormValidation.enableValidation();