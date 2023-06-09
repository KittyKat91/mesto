//inputs of the card
const cardInputs = {
  place: ".place",
  placeimg: ".place__img", //image of the place
  placeBigImage: ".pop-up_type_image",
  popupImage: ".pop-up__photo",
  popupImageText: ".pop-up__caption",
  imgPopupCaption: ".pop-up__caption", //big image text
  placename: ".place__title", //the name of the place
  placetemplate: "#place__template",
  placeDeleteBtn: ".place__button-delete",
  placecardList: ".places__cards", //ul
  placeLikeBtn: ".place__like-button",
  placeLikeBtnActive: ".place__like-button_active", //liked button
};

const config = {
  formSelector: ".pop-up__form",
  fieldSelector: ".pop-up__field",
  submitButton: '[type="submit"]',
  inactiveButtonClass: "button_inactive",
  inputErrorVisible: "pop-up__field-error_visible",
  inputInvalid: "pop-up__field_invalid",
  errorClass: "pop-up__field-error",
};

const newPlaceAdd = document.querySelector(".profile__add-button"); //plus button 
const popupContainerCloseBtn = document.querySelector(
  ".pop-up__container-button-close"
); //close button
const placeImg = document.querySelector(".place__img")
const cardsContainer = document.querySelector(cardInputs.placecardList);
const popupImgBig = document.querySelector(cardInputs.placeBigImage);
const formNewPlace = document.querySelector(".pop-up__form_type_addplace");
const formNewPlaceSubmitButton = formNewPlace.querySelector(
  ".pop-up__button-submit"
);
const placePopupTitle = document.querySelector(".pop-up__field-title");
const placePopupLink = document.querySelector(".pop-up__field-link");
const popupProfileName = document.querySelector(".pop-up__field-name");
const popupProfileBio = document.querySelector(".pop-up__field-bio");
const editedProfileName = document.querySelector(".profile__name");
const editedProfileBio = document.querySelector(".profile__bio");
const editedProfileAvatar = document.querySelector(".profile__avatar")
const popupUser = document.querySelector(".pop-up_type_user");
const popupEditBtn = document.querySelector(".profile__edit-button");
const popupFields = document.querySelectorAll(".pop-up__field");
const profileEditFormElement = document.querySelector(".pop-up__submitform");
const addCardForm = document.querySelector(".pop-up_type_place .pop-up__form");
const editProfileForm = document.querySelector(
  ".pop-up_type_user .pop-up__form"
);
const editAvatarForm = document.querySelector(".pop-up_type_avatar .pop-up__form");
const editAvatarBtn = document.querySelector(".profile__avatar-hover");
const placesCard = document.querySelector(".places__cards");

//cards to be loaded on the page
// const initialCards = [
//   {
//     name: "Архыз",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
//   },
//   {
//     name: "Челябинская область",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
//   },
//   {
//     name: "Иваново",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
//   },
//   {
//     name: "Камчатка",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
//   },
//   {
//     name: "Холмогорский район",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
//   },
//   {
//     name: "Байкал",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
//   },
// ];

const loadWaiting = (btn, textValue) => 
  {btn.textContent = textValue};

export {
  loadWaiting,
  editAvatarBtn,
  cardInputs,
  config,
  newPlaceAdd,
  formNewPlace,
  popupContainerCloseBtn,
  cardsContainer,
  popupImgBig,
  formNewPlaceSubmitButton,
  placePopupTitle,
  placePopupLink,
  popupProfileName,
  popupProfileBio,
  editedProfileName,
  editedProfileBio,
  editedProfileAvatar,
  popupUser,
  popupEditBtn,
  profileEditFormElement,
  addCardForm,
  editProfileForm,
  placesCard,
  placeImg,
  popupFields,
  editAvatarForm,
};
