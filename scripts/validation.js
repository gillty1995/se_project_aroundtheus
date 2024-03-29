// VALIDATION

const showInputError = (
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
};

const checkInputValidity = (formElement, inputElement, options) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
};

const hasInvalidInput = (inputList) => {
  return !inputList.every((inputElement) => inputElement.validity.valid);
};

// BUTTONS

const disableButton = (submitButton, inactiveButtonClass, disabled) => {
  if (disabled) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
    return;
  }
};

const enableButton = (submitButton, inactiveButtonClass, enabled) => {
  if (enabled) {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
    return;
  }
};

const toggleButtonState = (
  inputElements,
  submitButton,
  { inactiveButtonClass }
) => {
  const invalidInput = hasInvalidInput(inputElements);
  disableButton(submitButton, inactiveButtonClass, invalidInput);
  enableButton(submitButton, inactiveButtonClass, !invalidInput);
};

// EVENT LISTENERS

const setEventListeners = (formElement, options) => {
  const { inputSelector } = options;
  const inputElements = [
    ...formElement.querySelectorAll(options.inputSelector),
  ];
  const submitButton = formElement.querySelector(options.submitButtonSelector);
  toggleButtonState(inputElements, submitButton, options);
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (e) => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputElements, submitButton, options);
    });
  });
};

const enableValidation = (options) => {
  const formElements = [...document.querySelectorAll(options.formSelector)];
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formElement, options);
  });
};

// OPTIONS

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
