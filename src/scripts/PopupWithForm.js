import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

  static selectors = {
    formElementSelector: '.popup__form',
    inputListSelector: '.form__input'
  }

  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
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

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', (e) => {
      this._submitForm(e, this._getInputValues());
      this._formElement.reset();
      this.close();
    });
  }
}
