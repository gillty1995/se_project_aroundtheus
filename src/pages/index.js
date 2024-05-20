// IMPORTS
import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import ModalWithImage from "../components/ModalWithImage.js";
import ModalWithForm from "../components/ModalWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  formList,
  initialCards,
  settings,
  profileEditButton,
  addcreateCardButton,
  nameInput,
  jobInput,
} from "../utils/constants.js";

// API

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "a44aa497-1b5c-4737-a030-aa953cdc7c47",
    "Content-Type": "application/json",
  },
});

// SECTION CLASS

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".cards__list"
);

cardsSection.renderItems();

api
  .getInitialCards()
  .then((initialCards) => {
    cardsSection.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err);
  });

// MODALS

const profileModal = new ModalWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profileModal.setEventListeners();

const cardModal = new ModalWithForm("#add-button-modal", handleAddCardSubmit);
cardModal.setEventListeners();

const previewImageModal = new ModalWithImage("#preview-image-modal");
previewImageModal.setEventListeners();

// USER INFO

const userInfo = new UserInfo({
  nameElementSelector: ".profile__title",
  jobElementSelector: ".profile__description",
});

document.addEventListener("DOMContentLoaded", () => {
  api
    .getUserInfo()
    .then((userInfo) => {
      nameInput.value = userInfo.name || "";
      jobInput.value = userInfo.job || "";
    })
    .catch((err) => {
      console.error("Error fetching user info:", err);
    });
});

// api
//   .getUserInfo()
//   .then((userInfo) => {
//     nameInput.value = userInfo.name || "";
//     jobInput.value = userInfo.job || "";
//   })
//   .catch((err) => {
//     console.error("Error fetching user info:", err);
//   });

// FUNCTIONS

function createCard(data) {
  const cardElement = new Card(data, "#card-template", () => {
    previewImageModal.open(data);
  });
  return cardElement.getView();
}

function renderCard(item) {
  const cardElement = createCard(item);
  cardsSection.addItem(cardElement);
}

// EVENT LISTENERS

profileEditButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  nameInput.value = currentUser.name.trim();
  jobInput.value = currentUser.job.trim();

  profileModal.open();
});

addcreateCardButton.addEventListener("click", () => {
  cardModal.open();
  formValidators["add-button-form"].resetValidation();
});

// EVENT HANDLERS

function handleProfileEditSubmit(inputValues) {
  const updatedUserInfo = {
    name: inputValues.name,
    job: inputValues.job,
  };

  userInfo.setUserInfo(updatedUserInfo);
  // userInfo.setUserInfo({
  //   name: inputValues.name,
  //   job: inputValues.job,
  // });

  api
    .updateUserInfo(updatedUserInfo)
    .then((updatedData) => {
      console.log("User information updated successfully:", updatedData);
    })
    .catch((err) => {
      console.error("Error updating user information:", err);
    });

  profileModal.close();
}

function handleAddCardSubmit(inputValues) {
  const name = inputValues.title;
  const link = inputValues.image;
  const data = { name, link };

  cardsSection.addItem(createCard(data));
  cardModal.close();
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
