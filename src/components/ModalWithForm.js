import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor(modalSelector, handleFormSubmit) {
    super({ modalSelector });
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputElements = this._modalForm.querySelectorAll(".modal__input");
  }

  _getInputValues() {
    const InputValues = {};
    this._inputElements.forEach((input) => {
      InputValues[input.name] = input.value;
    });

    return InputValues;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._modalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
