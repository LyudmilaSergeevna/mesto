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

const closeButtonPhotoPopup = document.querySelector('.popup-photo__close-button')
const photo = popupPhoto.querySelector('.popup-photo__image')
const title = popupPhoto.querySelector('.popup-photo__title')

const cardsContainer = document.querySelector('.elements')
const templateElement = document.querySelector('#element').content

initialCards.forEach((item) => {
  const card = createCard(item.name,item.link)
  cardsContainer.prepend(card)
})

function openPopup(popup) {
  popup.classList.add('popup_opened')
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')
}

function openEditPopup() {
  nameInput.value = nameProfile.textContent
  aboutInput.value = aboutProfile.textContent
  openPopup(popupEdit)
}

function openAddPopup() {
  titleInput.value = '' /*если добавить их в сабмит, они не будут очищаться в случае не отправки а просто закрытия формы*/
  linkInput.value = ''
  titleInput.placeholder = 'Название' /*почему-то не работают находясь в верстке*/
  linkInput.placeholder = 'Ссылка на картинку'
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

function createCard(name, link) {
  const card = templateElement.querySelector('.element').cloneNode(true)
  const heartButton = card.querySelector('.element__heart-button')
  const deleteButton = card.querySelector('.element__delete-button')
  const cardImage = card.querySelector('.element__image')
  cardImage.src =  link
  const cardTitle = card.querySelector('.element__title')
  cardTitle.textContent = name
  cardImage.alt = `Изoбражение ${cardTitle.textContent}`
  
  heartButton.addEventListener('click', function() {
    heartButton.classList.toggle('element__heart-button_active')
  })
  deleteButton.addEventListener('click', function() {
    const element = deleteButton.closest('.element')
    element.remove()
  })
  cardImage.addEventListener('click', function() {
    openPopup(popupPhoto)
    photo.src = cardImage.src
    title.textContent = cardTitle.textContent
  })
  return(card)
  }

function submitCard(evt) {
  evt.preventDefault()
  const card = createCard(titleInput.value,linkInput.value)
  cardsContainer.prepend(card)
  closePopup(popupAdd)
}  

formAddElement.addEventListener('submit', submitCard)


