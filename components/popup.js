
export default class  Popup {
    constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleKeyUpEscape = this._handleKeyUpEscape.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);

    }
    openPopup() {
        this._popup.classList.add("pop-up_opened");
        window.addEventListener("keydown", this._handleKeyUpEscape);
      }

    closePopup() {
        this._popup.classList.remove("pop-up_opened")
        window.removeEventListener("keydown", this._handleKeyUpEscape)
    }

    _handleKeyUpEscape() {
        this._popup.addEventListener("mousedown", (evt) => {
            if (evt.target.classList.contains("pop-up_opened") || evt.key === "Escape") this.closePopup()
    }     
)}
    _setEventListeners() {
        document.addEventListener("mousedown", this._handleKeyUpEscape);
        this._popup.addEventListener("click", this._handleOverlayClose);
    }

    _removeEventListeners(){
        this.document.removeEventListener("mousedown", this._handleKeyUpEscape);
        this._popup.removeEventListener("click", this._handleOverlayClose);
    }

    _handleOverlayClose() {
        if (evt.target.classList.contains("pop-up__button-close") || evt.target.classList.contains("pop-up_opened"))
        this.closePopup();
    }
}

