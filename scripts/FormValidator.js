export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

export class FormValidator {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
  }

  enableValidation() {  
    this._setEventListeners()
  }
  
  _showError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`)
    inputElement.classList.add(this._validationConfig.inputErrorClass)
    errorElement.textContent = errorMessage
    errorElement.classList.add(this._validationConfig.errorClass)
  }

  _hideError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`)
    inputElement.classList.remove(this._validationConfig.inputErrorClass)
    errorElement.classList.remove(this._validationConfig.errorClass)
    errorElement.textContent = ''
  }
  
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage)
    } else {
      this._hideError(inputElement)
    }
  }

  _setEventListeners() {
    const inputArray = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector))
    const buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector)
    inputArray.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement)
        this._toggleButtonState(inputArray, buttonElement)
      })
    }) 
  }
  
  _hasInvalidInput(inputArray) {
    return inputArray.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  
  _toggleButtonState(inputArray, buttonElement) {
    if (this._hasInvalidInput(inputArray)) {
      buttonElement.classList.add(this._validationConfig.inactiveButtonClass)
      buttonElement.setAttribute('disabled','')
    } else {
      buttonElement.classList.remove(this._validationConfig.inactiveButtonClass)
      buttonElement.removeAttribute('disabled')
    } 
  }
}