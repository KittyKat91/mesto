const popupImgBig = document.querySelector(".pop-up_type_image");
const popupInnerImg = popupImgBig.querySelector(".pop-up__photo");
const popupInnerTitle = popupImgBig.querySelector(".pop-up__caption");

export default class Card {
  static _template = document.querySelector("#place__template").content;

  constructor({ data, handleCardClick }, cardSelector) {
    this._link = data.link;
    this._name = data.name;
    this.handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
  }

  _getCardTemplate() {
    return Card._template.querySelector(".place").cloneNode(true);
  }

  createNewPlace = () => {
    this._view = this._getCardTemplate();
    this._image = this._view.querySelector(".place__img");
    this._image.src = this._link;
    this._placeName = this._view.querySelector(".place__title");
    this._placeName.textContent = this._name;
    this._placeName.alt = this._name;

    this._likeBtn = this._view.querySelector(".place__like-button");
    this._deleteBtn = this._view.querySelector(".place__button-delete");
    this._popupImgClose = this._view.querySelector(".pop-up__button-close");

    this._setEventListeners();

    return this._view;
  };

  _deletePlace() {
    this._view.remove();
  }

  _setEventListeners() {
    this._deleteBtn.addEventListener("click", () => this._deletePlace());
    this._image.addEventListener("click", () => this._handleCardClick());
    this._likeBtn.addEventListener("click", () =>
      this._likeBtn.classList.toggle("place__like-button_active")
    );
  }
}