import apiConfig from "./constants.js";

class API {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.headers = config.headers;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  }

  async getCardsList() {
    const response = await fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
    });
    return this._checkResponse(response);
  }

  async getCardLike(id) {
    const response = await fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this.headers,
    });
    return this._checkResponse(response);
  }

  async deleteLike(id) {
    const response = await fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this.headers,
    });
    return this._checkResponse(response);
  }

  async getProfileInfo() {
    const response = await fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    });
    return this._checkResponse(response);
  }

  async editProfileInfo(profileUserInfo) {
    const response = await fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: profileUserInfo.name,
        about: profileUserInfo.about,
      }),
    });
    return this._checkResponse(response);
  }

  async editProfileAvatar(profileUserAva) {
    const response = await fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(profileUserAva),
    });
    return this._checkResponse(response);
  }

  async createCard(inputs) {
    const response = await fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: inputs.name,
        link: inputs.link,
      }),
    });
    return this._checkResponse(response);
  }

  async deleteCard(id) {
    const response = await fetch(`${this.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    });
    return this._checkResponse(response);
  }
}

const api = new API(apiConfig);

export default api;
