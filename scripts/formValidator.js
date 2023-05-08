import { config } from "./script.js";


const popupAddCard = document.querySelector(".pop-up_type_place");
const popupEditProfile = document.querySelector(".pop-up_type_user");

console.log(config);

export class formValidator {
  constructor(config, form) {
    this.config = config;
    this.form = form;
    this.formSelector = config.formSelector;
    this.fieldSelector = config.fieldSelector;
    this.submitButtonSelector = config.submitButtonSelector;
    this.inactiveButtonClass = config.inactiveButtonClass;
    this.inputErrorVisible = config.inputErrorVisible;
    this.inputInvalid = config.inputInvalid;
    this.errorClass = config.errorClass;
    this.inputList = Array.from(this.form.querySelectorAll('.pop-up__field'));
    this.buttonElement = config.submitButtonSelector;
    
  }


  //Validation function - shall be connected to seteventlisteners
  enableValidation() {
    this.inputList.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._setEventListener();
    });
   
    return this.inputList;
  }


   //should be connected to input validity check function and toggle button state function
  _setEventListener() {
    this.form.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this.submitButtonSelector);
      });
    });
  }

  //toggles button to active and inactive

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      buttonElement.setAttribute("disabled", true);
      buttonElement.classList.add(this.inactiveButtonClass);
    } else {
      buttonElement.removeAttribute("disabled", true);
      buttonElement.classList.remove(this.inactiveButtonClass);
    }
  };

  //checks input status of all inputs

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

// checks if specific one input is valid and throws eror message if it is not

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }
  

  // shows error message

  _showInputError(inputElement, errorMessage) {
    //looking for error input
    const errorElement = this.form.querySelector(
      `.${inputElement.id}-error`
    );
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.inputErrorVisible, this.inputInvalid);
  }

  // hides error message

  _hideInputError(form, inputElement) {
    const errorElement = form.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(this.inputErrorVisible, this.inputInvalid);
    errorElement.textContent = "";
  }


//enable submit button
_submitButtonEnabled = (buttonElement, config) => {
  buttonElement.removeAttribute("disabled", true);
  buttonElement.classList.remove(config.inactiveButtonClass);
};

}


//disable submit button
export const submitButtonDisabled = (buttonElement, config) => {
  buttonElement.setAttribute("disabled", true);
  buttonElement.classList.add(config.inactiveButtonClass);
  
};

// enableValidation(config);

const editProfileValidator = new formValidator(config, popupEditProfile);
const addCardValidator = new formValidator(config, popupAddCard);

  editProfileValidator.enableValidation();
  addCardValidator.enableValidation();


  //creates aaray from form and fieldset
  //enables validation

  // enableValidation() {
  //   const formList = Array.from(document.querySelectorAll(this.formSelector));

  //   formList.forEach((form) => {
  //     this._setEventListeners(form);
  //   });
  // }


  // _toggleButtonState = (inputElement, buttonElement) => {
  //   if (_hasInvalidInput(inputElement)) {
  //     submitButtonDisabled(buttonElement);
  //   } else {
  //     _submitButtonEnabled(buttonElement);
  //   }
  // };
