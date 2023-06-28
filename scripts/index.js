const popup = document.querySelector('.popup')
const editButton = document.querySelector('.editButton')
const closeButton = popup.querySelector('.closeButton')
const submitButton = popup.querySelector('.submitButton')
let formEditProfile = document.querySelector('.popup__container')
let nameInput = formEditProfile.querySelector('.popup__name')
let aboutInput = formEditProfile.querySelector('.popup__about')
let profile = document.querySelector('.profile')
let nameProfile = profile.querySelector('.profile__name')
let aboutProfile = profile.querySelector('.profile__about')


function togglePopup() {
  popup.classList.toggle('popup_opened')
}

editButton.addEventListener('click', togglePopup)
closeButton.addEventListener('click', togglePopup)

function saveProfile (evt) {
  evt.preventDefault()
  nameProfile.textContent = nameInput.value
  aboutProfile.textContent = aboutInput.value
  togglePopup()
}

submitButton.addEventListener('click', saveProfile)
