
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
  popupEditBtn, profileEditFormElement, addCardForm, editProfileForm, placesCard, initialCards, popupFields } from "../utils/utils.js"

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
  renderPlace(placesCard, data);
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

// card edit pop-up
function submitCardHandler() {
  const item = { name: placePopupTitle.value, link: placePopupLink.value };
  placePopupTitle.value = "";
  placePopupLink.value = "";
  renderPlace(cardsContainer, item, "before");
  popupAddCard.closePopup();
}

const popupAddCard = new PopupWithForm(submitCardHandler, ".pop-up_type_place");
popupAddCard.setEventListeners();

newPlaceAdd.addEventListener ("click", () => {
  popupAddCard.openPopup()
}); 

//profile edit pop-up form

const popupEditProfile = new PopupWithForm(submitProfileHandler, ".pop-up_type_user");
popupEditProfile.setEventListeners();

//indicating and linking arguments
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  bioSelector: ".profile__bio",
});

// const fillUserInfo = (info) => {
//   nameSelector.value = info.name;
//   bioSelector.value = info.bio;
// }

//profile handler function
function submitProfileHandler() {
  const inputValues = userInfo.getUserInfo();
 
  userInfo.setUserInfo(inputValues);
  popupEditProfile.closePopup();
}


//submit function event listener
popupEditBtn.addEventListener("click", () => {
  popupEditProfile.openPopup();
  userInfo.getUserInfo();
  // popupEditProfile.setInputValues({ name, bio });
});
