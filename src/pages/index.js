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

let myId = null;

const cardList = new Section ({
  renderer: (data) => {
    const card = createCard(data)
    if (data.owner._id === myId) {
      cardList.addMyItem(card)
    } cardList.addItem(card)
  },
},
'.elements'
)

Promise.all([api.getUserInfo(), api.getCards()])
.then (([userInfo, cardsArray]) => {
  profile.setUserInfo(userInfo);
  profile.setUserAvatar(userInfo);
  myId = userInfo._id;
  cardList.renderItems(cardsArray);
})
.catch((err) => {
  console.log(err);
})

const popupAddCard = new PopupWithForm({
  popupSelector: '.popup-add', 
  submitForm: (data) => {
    popupAddCard.renderLoading(true)
    api.postNewCard(data)
    .then((res) => {
      const card = createCard(res)
      cardList.addMyItem(card)
      popupAddCard.close()
    }) 
    .catch((err) => {
      console.log(err)
    })
  }
})

const profile = new UserInfo({nameSelector: '.profile__name', infoSelector: '.profile__about', avatarSelector: '.profile__avatar'})

const popupEditProfile = new PopupWithForm({
 popupSelector: '.popup-edit', 
 submitForm: (data) => {
  popupEditProfile.renderLoading(true)
  api.patchUserInfo(data)
  .then((res) => {
    profile.setUserInfo(res)
    popupEditProfile.close()
  })
  .catch((err) => {
    console.log(err)
  })
}
 })

 const popupAvatar = new PopupWithForm({
  popupSelector: '.popup-avatar', 
  submitForm: (data) => { 
   popupAvatar.renderLoading(true) 
   api.patchUserAvatar(data)
   .then((res) => {
    profile.setUserAvatar(res)
    popupAvatar.close()
   })
   .catch((err) => {
    console.log(err)
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
  popupEditProfile.renderLoading(false);
  popupEditProfile.open();
  const userInfo = profile.getUserInfo();
  nameInput.value = userInfo.name
  aboutInput.value = userInfo.info
  validationEditForm.resetValidation();
})

addButton.addEventListener('click', () => {
  popupAddCard.renderLoading(false)
  popupAddCard.open();
  validationAddForm.resetValidation();
})

avatarOverlay.addEventListener('click', () => {
  popupAvatar.renderLoading(false)
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
        popupDelete.close()
  })
  .catch((err) => {
    console.log(err)
  })
  )
}, (id) => {
  api.likeCard(id)
  .then ((res) => {
    card._likesTotal(res.likes.length ++)
  })
  .catch((err) => {
    console.log(err)
  })
}, (id) => {
  api.unlikeCard(id)
  .then ((res) => {
    if (!res.likes.length === 0) {
    card._likesTotal(res.likes.length --)
    } else { 
      card._likesTotal(res.likes.length)
    }
  })
  .catch((err) => {
    console.log(err)
  })
}, myId
);
  const cardElement = card.generateCard();
  return cardElement
}
