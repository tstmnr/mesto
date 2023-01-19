import Section from './Section.js'
import { initialCards, formSelectors, cardListSelector, imagePopupSelector, popupElementEditProfileSelector, popupElementAddCardSelector } from './data.js';
import Card from './Сard.js';
import FormValidator from './FormValidator.js';
import PopupWithImage from './PopupWithImage.js'
import PopupWithForm from './PopupWithForm.js'

// Включение валидации
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


const imagePopup = new PopupWithImage(imagePopupSelector);
const addCardPopup = new PopupWithForm(popupElementAddCardSelector, submitFormAddCard);

/*ДОБАВЛЕНИЕ КАРТОЧЕК с сервера*/
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

/*-----Создание места и добавление в начало списка-----*/
const renderCard = function (name, link) {
  cardList.addItem(createCard(name, link));
}

cardList.renderItems(); //вызов добавления карточек с сервера


const buttonElementAddCard = document.querySelector('.profile__add-button');

/*-----Функция отправки формы добавления новых карточек-----*/
function submitFormAddCard(e, data) {
  e.preventDefault();
  renderCard(data["place-name"], data["place-link"]);
}

/*-----Обработчики событий для добавления места-----*/
buttonElementAddCard.addEventListener('click', () => {
  addCardPopup.open();
});

