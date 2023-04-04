export class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
    this.user = {};
  }

  setUserInfo(user) {
      this._name.textContent = user.name;
      this._about.textContent = user.about;
      this._avatar.src = user.avatar;
      this._id = user._id;
  }

  getUserInfo(user) {
    this.user.name = user.name;
    this.user.about = user.about;
    this.user.avatar = user.avatar;
    this.user.id = user._id;
    return this.user;
  }

  editUserInfo({ name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;
  }

  editUserAvatar({avatar}) {
    this._avatar.src = avatar;
  }
}
