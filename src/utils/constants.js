export const formList = document.querySelectorAll(".modal__form");

export const profileEditButton = document.querySelector(
  "#profile__edit-button-js"
);

export const profileEditForm = document.forms["profile-edit-form"];

export const addcreateCardButton = document.querySelector(
  "#profile__add-button-js"
);

export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
  errorList: "modal__error",
};

export const nameInput = document.querySelector("[name='name']");
export const aboutInput = document.querySelector("[name='about']");

export const avatarImage = document.querySelector(".profile__avatar");
