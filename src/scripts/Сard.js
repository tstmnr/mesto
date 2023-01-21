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
  }

  constructor(name, link, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _removeCard() {
    this._element.remove();
  }

  _toggleLike() {
    this._likeButton.classList.toggle('card__favourities_active');
  }

  _setEventListeners() {
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });

    this._likeButton.addEventListener('click', () => {
      this._toggleLike();
    });

    this._deleteButton.addEventListener('click', () => {
      this._removeCard();
    });
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

    this._setEventListeners();

    return this._element;
  }
}
