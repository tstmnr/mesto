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

//создаем API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '1031f3d3-8c3f-4c24-875b-e46b585a685d',
    'Content-Type': 'application/json'
  },
});

//создаем будущую разметку для добавления карточек
const cardList = new Section({
  renderer: (data) => {
    cardList.addItem(createCard(data), 'append');
  }
}, cardListSelector);

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

//функция подтверждения формы добавления карточки
const submitFormAddCard = (e, data) => {
  e.preventDefault();
  debugger;
  api.postCard(data)
    .then((data) => {
      renderCard(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

//функция подтверждения формы редактирования профиля
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

//функция подтверждения формы обновления аватара
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
