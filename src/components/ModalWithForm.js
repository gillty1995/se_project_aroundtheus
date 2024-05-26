import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor(modalSelector, handleFormSubmit) {
    super({ modalSelector });
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputElements = this._modalForm.querySelectorAll(".modal__input");
  }

  _getInputValues() {
    const inputValues = {};
    this._inputElements.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setAvatarUrl(avatarUrl) {
    console.log(this._modalForm);
    const avatarInput = this._modalForm.querySelector("input[name='avatar']");
    console.log(avatarInput);
    if (avatarInput) {
      avatarInput.value = avatarUrl;
    }
  }

  setEventListeners() {
    super._setEventListeners();
    this._modalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
