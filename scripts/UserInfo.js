export default class UserInfo {
  constructor(userNameSelector, userDescriptionSelector) {
    this._name = document.querySelector(userNameSelector);
    this._description = document.querySelector(userDescriptionSelector);
  }

  getUserInfo() {
    return {
      userName: this._name.textContent,
      userDescription: this._description.textContent
    }
  }

  setUserInfo(name, description) {
    this._name.textContent = name;
    this._description.textContent = description;
  }
}
