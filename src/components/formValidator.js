export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._formSelector = config.formSelector;
    this._fieldSelector = config.fieldSelector;
    this._submitButton = config.submitButton;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorVisible = config.inputErrorVisible;
    this._inputInvalid = config.inputInvalid;
    this._errorClass = config.errorClass;
    this._inputList = Array.from(this._form.querySelectorAll(this._fieldSelector));
    // this.buttonElement = config.submitButtonSelector;
  }

  // shows error message

  _showInputError = (inputElement, errorMessage) => {
    //looking for error input
    console.log(inputElement);
    
    
    const errorElement = this._form.querySelector(`.${inputElement.name}-error`);
    console.log(errorElement);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._inputErrorVisible, this._inputInvalid);
    
  };

  // hides error message

  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`.${inputElement.name}-error`);
    errorElement.classList.remove(this._inputErrorVisible, this._inputInvalid);
    errorElement.textContent = "";
  };

  // checks if specific one input is valid and throws eror message if it is not

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  //Validation function - shall be connected to seteventlisteners
  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListener();
    return this._form;
  }

  //should be connected to input validity check function and toggle button state function
  _setEventListener() {
    this._submitButton = this._form.querySelector(
      this._submitButton
    );
    this._toggleButtonState(this._submitButton);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  disableSubmitButton = () => {
    this._submitButton.setAttribute("disabled", true);
    this._submitButton.classList.add(this.inactiveButtonClass);
  }
  //toggles button to active and inactive

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this._submitButton.removeAttribute("disabled");
      this._submitButton.classList.remove(this._inactiveButtonClass);
    }
  };

  //checks input status of all inputs

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
}
