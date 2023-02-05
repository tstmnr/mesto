export default class UserInfo {
  constructor(userNameSelector, userDescriptionSelector, userAvatarSelector) {
    this._name = document.querySelector(userNameSelector);
    this._description = document.querySelector(userDescriptionSelector);
    this._avatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      userName: this._name.textContent,
      userDescription: this._description.textContent
    }
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._description.textContent = data.about;
  }

  setAvatar(avatar) {
    this._avatar.style.backgroundImage = `url(${avatar})`;
  }
}
