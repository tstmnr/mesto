const checkInputValidity = (form, input, config) => {
  const error = form.querySelector(`#${input.id}-error`);

  if (!input.validity.valid) {
    error.textContent = input.validationMessage;
    error.classList.add(config.errorClass);
    input.classList.add(config.inputErrorClass);
  } else {
    error.textContent = '';
    error.classList.remove(config.errorClass);
    input.classList.remove(config.inputErrorClass);
  }
}

const checkValidForm = (inputList, button, config) => {
  const isFormValid = inputList.every(input =>  {
    return input.validity.valid;
  });

  if (isFormValid) {
    button.classList.remove(config.inactiveButtonClass);
    button.removeAttribute('disabled');
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.setAttribute('disabled', true);
  }
}

const enableValidation = (config) => {
  const forms = [...document.querySelectorAll(config.formSelector)];

  forms.forEach(form => {
    const inputList = [...form.querySelectorAll(config.inputSelector)];
    const button = form.querySelector(config.submitButtonSelector);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
    });

    checkValidForm(inputList, button, config);

    inputList.forEach(input => {
      input.addEventListener('input', (e) => {
        checkInputValidity(form, input, config);
        checkValidForm(inputList, button, config);
      })
    })
  })
}

enableValidation ({
    formSelector: '.popup__form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__error_visible'
});


