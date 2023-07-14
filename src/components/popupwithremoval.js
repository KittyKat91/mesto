import Popup from "./popup.js";

export default class PopupWithRemoval extends Popup {
  constructor(popupSelector, removePlace) {
    super(popupSelector);
    this._removePlace = removePlace;
    this._yesBtn = this._popup.querySelector('.pop-up__button-delete');
    this._placeToRemove = null;
    this._identifier = null;
  }
  setDeleteAction(deleteAction) {
    this._handleDeleteCallback = deleteAction;
  }
  open(placeToRemove, identifier) {
    super.open();
    this._placeToRemove = placeToRemove;
    this._identifier = identifier;
  }

  close() {
    super.close();
    this._placeToRemove = null;
    this._identifier = null;
  }

  setEventListeners() {
    super.setEventListeners();
    this._yesBtn.addEventListener('click', (evt) => {
      this._handleDeleteCallback(this)
    });
  }
}
