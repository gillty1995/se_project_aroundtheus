export default class UserInfo {
  constructor({
    nameElementSelector,
    aboutElementSelector,
    avatarImageSelector,
  }) {
    this._nameElement = document.querySelector(nameElementSelector);
    this._aboutElement = document.querySelector(aboutElementSelector);
    this._avatarImage = document.querySelector(avatarImageSelector);

    document.addEventListener("avatarUpdate", (event) => {
      const avatarUrl = event.detail;
      this._avatarImage.src = avatarUrl;
    });
  }

  getUserInfo() {
    this._userInfo = {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
    };

    return this._userInfo;
  }

  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
  }
  getUserId() {
    return this._userId;
  }
}
