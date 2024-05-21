export default class Card {
  constructor(data, cardSelector, handleImageClick, handleDeleteClick) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._cardSelector = cardSelector;
    this._data = data;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._cardElement = this._getTemplate();
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButton();
    });
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this._data);
    });
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button-active");
  }

  _handleDeleteButton() {
    this._handleDeleteClick(this._id);
    // this._cardElement.remove();
    // this._cardElement = null;
  }

  getView() {
    this._element = this._cardElement;
    this._cardImageEl = this._element.querySelector(".card__image");
    this._element.setAttribute("data-id", this._id);
    this._element.querySelector(".card__title").textContent = this._name;
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._setEventListeners();
    return this._element;
  }
}
