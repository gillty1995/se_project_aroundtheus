// import Modal from "./Modal.js";

// export default class ModalEditAvatar extends Modal {
//   constructor(modalSelector, handleAvatarImageSubmit) {
//     super({ modalSelector });
//     this._modalForm = this._modalElement.querySelector(".modal__form");
//     this._inputElement = this._modalForm.querySelector("#avatar-image-input");
//     this._errorElement = this._modalForm.querySelector(
//       "#avatar-image-input-error"
//     );
//     this._handleAvatarImageSubmit = handleAvatarImageSubmit;
//   }

//   setEventListeners() {
//     super._setEventListeners();
//     const avatarButton = document.querySelector(".profile__avatar-button");
//     avatarButton.addEventListener("click", () => {
//       console.log("Avatar button clicked");
//       this.open();
//     });

//     this._modalForm.addEventListener("submit", (event) => {
//       event.preventDefault();
//       const avatarUrl = this._inputElement.value.trim();
//       if (avatarUrl) {
//         this._handleAvatarImageSubmit({ avatar: avatarUrl });
//         this.close();
//       } else {
//         console.error("Avatar URL is required.");
//       }
//     });
//   }
// }
