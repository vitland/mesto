export class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
    this.user = {};
  }

  setUserInfo(user) {
    if (user.name) {
      this._name.textContent = user.name;
      this.user.name = user.name;
    }
    if (user.about) {
      this._about.textContent = user.about;
      this.user.about = user.about;
    }
    if (user._id) {
      this._id = user._id;
      this.user.id = user._id;
    }
    if (user.avatar) {
      this._avatar.src = user.avatar;
      this.user.avatar = user.avatar;
    }
  }

  getUserInfo() {
    return this.user;
  }
}
