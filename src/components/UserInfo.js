export default class UserInfo {
  constructor({
    nameElementSelector,
    aboutElementSelector,
    avatarImageSelector,
  }) {
    this._nameElement = document.querySelector(nameElementSelector);
    this._aboutElement = document.querySelector(aboutElementSelector);
    this._avatarImage = document.querySelector(avatarImageSelector);

    if (!this._avatarImage) {
      console.error("Avatar image element not found.");
    }
  }

  getUserInfo() {
    return {
      name: this._nameElement?.textContent || "",
      about: this._aboutElement?.textContent || "",
    };
  }

  setUserInfo({ name, about, avatar }) {
    if (name) {
      this._nameElement.textContent = name;
    }
    if (about) {
      this._aboutElement.textContent = about;
    }
    if (avatar && this._avatarImage) {
      this._avatarImage.src = avatar;
    }
  }

  getUserId() {
    return this._userId;
  }
}
