import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  static selectors = {
    formElementSelector: '.popup__form',
  }

  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._formElement = this._popupElement.querySelector(PopupWithConfirmation.selectors.formElementSelector);
    this._button = this._formElement.querySelector('.form__button');
  }

  open(card) {
    this._card = card;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', (e) => {
      this._submitForm(e, this._card);
    });
  }
}
