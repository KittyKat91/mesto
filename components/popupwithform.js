
import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor(handleSubmit, popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector(".pop-up__form");
    this._submitBtn = this._popup.querySelector(".pop-up__button-submit");
    this._inputList = Array.from(
      this._popup.querySelectorAll(".pop-up__field")
    );
    this._handleSubmit = handleSubmit.bind(this);
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
    
    this._submitForm(this.getInputValues())

  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }

  closePopup() {
    super.closePopup();
    this._popupForm.reset();
  }
}


// import Popup from "./popup.js";

// export default class PopupWithForm extends Popup {
//   constructor(handleSubmit, popupSelector) {
//     super(popupSelector);
//     this._popupForm = this._popup.querySelector(".pop-up__form");
//     this._submitBtn = this._popup.querySelector(".pop-up__button-submit");
//     this._inputList = Array.from(
//       this._popup.querySelectorAll(".pop-up__field")
//     );
//     this._handleSubmit = handleSubmit.bind(this);
//   }

//   //collects the inputs made by user
//   _getInputValues() {
//     this._formInputs = {};

//     this._inputList.forEach((inputElement) => {
//       this._formInputs[inputElement.name] = inputElement.value;
//     });

//     return this._formInputs;
//     // return this._inputList.forEach(inputElement => inputElement.value);
//   }

//   //sets the event listener towards submit button
//   setEventListeners() {
//     super.setEventListeners();
//     this._popupForm.addEventListener("submit", (evt) => {
//       evt.preventDefault();
//       this._handleSubmit(this._getInputValues());
//     });
//   }

// //   connected to getinputvalues function
//   _handleSubmit(evt) {
//       evt.preventDefault();
//       const inputValues = this._getInputValues();
//       this._popupForm(inputValues);
//     }

//   closePopup() {
//     super.closePopup();
//     this._popupForm.reset();
//   }
// }
