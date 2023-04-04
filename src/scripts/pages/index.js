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
import {config} from '../utils/constants.js'
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
  'https://mesto.nomoreparties.co/v1/',
  'bfea2fb3-1d49-4e0a-bbc4-333aa2efb088'
);

// Заполнение профиля
api.getUser().then((user) => userInfo.setUserInfo(user));

function createCard(place) {
  const card = new Card(
    place,
    api.getUser(),
    elementsTemplate,
    ({ name, link }) => popupWithImage.open({ name, link }),
    // Передача данных о карточке и элементе карточки в попап
    (cardId, element) => {
      popupWithConfirm.open(cardId, element);
    },
    (evt, cardId, likeCounter) => {
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
    popupWithUserInfo.renderLoading(true);
    api
      .editUser({ name, about })
      .then((user) => {
        userInfo.editUserInfo(user);
      })
      .finally(() => {
        popupWithUserInfo.close();
        popupWithUserInfo.renderLoading(false);
      });
  }
);

const popupWithPlaceInfo = new PopupWithForm(
  popupPlaceSelector,
  ({ placeName, placeImage }) => {
    // Сохранение....
    popupWithPlaceInfo.renderLoading(true);

    api.addCard({
        name: placeName,
        link: placeImage,
      })
      .then((place) => {
        placeList.addItem(createCard(place));
      })
      .finally(() => {
        popupWithPlaceInfo.renderLoading(false);
        popupWithPlaceInfo.close();
      });
  }
);

const popupWithNewAvatar = new PopupWithForm(
  popupNewAvatarSelector,
  (avatarObj) => {
    api.editUserAvatar(avatarObj).then(() => {
      popupWithNewAvatar.renderLoading(true)
      userInfo.editUserAvatar(avatarObj);
    })
    .finally(()=> {
      popupWithNewAvatar.renderLoading(false)
      popupWithNewAvatar.close()
    });
  }
);

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
  api.getUser().then((user) => {
    const { name, about } = userInfo.getUserInfo(user);
    nameInput.value = name;
    jobInput.value = about;
    profileFormValidation.setButtonState();
    popupWithUserInfo.open();
  });
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
