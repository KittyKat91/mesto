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

  _getInputValues() {
    //creating empty object
    const formInputs = {};
    //creating array from the input fields
    this._inputList.forEach((inputElement) => {
      formInputs[inputElement.id] = inputElement.value;
    });

    return formInputs;

  }

  
  async handleSubmit(evt) {
    evt.preventDefault();
    const initialText = this._submitBtn.textContent;
    
    try {
      this._submitBtn.textContent = "Сохранение...";
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
      await this._handleSubmit(this._getInputValues());
      this.close(); 
    } catch (error) {
      console.error(error);
    } finally {
      this._submitBtn.textContent = initialText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this.handleSubmit.bind(this));
  }
  close() {
    super.close();
    this._popupForm.reset();
  }
}

  