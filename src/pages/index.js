// IMPORTS
import "./index.css";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import ModalWithImage from "../components/ModalWithImage.js";
import ModalWithForm from "../components/ModalWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  cardListEl,
  formList,
  initialCards,
  settings,
  profileEditButton,
  addcreateCardButton,
  profileTitle,
  profileDescription,
  nameInput,
  jobInput,
} from "../utils/constants.js";

// INITIAL LOADOUT

// SECTION CLASS

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      renderCard(cardElement);
    },
  },
  ".cards__list"
);

cardsSection.renderItems();

// MODALS

const profileModal = new ModalWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profileModal.setEventListeners();

const cardModal = new ModalWithForm("#add-button-modal", handleAddCardSubmit);
cardModal.setEventListeners();

const previewImageModal = new ModalWithImage("#preview-image-modal");
previewImageModal._setEventListeners();

// USER INFO

const userInfo = new UserInfo({
  nameElementSelector: "#profile__title-js",
  jobElementSelector: "#profile__description-js",
});

// FUNCTIONS

// function closePopup(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keydown", handleEscapeKey);
// }

// function openPopup(modal) {
//   modal.classList.add("modal_opened");
//   document.addEventListener("keydown", handleEscapeKey);
// }

// function handleEscapeKey(e) {
//   if (e.key === "Escape") {
//     const openedModal = document.querySelector(".modal_opened");
//     if (openedModal) {
//       closePopup(openedModal);
//     }
//   }
// }

function createCard(data) {
  const cardElement = new Card(data, "#card-template", () => {
    previewImageModal.open(data);
  });
  return cardElement.getView();
}

function renderCard(cardElement) {
  cardListEl.prepend(cardElement);
}

// function handleImageClick(data) {
//   previewImageModalEl.src = data.link;
//   previewImageModalEl.alt = data.name;
//   previewCaptionModalEl.textContent = data.name;

//   openPopup(previewImageModal);
// }

initialCards.forEach((data) => {
  const cardElement = createCard(data);
  renderCard(cardElement);
});

// EVENT HANDLERS

// function handleProfileEditSubmit(e) {
//   e.preventDefault();
//   profileTitle.textContent = profileTitleInput.value;
//   profileDescription.textContent = profileDescriptionInput.value;
//   closePopup(profileEditModal);
// }

function handleProfileEditSubmit(inputValues) {
  inputValues.preventDefault();
  userInfo.setUserInfo({
    nameInput: inputValues.name,
    jobInput: inputValues.job,
  });

  profileModal.close();
}

// function handleAddCardSubmit(e) {
//   e.preventDefault();
//   const card = createCard({
//     name: createCardTitleInput.value,
//     link: createCardUrlInput.value,
//   });
//   cardListEl.prepend(card);
//   closePopup(addcreateCardModal);
//   e.target.reset();
// }

function handleAddCardSubmit(inputValues) {
  const name = inputValues.title;
  const link = inputValues.url;
  const data = { name, link };

  cardsSection.addItem(createCard(data));
  cardModal.close();
  cardModal._modalForm.reset();
}

// VALIDATION

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

// EVENT LISTENERS

// profileEditButton.addEventListener("click", () => {
//   formValidators["profile-edit-form"].resetValidation();
//   profileTitleInput.value = profileTitle.textContent.trim();
//   profileDescriptionInput.value = profileDescription.textContent.trim();
//   openPopup(profileEditModal);
// });

profileEditButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  nameInput.value = currentUser.name;
  jobInput.value = currentUser.job;
  profileModal.open();
  formValidators["profile-edit-form"].resetValidation();
});

addcreateCardButton.addEventListener("click", () => {
  cardModal.open();
  formValidators["add-button-form"].resetValidation();
});

// profileEditClose.addEventListener("click", () => closePopup(profileEditModal));
// profileEditForm.addEventListener("submit", handleProfileEditSubmit);
// addcreateCardEditForm.addEventListener("submit", handleAddCardSubmit);
// addcreateCardButton.addEventListener("click", () => {
//   openPopup(addcreateCardModal);
//   formValidators["add-button-form"].resetValidation();
// });
// addcreateCardClose.addEventListener("click", () =>
//   closePopup(addcreateCardModal)
// );
// previewImageModalClose.addEventListener("click", () =>
//   closePopup(previewImageModal)
// );

const modals = document.querySelectorAll(".modal");

modals.forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal_opened")) {
      modal.close();
    }
  });
});
