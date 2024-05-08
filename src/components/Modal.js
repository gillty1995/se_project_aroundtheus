export default class Modal {
  constructor({ modalSelector }) {
    this._modalElement = document.querySelector(modalSelector);
    this._closeButton = this._modalElement.querySelector(".modal__close");
    this._handleEscapeKey = this._handleEscapeKey.bind(this);
  }

  open() {
    this._modalElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscapeKey);
  }

  close() {
    this._modalElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscapeKey);
  }

  _handleEscapeKey(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  _setEventListeners() {
    this._modalElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal_opened")) {
        this.close();
      }
    });
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}
