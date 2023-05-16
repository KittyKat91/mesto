//esc and overlay click close pop-up
export function handleKeyUpEscape(evt) {
  const popupOpened = document.querySelector(".pop-up_opened");
  if (popupOpened && evt.key === "Escape") {
    closePopup(popupOpened);
  }
}

export function openPopup(modal) {
  modal.classList.add("pop-up_opened");
  document.addEventListener("keydown", handleKeyUpEscape);
}

export function closePopup(modal) {
  modal.classList.remove("pop-up_opened");
  document.removeEventListener("keydown", handleKeyUpEscape);
}
