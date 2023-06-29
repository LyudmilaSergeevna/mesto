const popup = document.querySelector('.popup')
const editButton = document.querySelector('.profile__edit-button')
const closeButton = document.querySelector('.popup__close-button')
formEditProfile = document.querySelector('.popup__container')
let submitForm = formEditProfile.querySelector('.popup__form')
let nameInput = formEditProfile.querySelector('.popup__input_type_name')
let aboutInput = formEditProfile.querySelector('.popup__input_type_about')
let profile = document.querySelector('.profile')
let nameProfile = profile.querySelector('.profile__name')
let aboutProfile = profile.querySelector('.profile__about')

function openPopup() {
  popup.classList.add('popup_opened')
  nameInput.value = nameProfile.textContent
  aboutInput.value = aboutProfile.textContent
}

function closePopup() {
  popup.classList.remove('popup_opened')
}

editButton.addEventListener('click', openPopup)
closeButton.addEventListener('click', closePopup)

function saveProfile (evt) {
  evt.preventDefault()
  nameProfile.textContent = nameInput.value
  aboutProfile.textContent = aboutInput.value
  closePopup()
}

submitForm.addEventListener('submit',saveProfile)