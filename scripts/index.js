import Section from './Section.js'
import { initialCards, formSelectors, cardListSelector } from "./data.js"
import { Card } from './Сard.js';
import { FormValidator } from "./FormValidator.js";

/*ДОБАВЛЕНИЕ КАРТОЧЕК с сервера*/
const createCard = function (name, link) {
  const cardElement = new Card(name, link, '#template-card', handleCardClick).generateCard();
  return cardElement;
}

function handleCardClick(name, link) {
  cardImage.src = link;
  cardImage.alt = name;
  cardCaption.textContent = name;
  openPopup(imagePopup);
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







const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});


/*-----Переменные для добавления новых карточке-----*/
const imagePopup = document.querySelector('.popup-image');

const cardImage = imagePopup.querySelector('.popup-image__photo'),
      cardCaption = imagePopup.querySelector('.popup-image__figcaption');




function closePopupOnOverlay(e) {
  if (e.target == e.currentTarget) {
    closePopup(e.currentTarget);
  }
};

function closeByEscape(e) {
  if (e.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

/*-----Функция открытия попапа-----*/
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  popupElement.addEventListener('mousedown', closePopupOnOverlay);
  document.addEventListener('keydown', closeByEscape);
}

/*-----Функция закрытия попапа-----*/
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  popupElement.removeEventListener('mousedown', closePopupOnOverlay);
  document.removeEventListener('keydown', closeByEscape);
}

/*ПРОФИЛЬ*/
/*-----Переменные для работы с кнопкой редактировать профиль-----*/
const buttonElementEditProfile = document.querySelector('.profile__edit-button'),
      popupElementEditProfile = document.querySelector('.popup-edit'),
      formElementEditProfile = popupElementEditProfile.querySelector('[name="user-info"]'),
      fieldInputUserName = formElementEditProfile.querySelector('[name="name"]'),
      fieldInputAbout = formElementEditProfile.querySelector('[name="about"]'),
      userName = document.querySelector('.profile__name'),
      userAbout = document.querySelector('.profile__about');

/*-----Функция открытие попапа редактирования профиля-----*/
function openPopupEditProfile(popupElement) {
  openPopup(popupElement);
  fieldInputUserName.value = userName.textContent;
  fieldInputAbout.value = userAbout.textContent;
}

/*-----Функция отправки формы редактирования профиля-----*/
function submitFormEditProfile(e, popupElement) {
  e.preventDefault();
  userName.textContent = fieldInputUserName.value;
  userAbout.textContent = fieldInputAbout.value;
  closePopup(popupElement);
}

/*-----Обработчики событий для редактирования профиля-----*/
buttonElementEditProfile.addEventListener('click', () => {
  formElementEditProfile.reset();
  openPopupEditProfile(popupElementEditProfile);
});

formElementEditProfile.addEventListener('submit', (e) => {
  submitFormEditProfile(e, popupElementEditProfile);
});

/*СОЗДАНИЕ КАРТОЧЕК*/
/*-----Переменные для работы с кнопкой добавить место-----*/
const buttonElementAddCard = document.querySelector('.profile__add-button'),
      popupElementAddCard = document.querySelector('.popup-add'),
      formElementAddCard = popupElementAddCard.querySelector('[name="new-card"]'),
      fieldInputPlaceName = formElementAddCard.querySelector('[name="place-name"]'),
      fieldInputPlaceLink = formElementAddCard.querySelector('[name="place-link"]');

/*-----Функция открытие попапа добавления новых карточек-----*/
function openPopupAddCard(popupElement) {
  openPopup(popupElement);
}

/*-----Функция отправки формы добавления новых карточек-----*/
function submitFormAddCard(e, popupElement) {
  e.preventDefault();
  renderCard(fieldInputPlaceName.value, fieldInputPlaceLink.value);

  closePopup(popupElement);
}

/*-----Обработчики событий для добавления места-----*/
buttonElementAddCard.addEventListener('click', () => {
  formElementAddCard.reset();
  openPopupAddCard(popupElementAddCard);
});

formElementAddCard.addEventListener('submit', (e) => {
  submitFormAddCard(e, popupElementAddCard);
});

const formValidators = {}
// Включение валидации
const enableValidation = (formSelectors) => {
  const formList = Array.from(document.querySelectorAll(formSelectors.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, formSelectors)
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name');

   // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

enableValidation(formSelectors);
