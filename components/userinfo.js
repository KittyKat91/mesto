

export default class UserInfo {
    constructor({name, bio}) {
    this._name = document.querySelector(name);
    this._bio = document.querySelector(bio);
    }

    getUserInfo() {
        const userInfoData = {
            name: this._name.textContent,
            bio: this._bio.textContent,
        }
        return userInfoData;
    }

    setUserInfo({name, bio}) {
        this._name.textContent = name;
        this._bio.textContent = bio;

    }

}