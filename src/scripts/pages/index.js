import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Seciton.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { FormValidation } from '../components/FormValidation.js';
import {
  elementsContainer,
  elementsTemplate,
  jobInput,
  nameInput,
  placeForm,
  avatarForm,
  popupImageSelector,
  popupPlaceSelector,
  popupProfileSelector,
  popupNewAvatarSelector,
  popupWithPlaceInfoOpenButton,
  popupWithUserInfoOpenButton,
  profileForm,
  userJob,
  userName,
  userAvatar,
  popupConfirmSelector,
  edtiAvatarButton,
} from '../utils/constants.js';
import config from '../utils/validationConfig.js';
import '../../pages/index.css';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';

const profileFormValidation = new FormValidation(config, profileForm);
const placeFormValidation = new FormValidation(config, placeForm);
const avatarFormValidation = new FormValidation(config, avatarForm)

const userInfo = new UserInfo({
  nameSelector: userName,
  jobSelector: userJob,
  avatarSelector: userAvatar,
});

const api = new Api (
  'https://mesto.nomoreparties.co/v1/',
  'bfea2fb3-1d49-4e0a-bbc4-333aa2efb088'
);

userInfo.setUserInfo(api.getUser());

function createCard(place) {
  const card = new Card(
    place,
    api.getUser(),
    elementsTemplate,
    ({ name, link }) => popupWithImage.open({ name, link }),
    (cardId, element) => {
      popupWithConfirm.open(cardId, element);
    },
    (evt, cardId, likeCounter)=>{
      if (!evt.target.classList.contains('element__fav_active')) {
        api.addLike(cardId).then((updatedCard) => {
          likeCounter.textContent = updatedCard.likes.length;
        });
      } else {
        api.removeLike(cardId).then((updatedCard) => {
          likeCounter.textContent = updatedCard.likes.length;
        });
      }
  
      evt.target.classList.toggle('element__fav_active');
    }
  ).generateCard();
  return card;
}

const placeList = new Section(
  {
    items: api.getCards(),
    renderer: (place) => {
      placeList.addItem(createCard(place));
    },
  },
  elementsContainer
);

const popupWithImage = new PopupWithImage(popupImageSelector);

const popupWithUserInfo = new PopupWithForm(
  popupProfileSelector,
  ({ name, about }) => {
    api.editUser({ name, about }).then((user) => userInfo.editUserInfo(user));
    popupWithUserInfo.close();
  }
);

const popupWithPlaceInfo = new PopupWithForm(
  popupPlaceSelector,
  ({ placeName, placeImage }) => {
    api.addCard({
        name: placeName,
        link: placeImage,
      })
      .then((place) => {
        placeList.addItem(createCard(place));
        popupWithPlaceInfo.close();
      });
  }
);

const popupWithNewAvatar = new PopupWithForm(popupNewAvatarSelector,
  (avatarObj) =>{
    api.editUserAvatar(avatarObj)
    .then(() => {
      userInfo.editUserAvatar(avatarObj)
      popupWithNewAvatar.close()
    })
  })

const popupWithConfirm = new PopupWithConfirmation(
  popupConfirmSelector,
  (cardId, element) => {
    api.removeCard(cardId).then(() => {
      element.remove();
      element = null;
      popupWithConfirm.close();
    });
  }
);

placeList.renderItems();

popupWithUserInfoOpenButton.addEventListener('mousedown', () => {
  const { name, about } = userInfo.getUserInfo(api.getUser());
  nameInput.value = name;
  jobInput.value = about;
  profileFormValidation.setButtonState();
  popupWithUserInfo.open();
});

popupWithPlaceInfoOpenButton.addEventListener('click', () =>
  popupWithPlaceInfo.open()
);

edtiAvatarButton.addEventListener('mousedown', ()=> popupWithNewAvatar.open())

popupWithUserInfo.setEventListeners();
popupWithPlaceInfo.setEventListeners();
popupWithImage.setEventListeners();
popupWithNewAvatar.setEventListeners();
// popupWithConfirm.setEventListeners();

//Валидация форм
profileFormValidation.enableValidation();
placeFormValidation.enableValidation();
avatarFormValidation.enableValidation()