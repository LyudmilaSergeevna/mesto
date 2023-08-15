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

/*initialCards.forEach((item) => {
  const card = createCard(item.name,item.link)
  cardsContainer.prepend(card)
})*/

export function openPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown',isItEsc)
}

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
  submitAddButton.classList.add('popup__submit-button_inactive')
  submitAddButton.disabled = true
  titleInput.value = '' 
  linkInput.value = ''
  openPopup(popupAdd)
}

editButton.addEventListener('click', () => {openEditPopup()})
closeButtonEditPopup.addEventListener('click', () => {closePopup(popupEdit)})

addButton.addEventListener('click', () => {openAddPopup()})
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
  const card = new Card(item.name, item.link, '.element_type_default');
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
})


const formArray = Array.from(document.querySelectorAll(validationConfig.formSelector))
  formArray.forEach((formElement) => {
    const classElement = new FormValidator(validationConfig, formElement)
    classElement.enableValidation();
  }
  );

function submitCard(evt) {
  evt.preventDefault()
  const card = new Card(titleInput.value, linkInput.value, '.element_type_default');
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
  closePopup(popupAdd)
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