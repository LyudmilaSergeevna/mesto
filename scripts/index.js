const popup = document.querySelector('.popup')
const popupAdd = document.querySelector('.popup-add')
const popupPhoto = document.querySelector('.popup-photo')

const editButton = document.querySelector('.profile__edit-button')
const closeButton = document.querySelector('.popup-edit__close-button')
let formEditProfile = document.querySelector('.popup__container')
let submitForm = formEditProfile.querySelector('.popup__form')
let nameInput = formEditProfile.querySelector('.popup__input_type_name')
let aboutInput = formEditProfile.querySelector('.popup__input_type_about')
let profile = document.querySelector('.profile')
let nameProfile = profile.querySelector('.profile__name')
let aboutProfile = profile.querySelector('.profile__about')

const addButton = document.querySelector('.profile__add-button')
const closeButtonAddPopup = document.querySelector('.popup-add__close-button')
let formAddElement = document.querySelector('.popup-add__container')
let submitAddForm = formAddElement.querySelector('.popup-add__form')
let titleInput = formAddElement.querySelector('.popup__input_type_title')
let linkInput = formAddElement.querySelector('.popup__input_type_link')

const closeButtonPhotoPopup = document.querySelector('.popup-photo__close-button')
let photo = popupPhoto.querySelector('.popup-photo__image')
let title = popupPhoto.querySelector('.popup-photo__title')

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

let elements = document.querySelector('.elements')
let templateElement = document.querySelector('#element').content

initialCards.forEach (function(item) {
  let element = templateElement.querySelector('.element').cloneNode(true)
  element.querySelector('.element__image').src = item.link
  element.querySelector('.element__title').textContent = item.name;
  elements.append(element)
  return
})

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

function openPopupAdd() {
  popupAdd.classList.add('popup_opened')
  titleInput.value = ''
  linkInput.value = ''
  titleInput.placeholder = 'Название'
  linkInput.placeholder = 'Ссылка на картинку'
}

function closePopupAdd() {
  popupAdd.classList.remove('popup_opened')
}

addButton.addEventListener('click', openPopupAdd)
closeButtonAddPopup.addEventListener('click', closePopupAdd)

function addElement(evt) {
  evt.preventDefault()
  const element = templateElement.querySelector('.element').cloneNode(true)
  element.querySelector('.element__image').src = linkInput.value
  element.querySelector('.element__title').textContent = titleInput.value
  elements.prepend(element)
  closePopupAdd()
}

submitAddForm.addEventListener('submit',addElement)

let heartButtons = document.querySelectorAll('.element__heart-button')

heartButtons.forEach(function(item) {
  item.addEventListener('click', function() {
  if (item.classList.contains('element__heart-button_active')) {
    item.classList.remove('element__heart-button_active')
  } else {
    item.classList.add('element__heart-button_active')
  }
  })
})

let deleteButtons = document.querySelectorAll('.element__delete-button')

deleteButtons.forEach(function(item) {
  item.addEventListener('click', function() {
    let card = item.closest('.element')
    card.remove()
  })
})

/* кажется в следующей функции я что-то навертела 0_0 */
let images = document.querySelectorAll('.element__image')
images.forEach(function(item) {
  item.addEventListener('click', function() {
    popupPhoto.classList.add('popup_opened')
    photo.src = item.src
    let thisElement = item.closest('.element')
    let titleThisElement = thisElement.querySelector('.element__title')
    title.textContent = titleThisElement.textContent
  })
})

function closePopupPhoto() {
  popupPhoto.classList.remove('popup_opened')
}
closeButtonPhotoPopup.addEventListener('click', closePopupPhoto)


