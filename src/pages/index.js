import "./index.css";

import Card from "../components/card.js";
import FormValidator from "../components/formValidator.js";
import PopupWithImage from "../components/popupwithimage.js";
import PopupWithForm from "../components/popupwithform.js";
import Section from "../components/section.js";
import UserInfo from "../components/userinfo.js";

import {
  config,
  newPlaceAdd,
  cardsContainer,
  placePopupTitle,
  placePopupLink,
  popupProfileName,
  popupProfileBio,
  popupEditBtn,
  addCardForm,
  editProfileForm,
  initialCards,
  placeImg,
} from "../utils/utils.js";


//form validators for user and card popup
const editProfileValidator = new FormValidator(config, editProfileForm);
const addCardValidator = new FormValidator(config, addCardForm);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();


//new section for initial card rendering 
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      renderPlace(item);
    },
  },
  ".places__cards"
);

cardList.renderItems();

const popupImg = new PopupWithImage(".pop-up_type_image");
popupImg.setEventListeners();


function renderPlace(data, position = "append") {
  const card = new Card(data, '#place__template', (link, name) => {
    popupImg.open({ name, link });
  });
  const cardElement = card.createNewPlace();
  cardList.addItem(cardElement, position);
}

//prepending new card after submitting
function submitCardHandler(inputValues) {
  renderPlace(inputValues, 'prepend');
}

//card adding popup
const popupAddCard = new PopupWithForm(submitCardHandler, ".pop-up_type_place");
popupAddCard.setEventListeners();

newPlaceAdd.addEventListener("click", () => {
  popupAddCard.open();
  addCardValidator.disableSubmitButton();
});

//getting user info fields
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  bioSelector: ".profile__bio",
});

//editing profile
function submitProfileHandler(inputValues) {
  userInfo.setUserInfo(inputValues.name, inputValues.bio);
}

const popupEditProfile = new PopupWithForm(
  submitProfileHandler,
  ".pop-up_type_user"
);
popupEditProfile.setEventListeners();

//profile edit button listener
popupEditBtn.addEventListener("click", () => {
  popupEditProfile.open();

  const userInfoData = userInfo.getUserInfo();
  popupProfileName.value = userInfoData.name;
  popupProfileBio.value = userInfoData.bio;
});
