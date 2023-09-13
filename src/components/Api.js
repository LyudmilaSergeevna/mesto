class Api {
  constructor({ url, headers}) {
    this._url = url,
    this._headers = headers 
  }

getUserInfo() {
  return fetch(`${this._url}/users/me`, {
    headers: this._headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json()
    }
    throw new Error('Ошибка запроса получения информации о пользователе')
  })
  .catch((err) => {
    console.log(err)
  })
}

getCards() {
  return fetch(`${this._url}/cards`, {
    headers: this._headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json()
    }
    throw new Error('Ошибка запроса получения карточек')
  })
  .catch((err) => {
    console.log(err)
  })
}

patchUserInfo({name, info}) {
  return fetch(`${this._url}/users/me`, {
    method: "PATCH",
    headers: this._headers,
    body: JSON.stringify({
      name: name,
      about: info
    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json()
    }
    throw new Error('Ошибка запроса на изменение данных профиля')
  })
  .catch((err) => {
    console.log(err)
  })
}

postNewCard({name, link}) {
  return fetch(`${this._url}/cards`, {
    method: "POST",
    headers: this._headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json()
    }
    throw new Error('Ошибка запроса на создание новой карточки')
  })
  .catch((err) => {
    console.log(err)
  })
}

deleteCard(id) {
  return fetch(`${this._url}/cards/${id}`, {
    method: "DELETE",
    headers: this._headers,
  })
  .then((res) => {
    if (res.ok) {
      return res.json()
    }
    throw new Error('Ошибка запроса на удаление карточки')
  })
  .catch((err) => {
    console.log(err)
  })
}

likeCard(cardId) {
  return fetch(`${this._url}/cards/${cardId}/likes`, {
    method: "DELETE",
    headers: this._headers,
  })
  .then((res) => {
    if (res.ok) {
      return res.json()
    }
    throw new Error('Ошибка запроса на удаление карточки')
  })
  .catch((err) => {
    console.log(err)
  })
}

}

export default Api;