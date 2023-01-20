import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

  static selectors = {
    formElementSelector: '[name="new-card"]',
    inputListSelector: '.form__input'
  }

  constructor(popupSelector, submitFormAddCard) {
    super(popupSelector);
    this._submitFormAddCard = submitFormAddCard;
    this._formElement = this._popupElement.querySelector(PopupWithForm.selectors.formElementSelector);
    this._inputList = this._formElement.querySelectorAll(PopupWithForm.selectors.inputListSelector);
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  close() {
    super.close();
    this._formElement.removeEventListener('submit', this.resetForm);
  }

  resetForm = (e) => {
    this._submitFormAddCard(e, this._getInputValues());
    this._formElement.reset();
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', this.resetForm);
  }
}
