import './index.css';
import Card from '../components/Card.js';
import { initialCards } from '../scripts/initial-cards.js';
import { validationConfig, FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js'

const editButton = document.querySelector('.profile__edit-button')
const formEditProfile = document.querySelector('.popup__form')
const nameInput = document.querySelector('.popup__input_type_name')
const aboutInput = document.querySelector('.popup__input_type_about')
const addButton = document.querySelector('.profile__add-button')
const formAddElement = document.querySelector('.popup-add__form')

const popupImage = new PopupWithImage('.popup-photo')

const popupAddCard = new PopupWithForm({
  popupSelector: '.popup-add', 
  submitForm: (data) => {
    const card = createCard(data)
    cardList.addItem(card)  
  }
})

const profile = new UserInfo({nameSelector: '.profile__name', infoSelector: '.profile__about'})

const popupEditProfile = new PopupWithForm({
 popupSelector: '.popup-edit', 
 submitForm: (data) => {
  profile.setUserInfo(data)
}
 })

popupImage.setEventListeners();
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();

function handleCardClick(data) {
  popupImage.open(data);
}

const validationAddForm = new FormValidator(validationConfig, formAddElement)
validationAddForm.enableValidation();
const validationEditForm = new FormValidator(validationConfig, formEditProfile)
validationEditForm.enableValidation();

editButton.addEventListener('click', () => {
  popupEditProfile.open();
  const userInfo = profile.getUserInfo();
  nameInput.value = userInfo.name
  aboutInput.value = userInfo.info
  validationEditForm.resetValidation();
})

addButton.addEventListener('click', () => {
  popupAddCard.open();
  validationAddForm.resetValidation();
})

const cardList = new Section ({
  items: initialCards,
  renderer: (data) => {
    const card = createCard(data);
    cardList.addItem(card)
  },
},
'.elements'
)

cardList.renderItems();

function createCard(data) {
  const card = new Card(data, '.element_type_default', () => handleCardClick(data));
  const cardElement = card.generateCard();
  return cardElement
}