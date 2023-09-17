import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor({popupSelector, submitForm}) {
    super(popupSelector);
    this._submit = submitForm;
    this._popupForm = this._popup.querySelector('.popup__form')
    this._inputList = this._popupForm.querySelectorAll('.popup__input')
    this._submitButton = this._popup.querySelector('.popup__submit-button')
  }

  _getInputValues() {
    this._formValues = {}
    this._inputList.forEach (input => {
      this._formValues[input.name]= input.value
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._submit(this._getInputValues())
    })
  }

  renderLoading(bull) {
    if ((bull === true)) {
        this._submitButton.textContent = 'Сохранение...'
      } else {
        this._submitButton.textContent = 'Сохранить'
      }
  }


  close() {
    super.close();
    this._popupForm.reset()
  }
}
