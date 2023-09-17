import { Popup } from './Popup.js'

export class PopupDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup-delete__form')
  }

  setAction(action) {
    this._submit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._submit()
    })
  }
}
