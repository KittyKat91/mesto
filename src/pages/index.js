import "./index.css";

import Card from "../components/card.js";
import FormValidator from "../components/formValidator.js";
import PopupWithImage from "../components/popupwithimage.js";
import PopupWithForm from "../components/popupwithform.js";
import Section from "../components/section.js";
import UserInfo from "../components/userinfo.js";
import Api from "../components/api.js"


import {
  loadWaiting,
  config,
  newPlaceAdd,
  popupProfileName,
  popupProfileBio,
  popupEditBtn,
  addCardForm,
  editProfileForm,
  initialCards,
  editedProfileAvatar,
  editAvatarForm,
  editAvatarBtn,
} from "../utils/utils.js";
import PopupWithRemoval from "../components/popupwithremoval";


//Api part
const api = new Api ({
  url: "https://mesto.nomoreparties.co/v1/cohort-68",
  headers: {
    authorization: "36b7992f-6c59-46cd-806a-d300b92bc647",
    "content-type": "application/json",
  }
})

//creating initial cards from the server

const cardList = new Section(
  {
    items: [],
    renderer: (item) => {
      renderPlace(item);
    },
  },
  ".places__cards"
);

api.getInitialCards().then((cards) => {
  cards.forEach((card) => {
    renderPlace(card, cardList);
  });
});

const popupRemovePlace = new PopupWithRemoval(".pop-up_place-delete", removePlace);
popupRemovePlace.setEventListeners();

//remove place function to remove place from server
function removePlace (id, placeToRemove, submitBtn) {
  loadWaiting (submitBtn, "Saving...")
    return api
      .removePlace(id)
      .then(()=> {
        placeToRemove.remove();
        popupRemovePlace.close();
      },
        loadWaiting(submitBtn, "Yes")
      )
      .catch(console.err)
}

// remove place popup event listener
const handleRemovePlace = (evt, id) => {
  popupRemovePlace.open(evt.target.closest(".place"), id)
}


const removePlaceButton = document.querySelector(".place__button-delete");
removePlaceButton.addEventListener("click", (evt) => {
  const placeElement = evt.target.closest(".place");
  const placeId = placeElement.dataset.id;
  handleRemovePlace(placeId);
});

//place like and unlike function
function likePlace(id, likes, likeCount) {
  return api
    .likePlace(id)
    .then((data) => {
      likes = data.likes;
      likeCount.textContent = likes.length;
    })
    .catch(console.error);
}

function dislikePlace(id, likes, likeCount) {
  return api
    .dislikePlace(id)
    .then((data) => {
      likes = data.likes;
      likeCount.textContent = likes.length;
    })
    .catch(console.error);
}

//avatar edit handler function 
 const handleAvatarEdit = ({ 'profile__avatar': avatar }, submitBtn) => {
  loadWaiting(submitBtn, 'Saving...');
  api
    .editUserAvatar(avatar)
    .then((outcome) => {
      userInfo.setUserInfo(outcome);
      loadWaiting(submitBtn, 'Сохранить');
      editAvatarPopup.close();
    })
    .catch(console.error);
};

//avatar edit popup and functions
const editAvatarPopup = new PopupWithForm (".pop-up_type_avatar", handleAvatarEdit, editAvatarForm)
editAvatarPopup.setEventListeners();


editAvatarBtn.addEventListener("click", () => {
  editAvatarPopup.open();
  editAvatarValidator.disableSubmitButton;
});


//big img popup
const popupImg = new PopupWithImage(".pop-up_type_image");
popupImg.setEventListeners();


function renderPlace(data, cardList, position = "append") {
  const card = new Card(data, '#place__template', (link, name) => {
    popupImg.open({ name, link });
  });
  const cardElement = card.createNewPlace();
  cardList.addItem(cardElement, position);
  cardList.renderItems(); // Render the updated items
}



//form validators for user and card popup
const editProfileValidator = new FormValidator(config, editProfileForm);
const addCardValidator = new FormValidator(config, addCardForm);
const editAvatarValidator = new FormValidator(config, editAvatarForm);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();
editAvatarValidator.enableValidation();


//prepending new card after submitting
function submitCardHandler({title, url}) { 
  renderPlace({name: title, link: url}, 'prepend');
};

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
  avatarSelector: ".profile__avatar",
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


