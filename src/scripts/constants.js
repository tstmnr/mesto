export const formSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
}

export const userNameSelector = '.profile__name'
export const userDescriptionSelector = '.profile__about'
export const userAvatarSelector = '.profile__avatar'
export const cardListSelector = '.places__items';
export const imagePopupSelector = '.popup-image';
export const popupElementAddCardSelector = '.popup-add';
export const popupElementEditProfileSelector = '.popup-edit';
export const avatarPopupSelector = '.popup-update'
export const popupConfirmationSelector = '.popup-delete'
export const buttonElementAddCard = document.querySelector('.profile__add-button');
export const buttonAvatarEdit = document.querySelector('.profile__avatar-edit-button');
export const formElementAddCard = document.forms['new-card'];
export const buttonElementEditProfile = document.querySelector('.profile__edit-button');
export const formElementEditProfile = document.forms['user-info'];
export const fieldInputUserName = formElementEditProfile.querySelector('[name="name"]');
export const fieldInputDescription = formElementEditProfile.querySelector('[name="about"]');
export const formElementEditAvatar = document.forms['avatar'];

