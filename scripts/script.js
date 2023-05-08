import { Card } from "./card.js";
import { submitButtonDisabled } from "./formValidator.js";
import { formValidator } from "./formValidator.js";

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
    placedeleteBtn: ".place__button-delete",
    placecardList: ".places__cards", //ul
    placeLikeBtn: ".place__like-button",
    placeLikeBtnActive: ".place__like-button_active", //liked button
};

export const config = {
    formSelector: '.pop-up__form',
    fieldSelector: '.pop-up__field',
    submitButtonSelector: '[type="submit"]',
    inactiveButtonClass: 'button_inactive',
    inputErrorVisible: 'pop-up__field-error_visible',
    inputInvalid: 'pop-up__field_invalid',
    errorClass: 'pop-up__field-error',
  };


    

const newPlaceAdd = document.querySelector(".profile__add-button"); //plus button
const newPlaceForm = document.querySelector(".pop-up_type_place"); //new place pop-up form
const popupContainerCloseBtn = document.querySelector(
    ".pop-up__container-button-close"
); //close button

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
const popupUser = document.querySelector(".pop-up_type_user");
const popupEdit = document.querySelector(".profile__edit-button");

const userPopupCloseButton = document.querySelector(".pop-up__button-close");

const profileEditFormElement = document.querySelector(".pop-up__submitform");




//cards to be loaded on the page
const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

function handleKeyUpEscape(evt) {
    if (evt.key === "Escape") {
        closeActivePopup();
    }
}

function openPopup(modal) {
    modal.classList.add("pop-up_opened");
    document.addEventListener("keydown", handleKeyUpEscape);
}

function closePopup(modal) {
    modal.classList.remove("pop-up_opened");
    document.removeEventListener("keydown", handleKeyUpEscape);
}

// rendering new cards from Card Class
initialCards.forEach((item) => {
    const card = new Card(item.link, item.name, cardInputs );
    const cardElement = card.createNewPlace();
    document.querySelector('.places__cards').append(cardElement);
    
})

//profile edit form
function submitFormHandler(evt) {
    evt.preventDefault();
    editedProfileName.textContent = popupProfileName.value;
    editedProfileBio.textContent = popupProfileBio.value;
    closePopup(popupUser);
}

//card edit pop-up
function submitCardHandler(event) {
    event.preventDefault();
    
    const item = { name: placePopupTitle.value, link: placePopupLink.value };
    placePopupTitle.value = "";
    placePopupLink.value = "";
    renderPlace(cardsContainer, item, "before");
    closePopup(newPlaceForm);
}


newPlaceAdd.addEventListener ("click", () => {
    submitButtonDisabled(formNewPlaceSubmitButton, config);
    openPopup(newPlaceForm);
});

formNewPlace.addEventListener("submit", submitCardHandler);

//close function event listeners
function closePopupOverlay(evt) {
    if (
        evt.target.classList.contains("pop-up") ||
        evt.target.classList.contains("pop-up__button-close")
    ) {
        closeActivePopup();
    }
}

const popups = document.querySelectorAll('.pop-up');
popups.forEach((popup) => {
    popup.addEventListener('click', closePopupOverlay)
})

popupImgBig.addEventListener("click", (evt) => {
    if (
        evt.target.classList.contains("pop-up") ||
        evt.target.classList.contains("pop-up__button-close")
    ) {
        closePopup(popupImgBig);
    }
});

newPlaceForm.addEventListener("click", (evt) => {
    if (
        evt.target.classList.contains("pop-up") ||
        evt.target.classList.contains("pop-up__button-close")
    ) {
        closePopup(newPlaceForm);
    }
} 
);

popupUser.addEventListener("click", (evt) => {
    if (
        evt.target.classList.contains("pop-up") ||
        evt.target.classList.contains("pop-up__button-close")
    ) {
        closePopup(popupUser);
    }
});

profileEditFormElement.addEventListener("submit", submitFormHandler);

popupEdit.addEventListener("click", () => {
    popupProfileName.value = editedProfileName.textContent;
    popupProfileBio.value = editedProfileBio.textContent;
    openPopup(popupUser);
});

//esc and overlay click close pop-up

document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
        closePopup();
    }
});


function closeActivePopup() {
    const popupOpened = document.querySelector(".pop-up_opened");
    if(popupOpened) {
    closePopup(popupOpened);
    }
}





