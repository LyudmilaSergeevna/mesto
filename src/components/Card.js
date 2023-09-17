class Card {
  constructor({name, link, _id, likes, owner}, templateSelector, handleCardClick, handleDeleteClick, likeCard, unlikeCard, myId) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._myId = myId;
    this._likes = likes;
    this._owner = owner;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._apiLikeCard = likeCard;
    this._unlikeCard = unlikeCard;
    this._popupPhoto = document.querySelector('.popup-photo')
    this._photo = this._popupPhoto.querySelector('.popup-photo__image')
    this._title = this._popupPhoto.querySelector('.popup-photo__title')
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__image');
    this._cardTitle = this._element.querySelector('.element__title');
    this._heartButton = this._element.querySelector('.element__heart-button');
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._likeTotal = this._element.querySelector('.element__like-total');
    this._likeTotal.value = this._likes.length;
    this._getId();
    this._getLikes();
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = `Изoбражение ${this._name}`;
    this._cardTitle.textContent = this._name;
    return this._element;
  }

  _setEventListeners() {
    this._heartButton.addEventListener('click', () => {
      this._likeCard(this.id);
    });
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteClick(this._id);
    });
    this._cardImage.addEventListener('click', () => {
      this._openCard();
    })
  }

  _likeCard() {
   if (this._heartButton.classList.contains('element__heart-button_active')) {
      this._unlikeCard(this._id)
      this._heartButton.classList.remove('element__heart-button_active')
    } else {
    this._heartButton.classList.add('element__heart-button_active')
    this._apiLikeCard(this._id)
  }
  }

  _deleteCard() {
    this._element.remove()
  }

  _openCard() {
    this._handleCardClick()
  }

  _likesTotal(likes) {
    this._likeTotal.value = likes
  }

  _getId() {
  if (this._owner._id !== this._myId) {
  this._deleteButton.setAttribute("style", "display: none;")    
  }
}

 _getIdi() {
  if (this._owner._id !== this._myId) {
    console.log(this._myId)    
    }
 }  

  _getLikes() {
  this._likes.forEach((like) => {
    if (like._id === this._myId) {
      this._heartButton.classList.add('element__heart-button_active')
    }
  })
}
  
}

export default Card;