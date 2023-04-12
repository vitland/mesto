interface User {
  name: string;
  about: string;
}

interface Card {
  name: string;
  link: string;
}

export class Api {
  _baseUrl: string;
  _token: string;

  constructor(baseUrl: string, token: string) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  _getResult(res: Response) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._getResult(res));
  }

  editUser({ name, about }: User) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => this._getResult(res));
  }

  editUserAvatar(avatarObj: { avatar: string }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(avatarObj),
    }).then((res) => this._getResult(res));
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._getResult(res));
  }

  addCard({ name, link }: Card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => this._getResult(res));
  }

  removeCard(cardId: string) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._getResult(res));
  }

  addLike(cardId: string) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._getResult(res));
  }

  removeLike(cardId: string) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._getResult(res));
  }
}
