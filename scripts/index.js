import { initialCards, formSelectors } from "./data.js"
import { Card } from './Сard.js';
import { FormValidator } from "./FormValidator.js";

const listCard = document.querySelector('.places__items');

/*-----Создание места и добавление в начало списка-----*/
const renderCard = function (name, link) {
  const newCard = new Card(name, link);
  listCard.prepend(newCard.generateCard());
}

/*-----Загрузка списка мест на страницу с "сервера"-----*/
initialCards.forEach((card) => {
  renderCard(card.name, card.link)
});

/*ДОБАВЛЕНИЕ КАРТОЧЕК*/
/*-----Переменные для добавления новых карточке-----*/
const imagePopup = document.querySelector('.popup-image');

const cardImage = imagePopup.querySelector('.popup-image__photo'),
      cardCaption = imagePopup.querySelector('.popup-image__figcaption'),
      buttonCloseImagePopup = imagePopup.querySelector('.popup__close_type_image');


/*-----Открытие попапа изображения карточки-----*/
export function openPopupImage(cardElement) {
  openPopup(imagePopup);
  cardImage.src = cardElement.querySelector('.card__image').src;
  cardImage.alt = cardElement.querySelector('.card__title').textContent;
  cardCaption.textContent = cardElement.querySelector('.card__title').textContent;
}

buttonCloseImagePopup.addEventListener('click', () => {
  closePopup(imagePopup);
});

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

  popupElement.addEventListener('click', closePopupOnOverlay);

  document.addEventListener('keydown', closeByEscape);
}

/*-----Функция закрытия попапа-----*/
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  popupElement.removeEventListener('click', closePopupOnOverlay);
  document.removeEventListener('keydown', closeByEscape);
}

/*ПРОФИЛЬ*/
/*-----Переменные для работы с кнопкой редактировать профиль-----*/
const buttonElementEditProfile = document.querySelector('.profile__edit-button'),
      popupElementEditProfile = document.querySelector('.popup-edit'),
      formElementEditProfile = popupElementEditProfile.querySelector('[name="user-info"]'),
      fieldInputUserName = formElementEditProfile.querySelector('[name="name"]'),
      fieldInputAbout = formElementEditProfile.querySelector('[name="about"]'),
      buttonCloseProfilePopup = popupElementEditProfile.querySelector('.popup__close_type_profile'),
      userName = document.querySelector('.profile__name'),
      userAbout = document.querySelector('.profile__about');

/*-----Функция открытие попапа редактирования профиля-----*/
function openPopupEditProfile(popupElement) {
  openPopup(popupElement);
  formElementEditProfile.reset();

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
  openPopupEditProfile(popupElementEditProfile);
  const formValidationEditProfile = new FormValidator(formSelectors, formElementEditProfile);
  formValidationEditProfile.enableValidation();
});

buttonCloseProfilePopup.addEventListener('click', () => {
  closePopup(popupElementEditProfile);
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
      fieldInputPlaceLink = formElementAddCard.querySelector('[name="place-link"]'),
      buttonCloseAddCard = popupElementAddCard.querySelector('.popup__close_type_card');

/*-----Функция открытие попапа добавления новых карточек-----*/
function openPopupAddCard(popupElement) {
  openPopup(popupElement);
  const formValidationAddCard = new FormValidator(formSelectors, formElementAddCard);
  formValidationAddCard.enableValidation();
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

buttonCloseAddCard.addEventListener('click', () => {
  closePopup(popupElementAddCard);
});

formElementAddCard.addEventListener('submit', (e) => {
  submitFormAddCard(e, popupElementAddCard);
});
