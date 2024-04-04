// IMPORTS

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

// INITIAL LOADOUT

const initialCards = [
  {
    name: "Kenai Fjords",
    link: "https://images.unsplash.com/photo-1547974996-050bf23b6196?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Zion National Park",
    link: "https://images.unsplash.com/photo-1491590324047-588cc8277f59?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Mt Rainier National Park",
    link: "https://images.unsplash.com/photo-1594324587519-20940384fd9c?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Bryce Canyon",
    link: "https://images.unsplash.com/photo-1526008625783-ddfc11a3a962?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Glacier National Park",
    link: "https://images.unsplash.com/photo-1610833783667-f00a448a97f0?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Delicate Arch",
    link: "https://images.unsplash.com/photo-1535470614242-bf41943a99fd?q=80&w=2968&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

// ELEMENTS

const formList = document.querySelectorAll(".modal__form");
const profileEditButton = document.querySelector("#profile__edit-button-js");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditClose = document.querySelector("#profile-edit-close");
const profileTitle = document.querySelector("#profile__title-js");
const profileDescription = document.querySelector("#profile__description-js");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");

const cardListEl = document.querySelector(".cards__list");

const addNewCardButton = document.querySelector("#profile__add-button-js");
const addNewCardModal = document.querySelector("#add-button-modal");
const addNewCardClose = document.querySelector("#add-button-close");
const newCardTitleInput = document.querySelector("#image-title-input");
const newCardUrlInput = document.querySelector("#image-link-input");
const addNewCardEditForm = addNewCardModal.querySelector(".modal__form");

const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageModalEl = previewImageModal.querySelector(".modal__image");
const previewCaptionModalEl =
  previewImageModal.querySelector(".modal__caption");
const previewImageModalClose = document.querySelector(
  "#preview-image-modal-close"
);
const submitButton = addNewCardModal.querySelector(".modal__button");

// FUNCTIONS

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", escKey);
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", escKey);
}

function escKey(e) {
  if (e.key === "Escape") {
    const esc = document.querySelector(".modal_opened");
    if (esc) {
      closePopup(esc);
    }
  }
}

function newCard(data) {
  const cardElement = new Card(data, "#card-template", handleImageClick);
  return cardElement.getView();
}

function renderCard(cardElement) {
  cardListEl.prepend(cardElement);
}

function handleImageClick(data) {
  previewImageModalEl.src = data.link;
  previewImageModalEl.alt = data.name;
  previewCaptionModalEl.textContent = data.name;

  openPopup(previewImageModal);
}

initialCards.forEach((data) => {
  const cardElement = newCard(data);
  renderCard(cardElement);
});

// EVENT HANDLERS

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const card = newCard({
    name: newCardTitleInput.value,
    link: newCardUrlInput.value,
  });
  cardListEl.prepend(card);
  closePopup(addNewCardModal);
  submitButton.disabled = true;
  submitButton.classList.add("modal__button_disabled");
  e.target.reset();
}

// EVENT LISTENERS

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent.trim();
  profileDescriptionInput.value = profileDescription.textContent.trim();
  formValidators["profile-edit-form"].resetValidation();
  openPopup(profileEditModal);
});

profileEditClose.addEventListener("click", () => closePopup(profileEditModal));
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addNewCardEditForm.addEventListener("submit", handleAddCardSubmit);
addNewCardButton.addEventListener("click", () => {
  openPopup(addNewCardModal);
  formValidators["add-card-form"].resetValidation();
});
addNewCardClose.addEventListener("click", () => closePopup(addNewCardModal));
previewImageModalClose.addEventListener("click", () =>
  closePopup(previewImageModal)
);

const modals = document.querySelectorAll(".modal");

modals.forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal_opened")) {
      closePopup(modal);
    }
  });
});

// VALIDATION

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
  errorList: "modal__error",
};

const formValidators = {};
const enableValidation = (formList) => {
  formList.forEach((form) => {
    const formValidator = new FormValidator(settings, form);
    formValidator.enableValidation();
    formValidators[form.getAttribute("id")] = formValidator;
    return formValidators;
  });
};

enableValidation(formList);
