import { Popup } from './Popup.js'

export class PopupDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupYesButton = this._popup.querySelector('.popup-delete__submit-button');
    //this._handleDeleteCard = handleDeleteCardAfterYes;
  }

  setAction(action) {
    this._submit = action;

  }

  setEventListeners() {
    super.setEventListeners();
    this._popupYesButton.addEventListener('click', () => {
      this._submit()
      this.close()
    })
  }
}
