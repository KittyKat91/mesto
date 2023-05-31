import "./index.css"

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
} from "../utils/utils.js";

// enableValidation(config);

const editProfileValidator = new FormValidator(config, editProfileForm);
const addCardValidator = new FormValidator(config, addCardForm);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

const section = new Section(".places__cards");

section.renderItems(initialCards, (item) => {
  return renderPlace(cardsContainer, item);
});


function renderPlace(container, data, position = "before") {
  const card = new Card({
    data: data,
    handleCardClick: () => {
      const popupImg = new PopupWithImage(".pop-up_type_image");
      popupImg.open(data);
      popupImg.setEventListeners();
    },
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
  renderPlace(cardsContainer, item, "before");
}

const popupAddCard = new PopupWithForm(submitCardHandler, ".pop-up_type_place");
popupAddCard.setEventListeners();

newPlaceAdd.addEventListener("click", () => {
  popupAddCard.open();
});

// indicating and linking arguments
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  bioSelector: ".profile__bio",
});

function submitProfileHandler(inputValues) {
  userInfo.setUserInfo(inputValues.name, inputValues.bio);
}

const popupEditProfile = new PopupWithForm(
  submitProfileHandler,
  ".pop-up_type_user"
);
popupEditProfile.setEventListeners();

// submit function event listener
popupEditBtn.addEventListener("click", () => {
  popupEditProfile.open();

  const userInfoData = userInfo.getUserInfo();
  popupProfileName.value = userInfoData.name;
  popupProfileBio.value = userInfoData.bio;
});
