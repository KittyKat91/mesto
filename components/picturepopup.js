import Popup from "./popup.js";

// should only extend popup and should only open card image
export default class PicturePopup extends Popup {
    constructor(popupSelector){
        super(popupSelector)
        this._popupImg = this._popup.querySelector('.pop-up__photo');
        this._popupImgTitle = this._popup.querySelector('.pop-up__caption');
    }


    _picturePopupOpen(link, name) {
        super.openPopup()
        this._popupImg.src = link;
        this._popupImgTitle.textContent = name;
        this._popupImg.alt = name;
    }    
}