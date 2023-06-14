const HandleDeleteCard = (card) => {
    popupConfirm.open();
    popupConfirm.handleButton(() => {
        api.deleteCard(card.id())
            .then((data) => {
                card.deleteElement(data)
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupConfirm.close();
            })
    })
}

const popupEditProfile = new PopupWithForm({
    handleFormSubmit: ({ userJob, userName }) => {
        popupEditProfile.loading(true);
        api.setUserInfo({
            name: userName,
            about: userJob
        })
            .then((result) => {
                userProfile.setUserInfo(result.name, result.about)

            })
            .catch((error) => console.error(error))
            .finally(() => {
                popupEditProfile.loading(false);
                popupEditProfile.close();
            })
    }
}, popupEditProfileSelector)

popupEditProfile.setEventListeners();

const popupAvatar = new PopupWithForm({
    handleFormSubmit: ({ link }) => {
        api.setUserAvatar({ avatar: link })
            .then((res) => {

                avatarImage.src = res.avatar;
            })
            .catch(err => console.log(err))
            .finally(() => {
                popupAvatar.loading(false);
                popupAvatar.close();
            })
    }
}, popupAvatarProfileSelector)

popupAvatar.setEventListeners();

api.getUserInfo()
    .then((result) => {
        userProfile.setUserAvatar(result.avatar);
    })

    let myId = {}; // Создаем объект для данных профиля

Promise.all([
    api.getCards(), // Запрашиваем массив карточек с сервера
    api.getId() // Запрашиваем данные юзера
])
.then(([cards, user]) => {
    myId = user; // наполняем объект свойствами
    cards.reverse().forEach((card) => cardsList.renderCard(card));
    userInfo.setUserInfo(user);
})

const cardObj = { // объект с параметрами создания экземпляров класса Card 
    templateSelector: 'element',
    openDeletePopup: popupDelete,
    handleCardClick: (card) => { // Функция открытия фото в попапе
            popupImage.open(card);
        },
    handleLike: async (notLiked, card) => { // Функция клика по лайкам
        try {
            if(notLiked) {
                return await api.putLike(card._id);
            } else {
                return await api.deleteLike(card._id);
            }
        } catch(err) {
            console.log(err);
        }
    }
}

const cardsList = new Section('.elements__list', (cardItem) => {
    const newCard = new Card(cardItem, myId, cardObj);
    return newCard.createCard();
});
