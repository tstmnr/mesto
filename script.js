const editButton = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const closeButtonPopup = popupElement.querySelector('.popup__close');
const saveButton = popupElement.querySelector('.popup__save');

let inputName = popupElement.querySelector('.popup__input_form_name');
let inputAbout = popupElement.querySelector('.popup__input_form_about');

const userName = document.querySelector('.profile__name');
const aboutUser = document.querySelector('.profile__about');

const openPopup = function(event) {
  event.preventDefault();
  popupElement.classList.add('popup__mode_active');
  inputName.value = userName.textContent; //Получаем данные текущего имени и отображаем в поле для редактирования
  inputAbout.value = aboutUser.textContent; //Получаем данные текущего опиисания и отображаем в поле для редактирования
}

const closePopup = function() {
  popupElement.classList.remove('popup__mode_active');
}

const formSubmit = function(event) {
  event.preventDefault();
  userName.textContent = inputName.value; //Присваиваем новое имя и сохраняем его
  aboutUser.textContent = inputAbout.value; //Присваиваем новое описание и сохраняем его
  popupElement.classList.remove('popup__mode_active');
}

editButton.addEventListener('click', openPopup);
closeButtonPopup.addEventListener('click', closePopup)
saveButton.addEventListener('click', formSubmit)
