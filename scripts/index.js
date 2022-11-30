const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const popupElement = document.querySelectorAll('.popup');
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
const cardTemplate = document.querySelector('#template-card').content;


function addCard(name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLink = cardElement.querySelector('.card__image');
  const cardLike = cardElement.querySelector('.card__favourites');
  const cardDelete = cardElement.querySelector('.card__delete');
  cardTitle.textContent = name;
  cardLink.src = link;
  listCard.prepend(cardElement);

  cardLike.addEventListener('click', (e) => {
    e.target.classList.toggle('card__favourities_active');
  });

  cardDelete.addEventListener('click', (e) => {
    e.target.closest('.card').remove();
  });
}

initialCards.forEach((card) => {
  addCard(card.name, card.link)
})

function openPopup(e) {
  if (e.target == buttonEdit) {
    popupElement[0].classList.add('popup_opened');
  }
  if (e.target == buttonAdd) {
    popupElement[1].classList.add('popup_opened');
  }
}

buttonAdd.addEventListener('click', openPopup);
buttonEdit.addEventListener('click', openPopup);
