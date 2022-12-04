/*-----ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ-----*/
/*-----Переменные для работы с кнопкой добавить место-----*/
const addButton = document.querySelector('.profile__add-button'),
      popupElementAddButton = document.querySelector('.popup__add'),
      formElementAddButton = popupElementAddButton.querySelector('[name="new-card"]'),
      inputPlaceName = formElementAddButton.querySelector('[name="place-name"]'),
      inputPlaceLink = formElementAddButton.querySelector('[name="place-link"]'),
      buttonClosePopupAddButton = document.querySelector('.popup__close_type_card');
/*-----Переменные для работы с кнопкой редактировать профиль-----*/
const editButton = document.querySelector('.profile__edit-button'),
      popupElementEditButton = document.querySelector('.popup__edit'),
      formElementEditButton = popupElementEditButton.querySelector('[name="user-info"]'),
      inputUserName = popupElementEditButton.querySelector('[name="name"]'),
      inputUserAbout = popupElementEditButton.querySelector('[name="about"]'),
      buttonClosePopupEditButton = popupElementEditButton.querySelector('.popup__close_type_profile'),
      userName = document.querySelector('.profile__name'),
      userAbout = document.querySelector('.profile__about');
/*-----Переменные для инициализации существующих мест и добавления новых-----*/
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
    ],
    listCard = document.querySelector('.places__items'),
    cardTemplate = document.querySelector('#template-card').content.querySelector('.card'),
    cardImageArray = document.querySelectorAll('.card__images')
    cardImageElement = document.querySelector('.popup-image'),
    cardImage = cardImageElement.querySelector('.popup-image__photo'),
    cardCaption = cardImageElement.querySelector('.popup-image__figcaption'),
    closeButtonCardImage = cardImageElement.querySelector('.popup-image__close-button');

/*-----Добавление нового места в начало списка-----*/
const renderCard = function (name, link) {
  listCard.prepend(addCard(name, link));
}
/*-----Открытие попапа изображения карточки-----*/
const openPopupImage = function (cardElement) {
  cardImageElement.classList.add('popup_opened');
  cardImage.src = cardElement.querySelector('.card__image').src;
  cardCaption.textContent = cardElement.querySelector('.card__title').textContent;

  closeButtonCardImage.addEventListener('click', () => {
    closePopup(cardImageElement);
  });
}

/*-----Создание нового места-----*/
const addCard = function (name, link) {
  const cardElement = cardTemplate.cloneNode(true),
        cardTitle = cardElement.querySelector('.card__title'),
        cardLink = cardElement.querySelector('.card__image'),
        cardLike = cardElement.querySelector('.card__favourites'),
        cardDelete = cardElement.querySelector('.card__delete');

  cardTitle.textContent = name;
  cardLink.src = link;
  cardLink.alt = `Фото ${name}`;

  cardLike.addEventListener('click', (e) => {
    e.target.classList.toggle('card__favourities_active');
  });

  cardDelete.addEventListener('click', (e) => {
    e.target.closest('.card').remove();
  });

  return cardElement;
}
/*-----Загрузка списка мест на страницу с "сервера"-----*/
initialCards.forEach((card) => {
  renderCard(card.name, card.link)
});
/*-----Функция открытия попапа-----*/
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');

  if (popupElement.classList.contains('popup__edit-button')) {
    inputUserName.value = userName.textContent;
    inputUserAbout.value = userAbout.textContent;
  }
}
/*-----Функция закрытия попапа-----*/
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}
/*-----Функция отправки формы-----*/
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
/*-----Обработчики событий для добавления места-----*/
addButton.addEventListener('click', () => {
  openPopup(popupElementAddButton);
});

buttonClosePopupAddButton.addEventListener('click', () => {
  closePopup(popupElementAddButton);
});

formElementAddButton.addEventListener('submit', (e) => {
  submitFormAddCard(e, popupElementAddButton);
});
/*-----Обработчики событий для редактирования профиля-----*/
editButton.addEventListener('click', () => {
  openPopup(popupElementEditButton);
});

buttonClosePopupEditButton.addEventListener('click', () => {
  closePopup(popupElementEditButton);
});

formElementEditButton.addEventListener('submit', (e) => {
  submitFormAddCard(e, popupElementEditButton);
});
/*Находим все карточки и ставим на их картинки обработчики событий*/
const allCard = document.querySelectorAll('.card__image');

allCard.forEach((card) => {
  card.addEventListener('click', (e) => {
    openPopupImage(e.target.closest('.card'));
  })
});
