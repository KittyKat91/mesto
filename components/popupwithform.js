import Popup from "./popup.js";

export default class PopupWithForm extends Popup { 
    constructor (submitForm, popupSelector){
    super(popupSelector);
    this._submitForm = submitForm;
    console.log(this._popup)
    // this._popupForm = this._popup.querySelector(popupSelector);
    this._submitBtn = this._popup.querySelector(".pop-up__button-submit");
    this._inputList = Array.from(this._popup.querySelectorAll(".pop-up__field"))
    this._handleSubmit = this._handleSubmit.bind(this);
}

    //collects the inputs made by user
    _getInputValues(){
        return this._inputList.forEach(inputElement => inputElement.value);
    }

    //sets the event listener towards submit button
    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener("submit", (evt) => { 
            evt.preventDefault();
            this._handleSubmit(evt)
        });
    }

    //connected to getinputvalues function
    _handleSubmit(evt) {
        this._submitForm(this._getInputValues());
    }

    closePopup() {
        super.closePopup();
        this._popup.reset();
    }
}
