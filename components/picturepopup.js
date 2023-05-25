import Popup from "./popup.js";

// should only extend popup and should only open card image
export default class PicturePopup extends Popup {
    constructor(popupSelector){
        console.log(popupSelector);
        super(popupSelector)
        
        this._popupImg = this._popup.querySelector('.pop-up__photo');
        this._popupImgTitle = this._popup.querySelector('.pop-up__caption');
    }


    picturePopupOpen({link, name}) {
        this._popupImg.src = link;
        this._popupImgTitle.textContent = name;
        this._popupImg.alt = name;
    }    

    openPopup ({link, name}) {
        this.picturePopupOpen({link, name})
        super.openPopup();
    }
}