import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor(handleSubmit, popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector(".pop-up__form");
    this._submitBtn = this._popup.querySelector(".pop-up__button-submit");
    this._inputList = Array.from(
      this._popup.querySelectorAll(".pop-up__field")
    );
    this._handleSubmit = handleSubmit;
  }

  getInputValues() {
    const formInputs = {};

    this._inputList.forEach((inputElement) => {
      formInputs[inputElement.id] = inputElement.value;
    });

    return formInputs;
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this._popupForm(this.getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(evt, this.getInputValues());
      this.closePopup();
    });
  }

  closePopup() {
    super.closePopup();
    this._popupForm.reset();
  }
}
