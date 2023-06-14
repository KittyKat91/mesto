export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleKeyUpEscape = this._handleKeyUpEscape.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
  }

  open() {
    this._popup.classList.add("pop-up_opened");
    window.addEventListener("keydown", this._handleKeyUpEscape);
  }

  close() {
    this._popup.classList.remove("pop-up_opened");
    window.removeEventListener("keydown", this._handleKeyUpEscape);
  }

  _handleKeyUpEscape(evt) {
    if (evt.key === "Escape") this.close();
  };

  setEventListeners() {
    this._popup.addEventListener("click", this._handleOverlayClose);
  }

  _handleOverlayClose(evt) {
    if (
      evt.target.classList.contains("pop-up__button-close") ||
      evt.target.classList.contains("pop-up_opened")
    )
      this.close();
  }
}
