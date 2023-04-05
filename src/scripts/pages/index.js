import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Seciton.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { FormValidation } from '../components/FormValidation.js';
import {
  elementsContainer,
  elementsTemplate,
  jobInput,
  nameInput,
  placeForm,
  avatarForm,
  popupWithImageSelector,
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
import { config } from '../utils/constants.js';
import '../../pages/index.css';

const profileFormValidation = new FormValidation(config, profileForm);
const placeFormValidation = new FormValidation(config, placeForm);
const avatarFormValidation = new FormValidation(config, avatarForm);

const userInfo = new UserInfo({
  nameSelector: userName,
  jobSelector: userJob,
  avatarSelector: userAvatar,
});

const api = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-63',
  'bfea2fb3-1d49-4e0a-bbc4-333aa2efb088'
);

const user = api.getUser().catch((err) => console.log(err));
const cards = api.getCards().catch((err) => console.log(err));

// Заполнение профиля
user.then((user) => userInfo.setUserInfo(user))

function createCard(place) {
  const card = new Card(
    place,
    user,
    elementsTemplate,
    ({ name, link }) => popupWithImage.open({ name, link }),
    // Передача данных о карточке и элементе карточки в попап
    (cardId, element) => {
      popupWithConfirm.open(cardId, element);
    },
    (evt, cardId, likeCounter) => {
      if (!evt.target.classList.contains('element__fav_active')) {
        api.addLike(cardId)
        .then((updatedCard) => {likeCounter.textContent = updatedCard.likes.length})
        .catch((err) => console.log(err));
      } else {
        api.removeLike(cardId)
        .then((updatedCard) => {likeCounter.textContent = updatedCard.likes.length})
        .catch((err) => console.log(err));
      }

      evt.target.classList.toggle('element__fav_active');
    }
  ).generateCard();
  return card;
}

const placeList = new Section(
  {
    items: cards,
    renderer: (container, place) => {
      container.append(createCard(place))
    },
  },
  elementsContainer
);

const popupWithImage = new PopupWithImage(popupWithImageSelector);

const popupWithUserInfo = new PopupWithForm(
  popupProfileSelector,
  ({ name, about }) => {
    popupWithUserInfo.renderLoading(true);
    api
      .editUser({ name, about })
      .then((user) => {
        userInfo.setUserInfo(user);
        popupWithUserInfo.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupWithUserInfo.renderLoading(false);
      });
  }
);

const popupWithPlaceInfo = new PopupWithForm(
  popupPlaceSelector,
  ({ placeName, placeImage }) => {
    // Сохранение....
    popupWithPlaceInfo.renderLoading(true);
    api
      .addCard({
        name: placeName,
        link: placeImage,
      })
      .then((place) => {
        placeList.addItem(createCard(place));
        popupWithPlaceInfo.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupWithPlaceInfo.renderLoading(false);
      });
  }
);

const popupWithNewAvatar = new PopupWithForm(
  popupNewAvatarSelector,
  (avatarObj) => {
    api
      .editUserAvatar(avatarObj)
      .then(() => {
        popupWithNewAvatar.renderLoading(true);
        userInfo.setUserInfo(avatarObj);
        popupWithNewAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupWithNewAvatar.renderLoading(false);
      });
  }
);

const popupWithConfirm = new PopupWithConfirmation(
  popupConfirmSelector,
  (cardId, element) => {
    api.removeCard(cardId)
    .then(() => {
      element.remove();
      element = null;
      popupWithConfirm.close();
    })
    .catch((err) => console.log(err));
  }
);

// Рендер карточек, после получения всей информации с сервера
Promise.all([user, cards]).then(()=> placeList.renderItems())

popupWithUserInfoOpenButton.addEventListener('mousedown', () => {
  user.then((user) => {
    const { name, about } = userInfo.getUserInfo(user);
    nameInput.value = name;
    jobInput.value = about;
    profileFormValidation.setButtonState();
    popupWithUserInfo.open();
  })
  .catch((err) => console.log(err));
});

popupWithPlaceInfoOpenButton.addEventListener('click', () =>
  popupWithPlaceInfo.open()
);

edtiAvatarButton.addEventListener('mousedown', () => popupWithNewAvatar.open());

popupWithUserInfo.setEventListeners();
popupWithPlaceInfo.setEventListeners();
popupWithImage.setEventListeners();
popupWithNewAvatar.setEventListeners();

//Валидация форм
profileFormValidation.enableValidation();
placeFormValidation.enableValidation();
avatarFormValidation.enableValidation();
