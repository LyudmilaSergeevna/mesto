class Api {
  constructor({ url, headers}) {
    this._url = url,
    this._headers = headers 
  }

_ifResOk(url, options) {
  return fetch(url, options)
  .then((res) => {
    if (res.ok) {
      return res.json()
    }
    throw new Error(`Ошибка: ${res.status}`)
  })
}
  
getUserInfo() {
  return this._ifResOk(`${this._url}/users/me`, {
    headers: this._headers
  })
}

getCards() {
  return this._ifResOk(`${this._url}/cards`, {
    headers: this._headers
  })
}

patchUserInfo({name, info}) {
  return this._ifResOk(`${this._url}/users/me`, {
    method: "PATCH",
    headers: this._headers,
    body: JSON.stringify({
      name: name,
      about: info
    })
  })
}

postNewCard({name, link}) {
  return this._ifResOk(`${this._url}/cards`, {
    method: "POST",
    headers: this._headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
}

deleteCard(id) {
  return this._ifResOk(`${this._url}/cards/${id}`, {
    method: "DELETE",
    headers: this._headers,
  })
}

likeCard(id) {
  return this._ifResOk(`${this._url}/cards/${id}/likes`, {
    method: "PUT",
    headers: this._headers,
  })
}

unlikeCard(id) {
  return this._ifResOk(`${this._url}/cards/${id}/likes`, {
    method: "DELETE",
    headers: this._headers,
  })
}

patchUserAvatar({link}) {
  return this._ifResOk(`${this._url}/users/me/avatar`, {
    method: "PATCH",
    headers: this._headers,
    body: JSON.stringify({
      avatar: link
    })
  })
}

}

export default Api;