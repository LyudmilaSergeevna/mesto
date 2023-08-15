import { openPopup } from './index.js';

class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    return cardElement;

  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = `Изoбражение ${this._name}`;
    this._element.querySelector('.element__title').textContent = this._name;
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__heart-button').addEventListener('click', () => {
      this._likeCard();
    });
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._deleteCard();
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openCard();
    })
  }

  _likeCard() {
    this._element.querySelector('.element__heart-button').classList.toggle('element__heart-button_active')
  }

  _deleteCard() {
    this._element.remove()
  }

  _openCard() {
    const popupPhoto = document.querySelector('.popup-photo')
    const photo = popupPhoto.querySelector('.popup-photo__image')
    const title = popupPhoto.querySelector('.popup-photo__title')
    openPopup(popupPhoto)
    photo.src = this._link;
    title.textContent = this._name;
    photo.alt = `Изoбражение ${title.textContent}`
  }
}

export default Card;