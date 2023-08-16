import Card from './Card.js';
import { validationConfig, FormValidator } from './FormValidator.js';

const popupEdit = document.querySelector('.popup-edit')
const popupAdd = document.querySelector('.popup-add')
const popupPhoto = document.querySelector('.popup-photo')

const editButton = document.querySelector('.profile__edit-button')
const closeButtonEditPopup = document.querySelector('.popup-edit__close-button')

const formEditProfile = document.querySelector('.popup__form')
const nameInput = document.querySelector('.popup__input_type_name')
const aboutInput = document.querySelector('.popup__input_type_about')
const profile = document.querySelector('.profile')
const nameProfile = profile.querySelector('.profile__name')
const aboutProfile = profile.querySelector('.profile__about')

const addButton = document.querySelector('.profile__add-button')
const closeButtonAddPopup = document.querySelector('.popup-add__close-button')

const formAddElement = document.querySelector('.popup-add__form')
const titleInput = document.querySelector('.popup__input_type_title')
const linkInput = document.querySelector('.popup__input_type_link')
const submitAddButton = formAddElement.querySelector('.popup__submit-button')

const closeButtonPhotoPopup = document.querySelector('.popup-photo__close-button')

const cardsContainer = document.querySelector('.elements')
const templateElement = document.querySelector('#element').content

export function openPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown',isItEsc)
}

/*function handleCardClick(name,link) { 
  photo.src = link;
  title.textContent = name;
  photo.alt = `Изoбражение ${title.textContent}`
  openPopup(popupPhoto) // она ж все равно будет обращаться к openPopup и ее тоже придется экспортировать
}*/

const validationAddForm = new FormValidator(validationConfig, formAddElement)
validationAddForm.enableValidation();
const validationEditForm = new FormValidator(validationConfig, formEditProfile)
validationEditForm.enableValidation();


function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown',isItEsc)
}

function openEditPopup() {
  formEditProfile.reset() 
  nameInput.value = nameProfile.textContent
  aboutInput.value = aboutProfile.textContent
  openPopup(popupEdit)
}

function openAddPopup() {
  submitAddButton.disabled = true
  titleInput.value = '' 
  linkInput.value = ''
  openPopup(popupAdd)
}

editButton.addEventListener('click', () => {
  openEditPopup()
  validationEditForm.resetValidation();
})
closeButtonEditPopup.addEventListener('click', () => {closePopup(popupEdit)})

addButton.addEventListener('click', () => {
  openAddPopup();
  validationAddForm.resetValidation();
})
closeButtonAddPopup.addEventListener('click', () => {closePopup(popupAdd)})

closeButtonPhotoPopup.addEventListener('click', () => {closePopup(popupPhoto)})

function saveProfile (evt) {
  evt.preventDefault()
  nameProfile.textContent = nameInput.value
  aboutProfile.textContent = aboutInput.value
  closePopup(popupEdit)
}

formEditProfile.addEventListener('submit',saveProfile)

initialCards.forEach((item) => {
  cardsContainer.prepend(createCard(item.name, item.link));
})

function submitCard(evt) {
  evt.preventDefault()
  cardsContainer.prepend(createCard(titleInput.value, linkInput.value));
  closePopup(popupAdd)
}  

function createCard(name, link) {
  const card = new Card(name, link, '.element_type_default');
  const cardElement = card.generateCard();
  return cardElement
}

formAddElement.addEventListener('submit', submitCard)

function clickOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target)
  }
} 

const popupArray = Array.from(document.querySelectorAll('.popup'))
popupArray.forEach((item) => {
  item.addEventListener('click', (evt) => {clickOverlay(evt)})
  })

function isItEsc(evt) {
  if (evt.key==="Escape") {
    const popup = document.querySelector('.popup_opened')
    closePopup(popup)
  }
}  