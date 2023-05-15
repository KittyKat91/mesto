
import { handleKeyUpEscape } from "./script.js";

const popupImgBig = document.querySelector(".pop-up_type_image");

export class Card {
  static _template = document.querySelector("#place__template").content;

  constructor(link, name, cardInputs, template) {
    this._link = link;
    this._name = name;
    this.cardInputs = cardInputs;
    this.template = template;
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
    this._popupInnerImg = this._view.querySelector(".pop-up__photo");
    this._popupInnerTitle = this._view.querySelector(".pop-up__title");
    this._setEventListeners();
   
    return this._view;
  }

  _handleImageOpen() { 
    this._popupInnerImg = popupImgBig.querySelector(".pop-up__photo");
    this._popupInnerTitle = popupImgBig.querySelector(".pop-up__caption"); 
    this._popupInnerImg.src = this._link; 
    this._popupInnerTitle.textContent = this._name; 
    this._popupInnerImg.alt = this._name; 
    popupImgBig.classList.add("pop-up_opened"); 
    popupImgBig.addEventListener("keyup", () => handleKeyUpEscape());
    
    handleKeyUpEscape(); 
 }


  _getCardTemplate() {
    return Card._template.querySelector(".place").cloneNode(true);
  }

  _deletePlace() {
    this._view.remove();
  }

  _setEventListeners() {
    this._deleteBtn.addEventListener("click", () => this._deletePlace());
    this._image.addEventListener("click", () => this._handleImageOpen());
    this._likeBtn.addEventListener("click", () => this._likeBtn.classList.toggle("place__like-button_active"));
  }
}

