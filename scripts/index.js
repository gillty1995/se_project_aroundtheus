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

/* ELEMENTS */

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
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardListEl = document.querySelector(".cards__list");

/* FUNCTIONS */

function closePopup() {
  profileEditModal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  return cardElement;
}

/* EVENT HANDLERS */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup();
}

/* EVENT LISTENERS */

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent.trim();
  profileDescriptionInput.value = profileDescription.textContent.trim();
  profileEditModal.classList.add("modal_opened");
});

profileEditClose.addEventListener("click", closePopup);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

/* LOOPS */

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});
