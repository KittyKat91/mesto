const popupImgBig = document.querySelector(".pop-up_type_image");
const popupImgClose = document.querySelector(".pop-up__button-close");
const popupInnerImg = document.querySelector(".pop-up__photo");
const popupInnerTitle = document.querySelector(".pop-up__caption");

export class Card {
  static _template = document.querySelector("#place__template").content;
  constructor(link, name, cardInputs) {
    this._link = link;
    this._name = name;
    this._cardInputs = cardInputs;
  }
  _handleImageOpen() {
    popupInnerImg.src = this._link;
    popupInnerTitle.textContent = this._name;
    popupImgBig.classList.add("pop-up_opened");
  }

  _handleImageClose() {
    popupInnerImg.src = "";
    popupImgBig.classList.remove("pop-up_opened");
  }

  createNewPlace() {
    this._view = Card._template.querySelector(".place").cloneNode(true);
    this._image = this._view.querySelector(".place__img");
    this._image.src = this._link;
    this._placeName = this._view.querySelector(".place__title");
    this._placeName.textContent = this._name;
    const likeBtn = this._view.querySelector(".place__like-button");
    const deleteBtn = this._view.querySelector(".place__button-delete");

    deleteBtn.addEventListener("click", () => this._view.remove());

    likeBtn.addEventListener("click", () =>
      likeBtn.classList.toggle("place__like-button_active")
    );

    this._image.addEventListener("click", () => this._handleImageOpen());

    popupImgClose.addEventListener("click", () => {
      this._handleImageClose();
    });

    return this._view;
  }
}
