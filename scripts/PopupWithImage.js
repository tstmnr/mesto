import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

  static selectors = {
    cardPhoto: '.popup-image__photo',
    cardCaption: '.popup-image__figcaption'
  }

  constructor(popupSelector) {
    super(popupSelector)
    this._cardPhoto = this._popupElement.querySelector(PopupWithImage.selectors.cardPhoto)
    this._cardCaption = this._popupElement.querySelector(PopupWithImage.selectors.cardCaption)
  }

  open(name, link) {
    this._cardPhoto.src = link;
    this._cardPhoto.alt = `Фотография ${name}`;
    this._cardCaption.textContent = name;
    super.open();
  }
}
