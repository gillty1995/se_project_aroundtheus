import Modal from "./Modal.js";

export default class ModalWithConfirmation extends Modal {
  constructor(modalSelector, handleDeleteCardSubmit) {
    super({ modalSelector });
    this._handleDeleteCardSubmit = handleDeleteCardSubmit;
    this._confirmButton = this._modalElement.querySelector(".modal__button");
  }

  setEventListeners() {
    super._setEventListeners();
    this._confirmButton.addEventListener("click", () => {
      const cardId = this._modalElement.dataset.cardId;
      this._handleDeleteCardSubmit(cardId);
      this.close();
    });
  }

  open(cardIdToDelete) {
    this._modalElement.dataset.cardId = cardIdToDelete;
    super.open();
  }
}
