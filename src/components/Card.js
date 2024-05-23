export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleLikeCard,
    handleUnlikeCard,
    handleDeleteButtonClick,
    currentUserId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked =
      Array.isArray(data.likes) &&
      data.likes.some((like) => like._id === currentUserId);
    this._cardSelector = cardSelector;
    this._data = data;
    this._handleImageClick = handleImageClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._handleLikeCard = handleLikeCard;
    this._handleUnlikeCard = handleUnlikeCard;
    this._currentUserId = currentUserId;
    this._cardElement = this._getTemplate();
  }

  _getTemplate() {
    const template = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._likeButton = template.querySelector(".card__like-button");
    this._deleteButton = template.querySelector(".card__delete-button");
    this._cardImageEl = template.querySelector(".card__image");

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButtonClick(this._id);
    });

    return template;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this._data);
    });
  }

  _handleLikeButton() {
    if (this._isLiked) {
      this._handleUnlikeCard(this._id)
        .then(() => {
          this._isLiked = false;
          this._updateLikeStatus();
        })
        .catch((err) => {
          console.error(`Error unliking card: ${err}`);
        });
    } else {
      this._handleLikeCard(this._id)
        .then(() => {
          this._isLiked = true;
          this._updateLikeStatus();
        })
        .catch((err) => {
          console.error(`Error liking card: ${err}`);
        });
    }
  }

  _updateLikeStatus() {
    if (this._likeButton) {
      if (this._isLiked) {
        this._likeButton.classList.add("card__like-button-active");
      } else {
        this._likeButton.classList.remove("card__like-button-active");
      }
    } else {
      console.error("Like button not found.");
    }
  }

  getView() {
    this._element = this._cardElement;
    this._element.setAttribute("data-id", this._id);
    this._element.querySelector(".card__title").textContent = this._name;
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._updateLikeStatus();
    this._setEventListeners();

    return this._element;
  }

  updateLikeStatus(isLiked) {
    this._isLiked = isLiked;
    this._updateLikeStatus();
  }
}
