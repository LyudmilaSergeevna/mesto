import './index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import {PopupDelete} from '../components/PopupDelete.js';
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
const userName = document.querySelector('.profile__name')
const userInfo = document.querySelector('.profile__about')
const userAvatar = document.querySelector('.profile__avatar')
const formAvatarChange = document.querySelector('.popup-avatar__form')
const avatarOverlay= document.querySelector('.profile__avatar-overlay')

const popupImage = new PopupWithImage('.popup-photo')
const popupDelete = new PopupDelete('.popup-delete')

const optionsApi = {
  url: 'https://nomoreparties.co/v1/cohort-75',
  headers : {
    authorization: "37cb16fd-0a1c-4784-85d7-f8586264d2ea",
    'Content-Type': "application/json"
  }
}

const api = new Api(optionsApi)

api.getUserInfo()
.then((res) => {
  userName.textContent = res.name;
  userInfo.textContent = res.about;
  userAvatar.src = res.avatar
})


const cardList = new Section ({
  renderer: (data) => {
    const card = createCard(data);
    cardList.addItem(card)
  },
},
'.elements'
)

api.getCards()
.then((res) => {
  cardList.renderItems(res);
})

const popupAddCard = new PopupWithForm({
  popupSelector: '.popup-add', 
  submitForm: (data) => {
    api.postNewCard(data)
    .then((res) => {
      const card = createCard(res)
      cardList.addItem(card)
    }) 
  }
})

const profile = new UserInfo({nameSelector: '.profile__name', infoSelector: '.profile__about', avatarSelector: '.profile__avatar'})

const popupEditProfile = new PopupWithForm({
 popupSelector: '.popup-edit', 
 submitForm: (data) => {
  api.patchUserInfo(data)
  .then((res) => {
    profile.setUserInfo(res)
  })
}
 })

 const popupAvatar = new PopupWithForm({
  popupSelector: '.popup-avatar', 
  submitForm: (data) => { 
   api.patchUserAvatar(data)
   .then((res) => {
    profile.setUserAvatar(res)
   })
 }
  })

popupImage.setEventListeners();
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
popupDelete.setEventListeners();
popupAvatar.setEventListeners();

function handleCardClick(data) {
  popupImage.open(data);
}

const validationAddForm = new FormValidator(validationConfig, formAddElement)
validationAddForm.enableValidation();
const validationEditForm = new FormValidator(validationConfig, formEditProfile)
validationEditForm.enableValidation();
const validationAvatarForm = new FormValidator(validationConfig, formAvatarChange)
validationAvatarForm.enableValidation();

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

avatarOverlay.addEventListener('click', () => {
  popupAvatar.open();
  validationAvatarForm.resetValidation();
})

function createCard(data) {
  const card = new Card(data, '.element_type_default', () => handleCardClick(data), (id) => {
    popupDelete.open()
    popupDelete.setAction(() => 
    api.deleteCard(id)
      .then(() => {
        card._deleteCard()
  }))
}, (id) => {
  api.likeCard(id)
  .then ((res) => {
    card._likesTotal(res.likes.length ++)
  })
}, (id) => {
  api.unlikeCard(id)
  .then ((res) => {
    console.log(res)
    if (!res.likes.length === 0) {
    card._likesTotal(res.likes.length --)
    } else { 
      card._likesTotal(res.likes.length)
    }
  })
});
  const cardElement = card.generateCard();
  return cardElement
}
