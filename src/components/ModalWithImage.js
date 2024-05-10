import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super({ modalSelector });
    this._modalImage = this._modalElement.querySelector(".modal__image");
    this._modalImageCaption =
      this._modalElement.querySelector(".modal__caption");
  }

  open(data) {
    this._modalImage.src = data.link;
    this._modalImage.alt = data.name;
    this._modalImageCaption.textContent = data.name;
    super.open();
  }

  setEventListeners() {
    super._setEventListeners();
    this._modalImage.addEventListener("submit", (e) => {
      e.preventDefault();
      // this._handleFormSubmit(this._getInputValues());
    });
  }
}
