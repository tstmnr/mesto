/*
ДОБАВЛЕНИЕ КАРТОЧЕК
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
})

/*
ПОПАП


const buttonAdd = document.querySelector('.profile__add-button');
const buttonClose = document.querySelectorAll('.popup__close');
const popupElementAddCard = document.querySelector('.popup__add-button');


const openPopup = function (e) {
  e.preventDefault();
  popupElementAddCard.classList.add('popup_opened');
  console.log(popupElementAddCard.classList);
  if (e.target == buttonAdd) {
    const formElement = popupElementAddCard.querySelector('.form');
    const formInputPlaceName = formElement.querySelector('[name="place"]');
    const formInputPlaceLink = formElement.querySelector('[name="link"]');

    formElement.addEventListener('submit', (e) => {
      e.preventDefault();
      renderCard(formInputPlaceName.value, formInputPlaceLink.value);
      closePopup();
    });
  }

};*/


const editButton = document.querySelector('.profile__edit-button');
const popupElementEditButton = document.querySelector('.popup__edit-button');

const addButton = document.querySelector('.profile__add-button');
const popupElementAddButton = document.querySelector('.popup__add-button');

const dataName= document.querySelector('.profile__name');
const dataAbout = document.querySelector('.profile__about');


const openPopup = function(popupElement) {
  popupElement.classList.add('popup_opened');
  const closeButtonPopup = popupElement.querySelector('.popup__close');
  const formElement = popupElement.querySelector('.form');
  const inputFieldOne = formElement.querySelector('[name="name"]');
  const inputFieldTwo = formElement.querySelector('[name="info"]');

  if (popupElement.classList.contains('popup__edit-button')) {
    inputFieldOne.value = dataName.textContent;
    inputFieldTwo.value = dataAbout.textContent;
  }

  formElement.addEventListener('submit', (e) => {
    formSubmit(popupElement, inputFieldOne.value, inputFieldTwo.value, e);
  });

  closeButtonPopup.addEventListener('click', () => {
    closePopup(popupElement);
  });
}

const closePopup = function(popupElement) {
  popupElement.classList.remove('popup_opened');
}

const formSubmit = function(popupElement, inputFieldOne, inputFieldTwo, e) {
  e.preventDefault();

  if (popupElement.classList.contains('popup__edit-button')) {
    dataName.textContent = inputFieldOne;
    dataAbout.textContent = inputFieldTwo;
  }

  if (popupElement.classList.contains('popup__add-button')) {
    renderCard(inputFieldOne, inputFieldTwo);
    inputFieldOne = '';
    inputFieldTwo = '';
  }
  closePopup(popupElement);
}

editButton.addEventListener('click', () => {
  openPopup(popupElementEditButton);
});

addButton.addEventListener('click', () => {
  openPopup(popupElementAddButton);
});



