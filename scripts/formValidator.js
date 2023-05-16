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
    this.inputList = Array.from(this.form.querySelectorAll(this.fieldSelector));
    // this.buttonElement = config.submitButtonSelector;
  }

  // shows error message

  _showInputError = (inputElement, errorMessage) => {
    //looking for error input
    const errorElement = this.form.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.inputErrorVisible, this.inputInvalid);
  };

  // hides error message

  _hideInputError = (inputElement) => {
    const errorElement = this.form.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(this.inputErrorVisible, this.inputInvalid);
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
    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListener();
    return this.form;
  }

  //should be connected to input validity check function and toggle button state function
  _setEventListener() {
    this.submitButtonSelector = this.form.querySelector(
      this.submitButtonSelector
    );
    this._toggleButtonState(this.submitButtonSelector);
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
  //toggles button to active and inactive

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this.submitButtonSelector.setAttribute("disabled", true);
      this.submitButtonSelector.classList.add(this.inactiveButtonClass);
    } else {
      this.submitButtonSelector.removeAttribute("disabled");
      this.submitButtonSelector.classList.remove(this.inactiveButtonClass);
    }
  };

  //checks input status of all inputs

  _hasInvalidInput = () => {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  //disable submit button
  disableSubmitButton = (buttonElement, config) => {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add(config.inactiveButtonClass);
  };
}
