export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  // getInitialCards(handleDeleteCard) {
  //   return fetch(`${this._baseUrl}/cards`, {
  //     headers: this._headers,
  //   })
  //     .then(this._checkResponse)
  //     .then((cards) => {
  //       cards.forEach((card) => {
  //         const cardId = card._id;
  //         handleDeleteCard(cardId);
  //       });
  //       return cards;
  //     });
  // }

  getUserInfoAndCards() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  createCard(cardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(cardData),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  updateUserInfo(userInfo) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(userInfo),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error updating user info: ${res.status}`);
    });
  }
}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "a44aa497-1b5c-4737-a030-aa953cdc7c47",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
