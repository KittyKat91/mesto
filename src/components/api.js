export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
    this._authorization = options.headers.authorization; //token
  }

  _checkResStatus(res) {
       
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status} ${res.statusText}`);
    }
  }

  getInitialCards() {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-68/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResStatus);
  }

  addNewPlace({ name, link }) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-68/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
   .then(this._checkResStatus);
  }

  removePlace(_id) {
    return fetch(`${this._url}/cards/${_id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResStatus);
  }

  likePlace(_id) {
    return fetch(`${this._url}/cards/${_id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResStatus);
  }

  dislikePlace(_id) {
    return fetch(`${this._url}/cards/${_id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResStatus);
  }

  getUserData() {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-68/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResStatus);
  }

  //patch method is used to edit the inital properties
  setUserData(data) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-68/users/me`, {
      method: "PATCH",
      headers: {
        authorization: "36b7992f-6c59-46cd-806a-d300b92bc647",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: data.name,
        bio: data.bio,
        about: data.about,
      })
    })
      .then(this._checkResStatus);
  }

  //changing initial avatar
  editUserAvatar(avatar) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-68/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        avatar
      }),
    }).then(this._checkResStatus);
  }
}