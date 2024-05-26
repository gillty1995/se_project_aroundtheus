// IMPORTS
import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import ModalWithImage from "../components/ModalWithImage.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithConfirmation from "../components/ModalWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  formList,
  settings,
  profileEditButton,
  addcreateCardButton,
  nameInput,
  aboutInput,
  avatarImage,
  avatarSaveButton,
  profileSaveButton,
  addCardSaveButton,
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

const avatarEditModal = new ModalWithForm(
  "#avatar-edit-modal",
  handleAvatarImageSubmit
);
avatarEditModal.setEventListeners();

const deleteCardModal = new ModalWithConfirmation(
  "#delete-card-modal",
  handleDeleteCard
);
deleteCardModal.setEventListeners();

// USER INFO

const userInfo = new UserInfo({
  nameElementSelector: ".profile__title",
  aboutElementSelector: ".profile__description",
  avatarImageSelector: ".profile__avatar",
});

document.addEventListener("DOMContentLoaded", () => {
  api
    .getUserInfoAndCards()
    .then(([userData, initialCards]) => {
      const avatarUrl = userData.avatar;
      handleAvatarImageSubmit({ avatar: avatarUrl });
      userInfo.setUserInfo(userData);
      cardsSection.renderItems(initialCards);
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
    handleLikeCard,
    handleUnlikeCard,
    handleDeleteButtonClick,
    userInfo.getUserId()
  );

  return cardElement.getView();
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardsSection.addItem(cardElement);
}

// EVENT LISTENERS

profileEditButton.addEventListener("click", () => {
  formValidators["profile-edit-form"].resetValidation();
  const currentUser = userInfo.getUserInfo();
  nameInput.value = currentUser.name.trim();
  aboutInput.value = currentUser.about.trim();
  profileModal.open();
});

addcreateCardButton.addEventListener("click", () => {
  cardModal.open();
  formValidators["add-button-form"].resetValidation();
});

avatarImage.addEventListener("click", () => {
  avatarEditModal.open();
});

// EVENT HANDLERS

function handleLikeCard(cardId) {
  return api
    .likeCard(cardId)
    .then(() => {
      const card = cardsSection.getItem(cardId);
      if (card) {
        card.updateLikeStatus(true);
      }
    })
    .catch((err) => {
      console.error(`Error liking card: ${err}`);
    });
}

function handleUnlikeCard(cardId) {
  return api
    .unlikeCard(cardId)
    .then(() => {
      const card = cardsSection.getItem(cardId);
      if (card) {
        card.updateLikeStatus(false);
      }
    })
    .catch((err) => {
      console.error(`Error unliking card: ${err}`);
    });
}

function handleDeleteButtonClick(cardId) {
  deleteCardModal.open(cardId);
}

function handleProfileEditSubmit(inputValues) {
  profileSaveButton.textContent = "Saving...";

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
    })
    .finally(() => {
      profileSaveButton.textContent = "Save";
    });
}

function handleAddCardSubmit(inputValues) {
  addCardSaveButton.textContent = "Saving...";
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
    })
    .finally(() => {
      addCardSaveButton.textContent = "Create";
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

function handleAvatarImageSubmit(inputValues) {
  if (avatarSaveButton) {
    avatarSaveButton.textContent = "Saving...";
  }

  const avatarUrl = inputValues.avatar;
  if (avatarUrl) {
    const avatarImageElement = document.querySelector(".profile__avatar");
    if (avatarImageElement) {
      avatarImageElement.src = avatarUrl;
    }

    api
      .updateUserAvatar(avatarUrl)
      .then((updatedData) => {
        console.log("User avatar updated successfully:", updatedData);
        userInfo.setUserInfo({ avatar: avatarUrl });
        avatarEditModal.close();
      })
      .catch((err) => {
        console.error("Error updating user avatar:", err);
      })
      .finally(() => {
        avatarSaveButton.textContent = "Save";
      });
  } else {
    console.error("Avatar URL is required.");
  }
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
