export const initialCards = [
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

export const formList = document.querySelectorAll(".modal__form");
export const profileEditButton = document.querySelector(
  "#profile__edit-button-js"
);
export const profileEditForm = document.forms["profile-edit-form"];

export const cardListEl = document.querySelector(".cards__list");

export const addcreateCardButton = document.querySelector(
  "#profile__add-button-js"
);

// export const profileEditModal = document.querySelector("#profile-edit-modal");
// export const profileEditClose = document.querySelector("#profile-edit-close");

// export const profileTitle = document.querySelector("#profile__title-js");
// export const profileDescription = document.querySelector(
//   "#profile__description-js"
// );
// export const profileTitleInput = document.querySelector("#profile-title-input");
// export const profileDescriptionInput = document.querySelector(
//   "#profile-description-input"
// );

// export const addcreateCardModal = document.querySelector("#add-button-modal");
// export const addcreateCardClose = document.querySelector("#add-button-close");
// export const createCardTitleInput =
//   document.querySelector("#image-title-input");
// export const createCardUrlInput = document.querySelector("#image-link-input");
// export const addcreateCardEditForm = document.forms["add-button-form"];

// export const previewImageModalEl = document.querySelector(".modal__image");
// export const previewCaptionModalEl = document.querySelector(".modal__caption");
// export const previewImageModalClose = document.querySelector(
//   "#preview-image-modal-close"
// );

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
export const jobInput = document.querySelector("[job='job']");
