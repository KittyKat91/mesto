// export default class UserInfo {
//   constructor({ nameSelector, bioSelector }) {
//     this._name = document.querySelector(nameSelector);
//     this._bio = document.querySelector(bioSelector);
//   }

//   getUserInfo() {
//     const userInfoData = {
//       name: this._name.textContent,
//       bio: this._bio.textContent,
//     };
//     return userInfoData;
//   }

//   setUserInfo(name, bio) {
//     this._name.textContent = name;
//     this._bio.textContent = bio;
//   }
// }

export default class UserInfo {
  constructor({ nameSelector, bioSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._bioElement = document.querySelector(bioSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.value,
      bio: this._bioElement.value,
    };
  }

  setUserInfo({ name, bio }) {
    this._nameElement.value = name;
    this._bioElement.value = bio;
  }
}

