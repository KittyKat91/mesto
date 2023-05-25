
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
  popupEditBtn, profileEditFormElement, addCardForm, editProfileForm, placesCard, initialCards } from "../utils/utils.js"

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
    handleCardClick: () => {
      const popupImg = new PicturePopup (".pop-up_type_image")
      popupImg.openPopup(data);
      popupImg.setEventListeners();
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
function submitCardHandler() {
  const item = { name: placePopupTitle.value, link: placePopupLink.value };
  placePopupTitle.value = "";
  placePopupLink.value = "";
  renderPlace(cardsContainer, item, "before");
  closePopup();
}

const popupAddCard = new PopupWithForm(submitCardHandler, ".pop-up_type_place");
popupAddCard.setEventListeners();

// newPlaceAdd.addEventListener ("click", () => ); 

const userInfo = new UserInfo ({
  name: editedProfileName,
  bio: editedProfileBio
})
userInfo.setEventListeners();


popupEditBtn.addEventListener("click", () => {
  updateProfile();
  openPopup();
})

function updateProfile () {
  const profileEditInputs = userInfo.getUserInfo();
  editedProfileName.value = profileEditInputs.name;
  editedProfileBio.value = profileEditInputs.bio;

}


const popupEditProfile = new PopupWithForm (".pop-up_type_user");
popupEditProfile.setEventListeners();

popupEditProfile.openPopup = () => {
  const { name, bio } = userInfo.getUserInfo();
  document.querySelector(".pop-up__input-name").value = name;
  document.querySelector(".pop-up__input-bio").value = bio;
};




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


// profileEditFormElement.addEventListener("submit", submitEditProfileForm);

// popupEdit.addEventListener("click", () => {
//   popupProfileName.value = editedProfileName.textContent;
//   popupProfileBio.value = editedProfileBio.textContent;
//   openPopup(popupUser);
// });


