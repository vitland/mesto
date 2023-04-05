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
    }
    if (user.about) {
      this._about.textContent = user.about;
    }
    if (user._id) {
      this._id = user._id;
    }
    if (user.avatar) {
      this._avatar.src = user.avatar;
    }
  }

  getUserInfo(user) {
    this.user.name = user.name;
    this.user.about = user.about;
    this.user.avatar = user.avatar;
    this.user.id = user._id;
    return this.user;
  }
}
