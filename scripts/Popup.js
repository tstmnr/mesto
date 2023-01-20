export default class Popup {
  static selectors = {
    popupOpened: 'popup_opened',
    closeButtonSelector: '.popup__close'
  }

  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(this._popupSelector);
    this._closeButton = this._popupElement.querySelector(Popup.selectors.closeButtonSelector);
  }

  open() {
    this._popupElement.classList.add(Popup.selectors.popupOpened);
  }

  close() {
    this._popupElement.classList.remove(Popup.selectors.popupOpened);
  }

  _handleEscClose = (e) => {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  _closePopupOnOverlay = (e) => {
    if (e.target == this._popupElement) {
      this.close();
    }
  };

  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close()
    });

    this._popupElement.addEventListener('mousedown', this._closePopupOnOverlay);

    document.addEventListener('keydown', this._handleEscClose);
  }
}
