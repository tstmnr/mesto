import Section from './Section.js'
import { initialCards, formSelectors, cardListSelector, imagePopupSelector, popupElementEditProfileSelector, popupElementAddCardSelector } from './data.js';
import Card from './Сard.js';
import FormValidator from './FormValidator.js';
import PopupWithImage from './PopupWithImage.js'
import PopupWithForm from './PopupWithForm.js'

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

/*-----ДОБАВЛЕНИЕ КАРТОЧЕК И ДОБАВЛЕНИЕ ПОПАПА ИЗОБРАЖЕНИЯ КАРТОЧКИ-----*/
const imagePopup = new PopupWithImage(imagePopupSelector);

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

const submitFormAddCard = (e, data) => {
  e.preventDefault();
  renderCard(data["place-name"], data["place-link"]);
}

const addCardPopup = new PopupWithForm(popupElementAddCardSelector, submitFormAddCard);

buttonElementAddCard.addEventListener('click', () => {
  addCardPopup.setEventListeners();
  addCardPopup.open();
});

