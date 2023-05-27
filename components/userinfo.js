export default class UserInfo {
  constructor({ nameSelector, bioSelector }) {
    this._nameField = document.querySelector(nameSelector);
    this._bioField = document.querySelector(bioSelector);
  }

  getUserInfo() {
    const userInfoData = {
      name: this._nameField.textContent,
      bio: this._bioField.textContent,
    };
    return userInfoData;
  }

  setUserInfo(name, bio) {
    this._nameField.textContent = name;
    this._bioField.textContent = bio;
  }
}
