class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popup__close-button');

  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown',(evt) => {this._handleEscClose(evt)})
  }

  close() {
    this._popup.classList.remove('popup_opened')
    document.removeEventListener('keydown',(evt) => {this._handleEscClose(evt)})
  }

  _handleEscClose(evt) {
    if (evt.key==="Escape") {
      this.close();
    }
  } 

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', () => {
      this.close()
    })
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close()
      }
    })
  }
}

class PopupWithImage extends Popup {
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

class PopupWithForm extends Popup {
  constructor({popupSelector, submitForm}) {
    super(popupSelector);
    this._submit = submitForm;
    this._popupForm = this._popup.querySelector('.popup__form')
    this._inputList = this._popupForm.querySelectorAll('.popup__input')
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
      this.close()
    })
  }

  close() {
    super.close();
    this._popupForm.reset()
  }
}

export { PopupWithForm, PopupWithImage };
