import Popup from "./popup.js";

export default class PopupWithForm extends Popup { 
    constructor ({submitForm}, popupSelector){
    super(popupSelector);
    this._submitForm = submitForm;
    this._popupForm = document.querySelector(".pop-up__form");
    this._submitBtn = this._popupForm.querySelector(".pop-up__button-submit");
    this._inputList = Array.from(this._popupForm.querySelectorAll(".pop-up__field"))
    this._handleSubmit = this._handleSubmit.bind(this);
}

    //collects the inputs made by user
    _getInputValues(){
        return this._inputList.forEach(inputElement => inputElement.value);
    }

    //sets the event listener towards submit button
    setEventListeners() {
        super._setEventListeners();
        this._popupForm.addEventListener("submit", this._handleSubmit);
    }

    //connected to getinputvalues function
    _handleSubmit(evt) {
        evt.preventDefault();
        this.submitForm(this._getInputValues());
    }

    closePopup() {
        super.close();
        this._popupForm.reset();
    }
}
