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
  settings,
  profileEditButton,
  addcreateCardButton,
  nameInput,
  aboutInput,
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
    items: [],
    renderer: renderCard,
  },
  ".cards__list"
);

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
  aboutElementSelector: ".profile__description",
});

document.addEventListener("DOMContentLoaded", () => {
  api
    .getUserInfoAndCards()
    .then(([userData, initialCards]) => {
      nameInput.value = userData.name || "";
      aboutInput.value = userData.about || "";
      userInfo.setUserInfo(userData);
      initialCards.forEach((cardData) => renderCard(cardData));
    })
    .catch((err) => {
      console.error("Error fetching user info and cards:", err);
    });
});

// FUNCTIONS

function createCard(data) {
  const cardElement = new Card(
    data,
    "#card-template",
    () => {
      previewImageModal.open(data);
    },
    handleDeleteCard
  );
  return cardElement.getView();
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardsSection.addItem(cardElement);
}

// EVENT LISTENERS

profileEditButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  nameInput.value = currentUser.name.trim();
  aboutInput.value = currentUser.about.trim();

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
    about: inputValues.about,
  };

  api
    .updateUserInfo(updatedUserInfo)
    .then((updatedData) => {
      userInfo.setUserInfo(updatedData);
      profileModal.close();
    })
    .catch((err) => {
      console.error("Error updating user information:", err);
    });
}

function handleAddCardSubmit(inputValues) {
  const name = inputValues.title;
  const link = inputValues.image;
  const data = { name, link };

  api
    .createCard(data)
    .then((newCard) => {
      cardsSection.addItem(createCard(newCard));
      cardModal.close();
    })
    .catch((err) => {
      console.error("Error creating card:", err);
    });
}

function handleDeleteCard(cardId) {
  api
    .deleteCard(cardId)
    .then(() => {
      const cardElement = document.querySelector(`[data-id='${cardId}']`);
      if (cardElement) {
        cardElement.remove();
      }
    })
    .catch((err) => {
      console.error("Error deleting card:", err);
    });
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
