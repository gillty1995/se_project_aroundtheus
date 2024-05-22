export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeCard,
    handleUnlikeCard,
    currentUserId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes || [];
    this._cardSelector = cardSelector;
    this._data = data;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeCard = handleLikeCard;
    this._handleUnlikeCard = handleUnlikeCard;
    this._currentUserId = currentUserId;
    this._cardElement = this._getTemplate();
  }

  // _getTemplate() {
  //   return document
  //     .querySelector(this._cardSelector)
  //     .content.querySelector(".card")
  //     .cloneNode(true);
  //   this._likeButton = template.querySelector(".card__like-button");
  // }

  _getTemplate() {
    const template = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._likeButton = template.querySelector(".card__like-button");
    this._deleteButton = template.querySelector(".card__delete-button");
    this._likeCountElement = template.querySelector(".card__like-count");
    return template;
  }

  _setEventListeners() {
    // this._likeButton = this._cardElement.querySelector(".card__like-button");

    // this._deleteButton = this._cardElement.querySelector(
    //   ".card__delete-button"
    // );
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
    if (this._isLiked()) {
      this._handleUnlikeCard(this._id)
        .then((updatedCardData) => {
          this._likes = updatedCardData.likes;
          this._updateLikeStatus();
        })
        .catch((err) => {
          console.error(`Error unliking card: ${err}`);
        });
    } else {
      this._handleLikeCard(this._id)
        .then((updatedCardData) => {
          this._likes = updatedCardData.likes;
          this._updateLikeStatus();
        })
        .catch((err) => {
          console.error(`Error liking card: ${err}`);
        });
    }
  }

  _isLiked() {
    return this._likes.some((like) => like._id === this._currentUserId);
  }

  _updateLikeStatus() {
    const likeCountElement =
      this._cardElement.querySelector(".card__like-count");
    if (likeCountElement) {
      likeCountElement.textContent = this._likes.length;
    }

    if (this._likeButton) {
      if (this._isLiked()) {
        this._likeButton.classList.add("card__like-button-active");
      } else {
        this._likeButton.classList.remove("card__like-button-active");
      }
    } else {
      console.error("Like button not found.");
    }
  }

  _handleDeleteButton() {
    this._handleDeleteClick(this._id);
  }

  getView() {
    this._element = this._cardElement;
    this._cardImageEl = this._element.querySelector(".card__image");
    this._element.setAttribute("data-id", this._id);
    this._element.querySelector(".card__title").textContent = this._name;
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._updateLikeStatus();
    this._setEventListeners();
    return this._element;
  }
}
