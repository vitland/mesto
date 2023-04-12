import { Api } from '../components/Api';
import { Card } from '../components/Card.js';
import { Section } from '../components/Seciton.js';
import { UserInfo } from '../components/UserInfo';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation';
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

Promise.all([api.getUser(), api.getCards()])
  .then(([user, cards]) => {
    // Заполнение профиля
    userInfo.setUserInfo(user);
    //Рендер карточек
    placeList.renderItems(cards);
  })
  .catch((err) => console.error(err));

const placeList = new Section(
  {
    renderer: (container, place) => {
      container.append(createCard(place));
    },
  },
  elementsContainer
);



function createCard(place) {
  const card = new Card(
    place,
    userInfo.getUserInfo(),
    elementsTemplate,
    ({ name, link }) => popupWithImage.open({ name, link }),
    // Передача данных о карточке и элементе карточки в попап
    (cardId, element) => {
      popupWithConfirm.open(cardId, element);
    },
    (evt, cardId, likeCounter) => {
      if (!evt.target.classList.contains('element__fav_active')) {
        api
          .addLike(cardId)
          .then((updatedCard) => {
            likeCounter.textContent = updatedCard.likes.length;
          })
          .catch((err) => console.log(err));
      } else {
        api
          .removeLike(cardId)
          .then((updatedCard) => {
            likeCounter.textContent = updatedCard.likes.length;
          })
          .catch((err) => console.log(err));
      }
      evt.target.classList.toggle('element__fav_active');
    }
  ).generateCard();
  return card;
}

popupWithUserInfoOpenButton.addEventListener('mousedown', () => {
  const { name, about } = userInfo.getUserInfo();
  document.querySelector('.form__input_type_name');
  nameInput.value = name;
  jobInput.value = about;
  profileFormValidation.setButtonState();
  popupWithUserInfo.open();
});

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

const popupWithNewAvatar = new PopupWithForm(
  popupNewAvatarSelector,
  (avatarObj) => {
    popupWithNewAvatar.renderLoading(true);
    api
      .editUserAvatar(avatarObj)
      .then(() => {
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
    api
      .removeCard(cardId)
      .then(() => {
        element.remove();
        element = null;
        popupWithConfirm.close();
      })
      .catch((err) => console.log(err));
  }
);
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
