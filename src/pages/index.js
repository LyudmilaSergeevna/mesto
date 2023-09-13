import './index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import {PopupDelete} from '../components/PopupDelete.js';
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
const userName = document.querySelector('.profile__name')
const userInfo = document.querySelector('.profile__about')
const userAvatar = document.querySelector('.profile__avatar')

const popupImage = new PopupWithImage('.popup-photo')
const popupDelete = new PopupDelete('.popup-delete' /*() => handleDeleteAfterYes()*/)


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


//.then((res) => {
  
//})

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

const profile = new UserInfo({nameSelector: '.profile__name', infoSelector: '.profile__about'})

const popupEditProfile = new PopupWithForm({
 popupSelector: '.popup-edit', 
 submitForm: (data) => {
  api.patchUserInfo(data)
  .then((res) => {
    profile.setUserInfo(res)
  })
  //profile.setUserInfo(data)

}
 })

 const popupAvatar = new PopupWithForm({
  popupSelector: '.popup-avatar', 
  submitForm: (data) => {
   api.patchUserInfo(data)
   .then((res) => {
     profile.setUserInfo(res)
   })
 }
  })

 //api.likeCard(data)
 //.then((res) => {
  //console.log(res)
 //})

popupImage.setEventListeners();
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
popupDelete.setEventListeners();

function handleCardClick(data) {
  popupImage.open(data);
}

//function handleDeleteClick(data) {
  //console.log(id);
 // popupDelete.open(data);

//}


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

/*const cardList = new Section ({
  items: initialCards,
  renderer: (data) => {
    const card = createCard(data);
    cardList.addItem(card)
  },
},
'.elements'
)

cardList.renderItems();*/


function createCard(data) {
  const card = new Card(data, '.element_type_default', () => handleCardClick(data), (id) => {
    popupDelete.open()
    popupDelete.setAction((id) => 
    api.deleteCard(id)
      .then(() => {
        card._deleteCard()
  }))
});
  const cardElement = card.generateCard();
  return cardElement
}


//function handleDeleteAfterYes(id) {
 // api.deleteCard(id)
  //.then(() => {
  
  //})
 // }

