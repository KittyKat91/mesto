import Popup from "./popup.js";

// should only extend popup and should only open card image
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._popupImg = this._popup.querySelector(".pop-up__photo");
    this._popupImgTitle = this._popup.querySelector(".pop-up__caption");
  }

  fillPicturePopup({ link, name }) {
    this._popupImg.src = link;
    this._popupImgTitle.textContent = name;
    this._popupImg.alt = name;
  }

  open({ link, name }) {
    this.fillPicturePopup({ link, name });
    super.open();
  }
}
