const editButton = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const closeButtonPopup = popupElement.querySelector('.popup__close');
const formElement = popupElement.querySelector('.form');

let inputName = popupElement.querySelector('.popup__input_form_name');
let inputAbout = popupElement.querySelector('.popup__input_form_about');

const userName = document.querySelector('.profile__name');
const aboutUser = document.querySelector('.profile__about');

const openPopup = function() {
  popupElement.classList.add('popup_opened');
  inputName.value = userName.textContent; //Получаем данные текущего имени и отображаем в поле для редактирования
  inputAbout.value = aboutUser.textContent; //Получаем данные текущего опиисания и отображаем в поле для редактирования
}

const closePopup = function() {
  popupElement.classList.remove('popup_opened');
}

const formSubmit = function(event) {
  event.preventDefault();
  userName.textContent = inputName.value; //Присваиваем новое имя и сохраняем его
  aboutUser.textContent = inputAbout.value; //Присваиваем новое описание и сохраняем его
  closePopup();
}

editButton.addEventListener('click', openPopup);
closeButtonPopup.addEventListener('click', closePopup)
formElement.addEventListener('submit', formSubmit)
