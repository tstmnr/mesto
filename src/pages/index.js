import './index.css';
import Section from '../scripts/Section.js'
import {
  formSelectors,
  userNameSelector,
  userDescriptionSelector,
  cardListSelector,
  userAvatarSelector,
  imagePopupSelector,
  popupElementEditProfileSelector,
  popupElementAddCardSelector,
  avatarPopupSelector,
  popupConfirmationSelector,
  buttonElementAddCard,
  buttonAvatarEdit,
  formElementAddCard,
  buttonElementEditProfile,
  formElementEditProfile,
  fieldInputUserName,
  fieldInputDescription,
  formElementEditAvatar,
} from '../scripts/constants.js';
import UserInfo from '../scripts/UserInfo.js';
import Card from '../scripts/Сard.js';
import FormValidator from '../scripts/FormValidator.js';
import PopupWithImage from '../scripts/PopupWithImage.js'
import PopupWithForm from '../scripts/PopupWithForm.js'
import api from '../scripts/Api.js'
import PopupWithConfirmation from '../scripts/PopupWithConfirmation';

//создаем будущую разметку для добавления карточек
const cardList = new Section({
  renderer: (data) => {
    cardList.addItem(createCard(data), 'append');
  }
}, cardListSelector);

let currentCard;

function createCard(data) {
  const cardElement = new Card(data, '#template-card', {
    handleCardClick: (data) => {
      imagePopup.open(data);
    },
    handleCardDelete: (card) => {
      popupWithConfirmation.open();
      currentCard = card;
    },
    handleSetLikeCard: (idCard) => {
      api.setLike(idCard)
        .then((data) => {
          cardElement.setLikeCount(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDeleteLikeCard: (idCard) => {
      api.deleteLike(idCard)
        .then((data) => {
          cardElement.setLikeCount(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return cardElement.generateCard();
}

function renderCard(data) {
  cardList.addItem(createCard(data));
}

//выгружаем карточки с сервера на страницу
api.getInitialCards()
  .then((data) => {
    cardList.renderItems(data);
  })
  .catch((err) => {
    console.log(err);
  });

//выгружаем данные пользователя с сервера и отображаем на странице
api.getUserInfo()
  .then((data) => {
    userInfo.setUserInfo(data);
    userInfo.setAvatar(data.avatar);
  })
  .catch((err) => {
    console.log(err);
  });

//функция подтверждения формы добавления карточки
const submitFormAddCard = (e, data) => {
  e.preventDefault();
  addCardPopup.setButtonText('Сохранение...');
  api.postCard(data)
    .then((data) => {
      renderCard(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setTimeout(() => {
        addCardPopup.setButtonText('Сохранить');
      }, 200);
    })
}

//функция подтверждения формы редактирования профиля
const submitFormEditProfile = (e, data) => {
  e.preventDefault();
  editProfilePopup.setButtonText('Сохранение...');
  api.patchUserInfo(data)
  .then((data) => {
    console.log(data);
    userInfo.setUserInfo(data)
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    setTimeout(() => {
      editProfilePopup.setButtonText('Сохранить');
    }, 200);
  })
}

//функция подтверждения формы обновления аватара
const submitFormEditAvatar = (e, avatarUrl) => {
  e.preventDefault();
  avatarEditPopup.setButtonText('Сохранение...');
  api.patchAvatar(avatarUrl)
  .then((user) => {
    userInfo.setAvatar(user['avatar'])
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    setTimeout(() => {
      avatarEditPopup.setButtonText('Сохранить');
    }, 200);
  })
}


const submitDeleteCard = (e) => {
  e.preventDefault();
  api.deleteCard(currentCard)
        .then(() => {
          currentCard.deleteCard();
        })
        .catch((err) => {
          console.log(err);
        });
}

const popupWithConfirmation = new PopupWithConfirmation(popupConfirmationSelector, submitDeleteCard);
popupWithConfirmation.setEventListeners();

const editProfilePopup = new PopupWithForm(popupElementEditProfileSelector, submitFormEditProfile);
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(popupElementAddCardSelector, submitFormAddCard);
addCardPopup.setEventListeners();

const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

const avatarEditPopup = new PopupWithForm(avatarPopupSelector, submitFormEditAvatar);
avatarEditPopup.setEventListeners();

const userInfo = new UserInfo(userNameSelector, userDescriptionSelector, userAvatarSelector);

//слушатель на кнопку добавления карточки
buttonElementAddCard.addEventListener('click', () => {
  formElementAddCard.reset();
  addCardPopup.open();
});

//слушатель на кнопку редактирования профиля
buttonElementEditProfile.addEventListener('click', () => {
  formElementEditProfile.reset();
  const { userName, userDescription } = userInfo.getUserInfo()
  fieldInputUserName.value = userName;
  fieldInputDescription.value = userDescription;
  editProfilePopup.open();
});

//слушатель на кнопку изменения аватара (ПРИ ОБНОВЛЕНИИ АВАТАРА НА СТРАНИЦЕ ОТОБРАЖАЕТСЯ КАРТИНКА ТОЛЬКО ПОСЛЕ ПЕРЕЗАГРУЗКИ)
buttonAvatarEdit.addEventListener('click', () => {
  formElementEditAvatar.reset();
  avatarEditPopup.open();
})

//включение валидации всех форм
const formValidators = {}

const enableValidation = (formSelectors) => {
  const formList = Array.from(document.querySelectorAll(formSelectors.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, formSelectors)
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

enableValidation(formSelectors);
