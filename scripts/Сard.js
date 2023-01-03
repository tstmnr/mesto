import { openPopupImage } from "./index.js";

export class Card {
  static selectors = {
    cardTemplate: '#template-card',
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

  constructor(name, link) {
    this._name = name;
    this._link = link;

  }

  _removeCard() {
    this._element.remove();
  }

  _addLike() {
    this._likeButton.classList.toggle('card__favourities_active');
  }

  _openPopupImage() {
    openPopupImage(this._element);
  }

  _setEventListeners() {
    this._image.addEventListener('click', (e) => {
      this._openPopupImage();
    })

    this._likeButton.addEventListener('click', (e) => {
      this._addLike();
    });

    this._deleteButton.addEventListener('click', (e) => {
      this._removeCard();
    });
  }

  _getTemplate() {
    return document.querySelector(Card.selectors.cardTemplate).content.querySelector(Card.selectors.cardElement).cloneNode(true);
  }

  _generateCard() {
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
