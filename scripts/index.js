import Section from './Section.js'
import {
  initialCards,
  formSelectors,
  userNameSelector,
  userDescriptionSelector,
  cardListSelector,
  imagePopupSelector,
  popupElementEditProfileSelector,
  popupElementAddCardSelector
} from './data.js';
import UserInfo from './UserInfo.js';
import Card from './Сard.js';
import FormValidator from './FormValidator.js';
import PopupWithImage from './PopupWithImage.js'
import PopupWithForm from './PopupWithForm.js'

const userInfo = new UserInfo(userNameSelector, userDescriptionSelector);

/*-----ДОБАВЛЕНИЕ КАРТОЧЕК И ДОБАВЛЕНИЕ ПОПАПА ИЗОБРАЖЕНИЯ КАРТОЧКИ-----*/
const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

const createCard = function (name, link) {
  const cardElement = new Card(name, link, '#template-card', handleCardClick).generateCard();
  return cardElement;
}

function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item.name, item.link));
  }
}, cardListSelector);

const renderCard = function (name, link) {
  cardList.addItem(createCard(name, link));
}

cardList.renderItems(); //вызов добавления карточек с сервера

/*-----ФОРМА ДОБАВЛЕНИЯ КАРТИНКИ-----*/
const buttonElementAddCard = document.querySelector('.profile__add-button');
const formElementAddCard = document.forms['new-card'];

const submitFormAddCard = (e, data) => {
  e.preventDefault();
  renderCard(data["place-name"], data["place-link"]);
}

const addCardPopup = new PopupWithForm(popupElementAddCardSelector, submitFormAddCard);
addCardPopup.setEventListeners();

buttonElementAddCard.addEventListener('click', () => {
  formElementAddCard.reset();
  addCardPopup.open();
});

/*-----ФОРМА РЕДАКТИРОВАНИЯ ПРОФИЛЯ-----*/
const buttonElementEditProfile = document.querySelector('.profile__edit-button');
const formElementEditProfile = document.forms['user-info'];
const fieldInputUserName = formElementEditProfile.querySelector('[name="name"]');
const fieldInputDescription = formElementEditProfile.querySelector('[name="about"]');

const submitFormEditProfile = (e, data) => {
  e.preventDefault();
  userInfo.setUserInfo(data["name"], data["about"])
}

const editProfilePopup = new PopupWithForm(popupElementEditProfileSelector, submitFormEditProfile);
editProfilePopup.setEventListeners();

buttonElementEditProfile.addEventListener('click', () => {
  formElementEditProfile.reset();
  const { userName, userDescription } = userInfo.getUserInfo()
  fieldInputUserName.value = userName;
  fieldInputDescription.value = userDescription;
  editProfilePopup.open();
});

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
