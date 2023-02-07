export default class Card {
  static selectors = {
    cardElement:'.card',
    cardTitle: '.card__title',
    cardLink: '.card__image',
    cardLike: '.card__favourites',
    cardDelete: '.card__delete',
    imagePopup:'.popup-image',
    cardImage: '.popup-image__photo',
    cardCaption: '.popup-image__figcaption',
    buttonCloseImagePopup: '.popup__close_type_image',
    likeCounterElement: '.card__counter',
  }

  constructor(data, templateSelector, { handleCardClick, handleCardDelete, handleSetLikeCard, handleDeleteLikeCard }) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._ownerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleSetLikeCard = handleSetLikeCard;
    this._handleDeleteLikeCard = handleDeleteLikeCard;
    this._id = data._id;
    this._likeCounterArray = data.likes;
  }

  setLikeCount = (data) => {
    this._likeCounterElement.textContent = data.likes.length;
  }

  _removeCard() {
    this._handleCardDelete(this._id);
  }

  _checkOwner() {
    if (this._ownerId == '3f9831328dfbc5481a06889d') {
      this._deleteButton.addEventListener('click', () => {
        this._removeCard();
      });
    } else {
      this._deleteButton.style.display = 'none';
    }
  }

  _checkLike() {
    this._likeCounterArray.forEach((like) => {
      if (like._id === '3f9831328dfbc5481a06889d') {
        this._likeButton.classList.add('card__favourities_active');
      }
    })
  }

  _setEventListeners() {
    this._image.addEventListener('click', () => {
      this._handleCardClick({
        name: this._name,
        link: this._link,
      })
    });

    this._likeButton.addEventListener('click', () => {
      if (this._likeButton.classList.contains('card__favourities_active')) {
        this._likeButton.classList.remove('card__favourities_active');
        this._handleDeleteLikeCard(this._id);
      } else {
        this._likeButton.classList.add('card__favourities_active');
        this._handleSetLikeCard(this._id);
      }
    });
    this._checkLike();
    this._checkOwner();
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector(Card.selectors.cardElement).cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(Card.selectors.cardLink);
    this._likeButton = this._element.querySelector(Card.selectors.cardLike);
    this._deleteButton = this._element.querySelector(Card.selectors.cardDelete);
    this._element.querySelector(Card.selectors.cardTitle).textContent = this._name;
    this._image.src = this._link;
    this._image.alt = `Фото ${this._name}`;
    this._likeCounterElement = this._element.querySelector(Card.selectors.likeCounterElement);
    this._likeCounterElement.textContent = this._likeCounterArray.length;
    this._setEventListeners();

    return this._element;
  }
}
