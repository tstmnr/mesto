import '../pages/index.css';
import Section from './Section.js'
import {
  formSelectors,
  userNameSelector,
  userDescriptionSelector,
  cardListSelector,
  userAvatarSelector,
  imagePopupSelector,
  popupElementEditProfileSelector,
  popupElementAddCardSelector,
  avatarPopupSelector
} from './data.js';
import UserInfo from './UserInfo.js';
import Card from './Сard.js';
import FormValidator from './FormValidator.js';
import PopupWithImage from './PopupWithImage.js'
import PopupWithForm from './PopupWithForm.js'
import Api from './Api.js'


const buttonElementAddCard = document.querySelector('.profile__add-button');
const buttonAvatarEdit = document.querySelector('.profile__avatar-edit-button');
const formElementAddCard = document.forms['new-card'];
const buttonElementEditProfile = document.querySelector('.profile__edit-button');
const formElementEditProfile = document.forms['user-info'];
const fieldInputUserName = formElementEditProfile.querySelector('[name="name"]');
const fieldInputDescription = formElementEditProfile.querySelector('[name="about"]');
const formElementEditAvatar = document.forms['avatar'];

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '1031f3d3-8c3f-4c24-875b-e46b585a685d',
    'Content-Type': 'application/json'
  },
});

const cardList = new Section({
  renderer: (data) => {
    cardList.addItem(createCard(data), 'append');
  }
}, cardListSelector);

api.getInitialCards()
  .then((data) => {
    cardList.renderItems(data); //вызов добавления карточек с сервера
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

api.getUserInfo()
  .then((data) => {
    userInfo.setUserInfo(data);
    userInfo.setAvatar(data.avatar);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });


function createCard(data) {
  const cardElement = new Card(data, '#template-card', {
    handleCardClick: (data) => {
      imagePopup.open(data);
    },
    //передать установку/удаление лайка
  });
  return cardElement.generateCard();
}

function renderCard(data) {
  cardList.addItem(createCard(data));
}

const submitFormAddCard = (e, data) => {
  e.preventDefault();
  debugger;
  api.postCard(data)
    .then((data) => {
      renderCard(data);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
}

const submitFormEditProfile = (e, data) => {
  e.preventDefault();
  api.patchUserInfo(data)
  .then((data) => {
    console.log(data);
    userInfo.setUserInfo(data)
  })
  .catch((err) => {
    console.log(err);
  });
}

const submitFormEditAvatar = (e, avatarUrl) => {
  e.preventDefault();
  api.patchAvatar(avatarUrl)
  .then((avatarUrl) => {
    userInfo.setAvatar(avatarUrl['avatar-link'])
  })
  .catch((err) => {
    console.log(err);
  });
}

const editProfilePopup = new PopupWithForm(popupElementEditProfileSelector, submitFormEditProfile);
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(popupElementAddCardSelector, submitFormAddCard);
addCardPopup.setEventListeners();

const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

const avatarEditPopup = new PopupWithForm(avatarPopupSelector, submitFormEditAvatar);
avatarEditPopup.setEventListeners();

const userInfo = new UserInfo(userNameSelector, userDescriptionSelector, userAvatarSelector);

buttonElementAddCard.addEventListener('click', () => {
  formElementAddCard.reset();
  addCardPopup.open();
});

buttonElementEditProfile.addEventListener('click', () => {
  formElementEditProfile.reset();
  const { userName, userDescription } = userInfo.getUserInfo()
  fieldInputUserName.value = userName;
  fieldInputDescription.value = userDescription;
  editProfilePopup.open();
});

buttonAvatarEdit.addEventListener('click', () => {
  formElementEditAvatar.reset();
  avatarEditPopup.open();
})

/*-----ВКЛЮЧЕНИЕ ВАЛИДАЦИИ ФОРМ-----*/
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
