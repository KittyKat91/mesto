
import  Card  from "../components/card.js";
import  Popup  from "../components/popup.js"
import  formValidator  from "../components/formValidator.js";
import PicturePopup from "../components/picturepopup.js";
import PopupWithForm from "../components/popupwithform.js";
import Section from "../components/section.js";
import UserInfo from "../components/userinfo.js";

import { cardInputs, config, newPlaceAdd, 
  formNewPlace, popupContainerCloseBtn, cardsContainer, popupImgBig, formNewPlaceSubmitButton, 
  placePopupTitle, placePopupLink, popupProfileName, popupProfileBio, editedProfileName, editedProfileBio, popupUser, 
  popupEdit, profileEditFormElement, addCardForm, editProfileForm, placesCard, initialCards } from "../utils/utils.js"

// enableValidation(config);

const editProfileValidator = new formValidator(config, editProfileForm);
const addCardValidator = new formValidator(config, addCardForm);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();


const section = new Section(".places__cards");

section.renderItems(initialCards, (item) => {
  return renderPlace(cardsContainer, item);
});

// rendering initial cards from Card Class
initialCards.forEach((data) => {
  renderPlace(placesCard, data, "after");
});

function renderPlace(container, data, position = "before") {
  const card = new Card({
    data: data,
    handleCardClick: (link, name) => {
      popupImgBig.handleCardClick(link, name);
    }
  });

  const cardElement = card.createNewPlace();

  if (position === "before") {
    container.prepend(cardElement);
  } else {
    container.append(cardElement);
  }
}

// //card edit pop-up
function submitCardHandler(event) {
  event.preventDefault();
  const item = { name: placePopupTitle.value, link: placePopupLink.value };
  placePopupTitle.value = "";
  placePopupLink.value = "";
  renderPlace(cardsContainer, item, "before");
  closePopup(newPlaceForm);
}

const popupAddCard = new PopupWithForm(submitCardHandler, ".pop-up__form_type_addplace");
popupAddCard.setEventListeners();
popupAddCard.openPopup();


const popupImg = new PicturePopup (popupImgBig);
  popupImg.setEventListeners();

const handleCardClick = (name, link) => {
  popupImg.openPopup(name, link)
}

const editProfileInfo = new UserInfo ({
  name: editedProfileName,
  bio: editedProfileBio
})



// const popupEditProfile = new PopupWithForm (".pop-up_type_user");
// popupEditProfile.setEventListeners();

// popupEditProfile.openPopup = () => {
//   const { name, bio } = userInfo.getUserInfo();
//   document.querySelector(".pop-up__input-name").value = name;
//   document.querySelector(".pop-up__input-bio").value = bio;
// };

// const userInfo = new UserInfo(
//   {
//     name: ".pop-up__field-name",
//     bio: ".pop-up__field-bio",
//   }
// )



// //card edit pop-up
// function submitCardHandler(event) {
//   event.preventDefault();
//   const item = { name: placePopupTitle.value, link: placePopupLink.value };
//   placePopupTitle.value = "";
//   placePopupLink.value = "";
//   renderPlace(cardsContainer, item, "before");
//   closePopup(newPlaceForm);
// }

// newPlaceAdd.addEventListener("click", () => {
//   addCardValidator.disableSubmitButton(formNewPlaceSubmitButton, config);
//   openPopup(newPlaceForm);
// });

// formNewPlace.addEventListener("submit", submitCardHandler);

//profile edit form
// function submitEditProfileForm(evt) {
//   evt.preventDefault();
//   editedProfileName.textContent = popupProfileName.value;
//   editedProfileBio.textContent = popupProfileBio.value;
//   closePopup(popupUser);
// }

// //big image closing function
// popupImgBig.addEventListener("click", (evt) => {
//   if (
//     evt.target.classList.contains("pop-up") ||
//     evt.target.classList.contains("pop-up__button-close")
//   ) {
//     closePopup(popupImgBig);
//   }
// });

// newPlaceForm.addEventListener("click", (evt) => {
//   if (
//     evt.target.classList.contains("pop-up") ||
//     evt.target.classList.contains("pop-up__button-close")
//   ) {
//     closePopup(newPlaceForm);
//   }
// });

// popupUser.addEventListener("click", (evt) => {
//   if (
//     evt.target.classList.contains("pop-up") ||
//     evt.target.classList.contains("pop-up__button-close")
//   ) {
//     closePopup(popupUser);
//   }
// });

// profileEditFormElement.addEventListener("submit", submitEditProfileForm);

// popupEdit.addEventListener("click", () => {
//   popupProfileName.value = editedProfileName.textContent;
//   popupProfileBio.value = editedProfileBio.textContent;
//   openPopup(popupUser);
// });


