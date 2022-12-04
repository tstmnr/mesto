/*ПЕРЕМЕННЫЕ*/
/*const editButton = document.querySelector('.profile__edit-button');
const popupElementEditButton = document.querySelector('.popup__edit-button');
*/
const addButton = document.querySelector('.profile__add-button');
const popupElementAddButton = document.querySelector('.popup__add-button');
const formElementAddButton = popupElementAddButton.querySelector('.popup__form_type_card');
const inputPlaceName = formElementAddButton.querySelector('.form__input_type_place-name');
const inputPlaceLink = formElementAddButton.querySelector('.form__input_type_place-link');
const buttonElementCloseAddButton = popupElementAddButton.querySelector('.popup__close_type_card');

const editButton = document.querySelector('.profile__edit-button');
const popupElementEditButton = document.querySelector('.popup__edit-button');
const formElementEditButton = popupElementEditButton.querySelector('.popup__form_type_profile');
const inputUserName = popupElementEditButton.querySelector('.form__input_type_user-name');
const inputUserAbout = popupElementEditButton.querySelector('.form__input_type_user-about');
const buttonElementCloseEditButton = popupElementEditButton.querySelector('.popup__close_type_profile');
const userName = document.querySelector('.profile__name');
const userAbout = document.querySelector('.profile__about');

/*
const userName= document.querySelector('.profile__name');
const userAbout = document.querySelector('.profile__about');
*/
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const listCard = document.querySelector('.places__items');
const cardTemplate = document.querySelector('#template-card').content.querySelector('.card');

const renderCard = function (name, link) {
  listCard.prepend(addCard(name, link));
}

const addCard = function (name, link) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
    cardTitle.textContent = name;
  const cardLink = cardElement.querySelector('.card__image');
    cardLink.src = link;
    cardLink.alt = `Фото ${name}`;
  const cardLike = cardElement.querySelector('.card__favourites');
  const cardDelete = cardElement.querySelector('.card__delete');

  cardLike.addEventListener('click', (e) => {
    e.target.classList.toggle('card__favourities_active');
  });

  cardDelete.addEventListener('click', (e) => {
    e.target.closest('.card').remove();
  });

  return cardElement;
}

initialCards.forEach((card) => {
  renderCard(card.name, card.link)
});

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');

  if (popupElement.classList.contains('popup__edit-button')) {
    inputUserName.value = userName.textContent;
    inputUserAbout.value = userAbout.textContent;
  }
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

function submitFormAddCard(e, popupElement) {
  e.preventDefault();

  if (popupElement.classList.contains('popup__add-button')) {
    renderCard(inputPlaceName.value, inputPlaceLink.value);
    inputPlaceName.value = '';
    inputPlaceLink.value = '';
  }

  if (popupElement.classList.contains('popup__edit-button')) {
    userName.textContent = inputUserName.value;
    userAbout.textContent = inputUserAbout.value;
  }
  closePopup(popupElement);
}

addButton.addEventListener('click', () => {
  openPopup(popupElementAddButton);
});

buttonElementCloseAddButton.addEventListener('click', () => {
  closePopup(popupElementAddButton);
});

formElementAddButton.addEventListener('submit', (e) => {
  submitFormAddCard(e, popupElementAddButton);
});

editButton.addEventListener('click', () => {
  openPopup(popupElementEditButton);
});

buttonElementCloseEditButton.addEventListener('click', () => {
  closePopup(popupElementEditButton);
});

formElementEditButton.addEventListener('submit', (e) => {
  submitFormAddCard(e, popupElementEditButton);
});

