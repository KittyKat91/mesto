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

// enableValidation(config);

const editProfileValidator = new FormValidator(config, editProfileForm);
const addCardValidator = new FormValidator(config, addCardForm);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardList.addItem(renderPlace(cardsContainer, item));
    },
  },
  ".places__cards"
);

cardList.renderItems();

const popupImg = new PopupWithImage(".pop-up_type_image");
popupImg.setEventListeners();

function renderPlace(container, data, position = "before") {
  const card = new Card(data, (link, name) => {
    popupImg.open({ name, link });
    popupImg.setEventListeners();
  });

  const cardElement = card.createNewPlace();

  if (position === "before") {
    container.prepend(cardElement);
  } else {
    container.append(cardElement);
  }
}

//item with values to create new card from popup
const item = {
  name: placePopupTitle.value,
  link: placePopupLink.value,
};

// card edit pop-up submit function
function submitCardHandler() {
  renderPlace(cardsContainer, item, "before");
}

//creating class example and setting event listeners
const popupAddCard = new PopupWithForm(submitCardHandler, ".pop-up_type_place");
popupAddCard.setEventListeners();

newPlaceAdd.addEventListener("click", () => {
  popupAddCard.open();
});

// indicating and linking arguments for user popup
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

// submit function event listener for profile edit button
popupEditBtn.addEventListener("click", () => {
  popupEditProfile.open();

  const userInfoData = userInfo.getUserInfo();
  popupProfileName.value = userInfoData.name;
  popupProfileBio.value = userInfoData.bio;
});
