

export default class UserInfo {
  constructor({ nameSelector, bioSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._bioElement = document.querySelector(bioSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
    this.userId = null;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      bio: this._bioElement.textContent,
      avatar: this._avatarSelector.src,
      userId: this._avatarSelector.src,
    };
  }

  setUserInfo( name, bio, avatar ) {
    this._nameElement.textContent = name;
    this._bioElement.textContent = bio;
    this._avatarSelector.src = avatar;
  }

  setUserAvatar(avatar) {
    this._avatarSelector = avatar;
  }

  getUserAatar() {
    return this._avatarSelector;
  }

  setUserId(userId) {
    this.userId = userId
  }
  getUserId() {
   return this.userId
  }
}

