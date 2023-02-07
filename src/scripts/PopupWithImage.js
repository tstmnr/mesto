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

  open(data) {
    this._cardPhoto.src = data.link;
    this._cardPhoto.alt = `Фотография ${data.name}`;
    this._cardCaption.textContent = data.name;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
  }
}
