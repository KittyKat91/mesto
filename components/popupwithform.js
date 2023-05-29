
import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor(handleSubmit, popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector(".pop-up__form");
    this._submitBtn = this._popup.querySelector(".pop-up__button-submit");
    this._inputList = Array.from(
      this._popup.querySelectorAll(".pop-up__field")
    );
    this.handleSubmit = handleSubmit.bind(this);
  }

  getInputValues() {
    const formInputs = {};
    this._inputList.forEach((inputElement) => {
      formInputs[inputElement.name] = inputElement.value;
    });
    return formInputs;
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this._submitForm(this.getInputValues());

  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
      this._handleSubmit(evt, this.getInputValues())
      this.closePopup();
    });
  } 

  closePopup() {
    super.closePopup();
    this._popupForm.reset();
  }
}


