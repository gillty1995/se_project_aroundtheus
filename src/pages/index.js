// IMPORTS
import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import ModalWithImage from "../components/ModalWithImage.js";
import ModalWithForm from "../components/ModalWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  formList,
  initialCards,
  settings,
  profileEditButton,
  addcreateCardButton,
  nameInput,
  jobInput,
} from "../utils/constants.js";

// SECTION CLASS

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
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

// EVENT HANDLERS

function handleProfileEditSubmit(inputValues) {
  userInfo.setUserInfo({
    name: inputValues.name,
    job: inputValues.job,
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

// EVENT LISTENERS

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
