import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup-photo__image');
    this._popupTitle = this._popup.querySelector('.popup-photo__title');
  }

  open({name, link}) {
    super.open();
    this._link = link
    this._name = name
    this._popupImage.src = this._link;
    this._popupTitle.textContent = this._name;
    this._popupImage.alt = `Изoбражение ${this._name.textContent}`
  }

}