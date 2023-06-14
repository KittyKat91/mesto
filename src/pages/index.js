import "./index.css";

import Card from "../components/card.js";
import FormValidator from "../components/formValidator.js";
import PopupWithImage from "../components/popupwithimage.js";
import PopupWithForm from "../components/popupwithform.js";
import PopupWithRemoval from "../components/popupwithremoval";
import Section from "../components/section.js";
import UserInfo from "../components/userinfo.js";
import Api from "../components/api.js";

import {
  config,
  newPlaceAdd,
  popupProfileName,
  popupProfileBio,
  popupEditBtn,
  addCardForm,
  editProfileForm,
  btnDeleteSubmit,
  initialCards,
  editedProfileAvatar,
  editAvatarForm,
  editAvatarBtn,
} from "../utils/utils.js";

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-68",
  headers: {
    authorization: "36b7992f-6c59-46cd-806a-d300b92bc647",
    "content-type": "application/json",
  },
});

api.getUserData().then((data) => {
  console.dir(data);
});

function fetchAndSetUserInfo(api, userInfo) {
  api
    .getUserData()
    .then((data) => {
      const { name, about, avatar, _id } = data;
      userInfo.setUserInfo({ name, about, avatar });
      userInfo.setUserId(_id);
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
}

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  bioSelector: ".profile__bio",
  avatarSelector: ".profile__avatar",
});

fetchAndSetUserInfo(api, userInfo);

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

const popupRemovePlace = new PopupWithRemoval(".pop-up_place-delete");
popupRemovePlace.setEventListeners();

const handleRemovePlace = (card) => {
  popupRemovePlace.setDeleteAction(() => {
    api
      .removePlace(card._id)
      .then((res) => {
        card.deleteCard();
        console.log(res);
        popupRemovePlace.close();
      })
      .catch(() => {
        console.log("Ошибка удаления");
      });
  });
  popupRemovePlace.open();
};

// like and dislike functions
function likePlace(card) {
  api
    .likePlace(card._id)
    .then((data) => {
      card._updateLikes(data.likes);
    })
    .catch(console.error);
}

function dislikePlace(card) {
  api
    .dislikePlace(card._id)
    .then((data) => {
      card._updateLikes(data.likes);
    })
    .catch(console.error);
}

const popupImg = new PopupWithImage(".pop-up_type_image");
popupImg.setEventListeners();

function renderPlace(data, cardList, position = "append") {
  const userId = userInfo.getUserId();

  const card = new Card(
    data,
    "#place__template",
    { likePlace, dislikePlace, deletePlace: handleRemovePlace },
    (link, name) => {
      popupImg.open({ name, link });
    },
    userId
  );

  const cardElement = card.createNewPlace();
  cardList.addItem(cardElement, position);
  cardList.renderItems();

}

// validators
const editProfileValidator = new FormValidator(config, editProfileForm);
const addCardValidator = new FormValidator(config, addCardForm);
const editAvatarValidator = new FormValidator(config, editAvatarForm);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();
editAvatarValidator.enableValidation();

// new card submit handler, form and event listener
function submitCardHandler(data) {
  api
    .addNewPlace({ name: data.title, link: data.url })
    .then((res) => res.json())
    .then((body) => {
      console.log(body);

      renderPlace(body, cardList, "prepend");
    });
}

const popupAddCard = new PopupWithForm(submitCardHandler, ".pop-up_type_place");
popupAddCard.setEventListeners();

newPlaceAdd.addEventListener("click", () => {
  popupAddCard.open();
  addCardValidator.disableSubmitButton();
});

// profile info handler, form and event listeners
function submitProfileHandler(inputValues) {
  api
    .setUserData({ name: inputValues.name, about: inputValues.bio })
    .then((outcome) => {
      userInfo.setUserInfo(outcome);
    })
    .catch((error) => {
      console.error(error);
    });
}

const popupEditProfile = new PopupWithForm(
  submitProfileHandler,
  ".pop-up_type_user"
);
popupEditProfile.setEventListeners();

popupEditBtn.addEventListener("click", () => {
  popupEditProfile.open();

  const userInfoData = userInfo.getUserInfo();
  popupProfileName.value = userInfoData.name;
  popupProfileBio.value = userInfoData.bio;
});

// avatar functions
const handleAvatarEdit = (data) => {
  console.log(data);

  const link = data.url;

  api
    .editUserAvatar(link)
    .then((res) => {
      userInfo.setUserInfo(res);
      editAvatarPopup.close();
    })
    .catch((error) => {
      console.error(error);
    });
};

const editAvatarPopup = new PopupWithForm(
  handleAvatarEdit,
  ".pop-up_type_avatar"
);
editAvatarPopup.setEventListeners();

editAvatarBtn.addEventListener("click", () => {
  editAvatarPopup.open();
});
