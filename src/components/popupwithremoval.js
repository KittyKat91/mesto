import Popup from "./popup";

export default class PopupWithRemoval extends Popup {
    constructor(popupSelector, removePlace) {
        super(popupSelector)
        this._removePlace = removePlace;
        console.log(this._yesBtn);
        this._yesBtn = this._popup.querySelector(".popup__button-delete");
        this._placeToRemove = null;
        this._identifier = null;
    }

    open(placeToRemove, identifier) {
        super.open();
        this._placeToRemove = placeToRemove;
        this._identifier = identifier;
    }

    setEventListeners() {
        super.setEventListeners();
        this._yesBtn.addEventListener("click", (evt) => {
            this._removePlace(this._identifier, this._placeToRemove, evt.target);
        });
    }
}
