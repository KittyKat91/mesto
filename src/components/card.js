
export default class Card {
  constructor(data, templateSelector, { likePlace, dislikePlace, updateLikesCallback }, handleCardClick, userId) {
    this._link = data.link;
    this._name = data.name;
    this._owner = data.owner;
    this._id = data._id;
       
    this._likes = data.likes;   
    this.userId = userId;
    this._handleCardClick = handleCardClick;
    this._likePlace = likePlace;
    this._dislikePlace = dislikePlace;
    this._updateLikesCallback = updateLikesCallback;
    this._template = document.querySelector(templateSelector).content;
  }

  _getCardTemplate() {
    return this._template.querySelector('.place').cloneNode(true);
  }

  createNewPlace() {
    this._view = this._getCardTemplate();
    this._image = this._view.querySelector('.place__img');
    this._image.src = this._link;
    this._placeName = this._view.querySelector('.place__title');
    this._placeName.textContent = this._name;
    this._placeName.alt = this._name;

    this._likeBtn = this._view.querySelector('.place__like-button');
    this._deleteBtn = this._view.querySelector('.place__button-delete');
    this._popupImgClose = this._view.querySelector('.pop-up__button-close');
    this._likeCount = this._view.querySelector('.place__like-count');
    console.log(this._owner._id, this.userId);
    

    if (this._owner._id === this.userId) {
      this._deleteBtn.classList.remove('place__button-delete-hidden');
    }

    this._likeCount.textContent = this._likes.length;
    this._setEventListeners();
    return this._view;
  }

  _deletePlace() {
    this._view.remove();
  }

  _updateLikes(likes) {
    this._likeCount.textContent = likes.length;
  }

  _handleLikeClick() {
    this._likeBtn.classList.toggle('place__like-button_active');

    if (this._likeBtn.classList.contains('place__like-button_active')) {
      this._likePlace(this);
    } else {
      this._dislikePlace(this);
    }
  }

  _setEventListeners() {
    if (this._owner.id === this._userId) {
      this._deleteBtn.addEventListener('click', () => this._deletePlace());
    }

    this._image.addEventListener('click', () =>
      this._handleCardClick(this._link, this._name)
    );
    this._likeBtn.addEventListener('click', () => this._handleLikeClick());
  }
}
