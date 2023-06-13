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
        popupAvatar.loading(true);
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