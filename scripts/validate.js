const enableValidation = (validationConfig) => {  
  const formArray = Array.from(document.querySelectorAll(validationConfig.formSelector))
  formArray.forEach((formElement) => {
    setEventListeners(formElement)
  })
}

const showError = (formElement,inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`)
  inputElement.classList.add(validationConfig.inputErrorClass)
  errorElement.textContent = errorMessage
  errorElement.classList.add(validationConfig.errorClass)
}

const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`)
  inputElement.classList.remove(validationConfig.inputErrorClass)
  errorElement.classList.remove(validationConfig.errorClass)
  errorElement.textContent = ''
}

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage)
  } else {
    hideError(formElement, inputElement)
  }
}

const setEventListeners = (formElement) => {
  const inputArray = Array.from(formElement.querySelectorAll(validationConfig.inputSelector))
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector)
  inputArray.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement)
      toggleButtonState(inputArray, buttonElement)
    })
  }) 
}

const hasInvalidInput = (inputArray) => {
  return inputArray.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputArray, buttonElement) => {
  if (hasInvalidInput(inputArray)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass)
    buttonElement.setAttribute('disabled','')
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass)
    buttonElement.removeAttribute('disabled')
  } 
}

