export class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
    this.user = {};
  }

  setUserInfo(data) {
    data.then((user) => {
      this._name.textContent = user.name;
      this._about.textContent = user.about;
      this._avatar.src = user.avatar;
      this._id = user._id;
    });
  }

  getUserInfo() {
    this.user.name = this._name.textContent;
    this.user.about = this._about.textContent;
    this.user.avatar = this._avatar.src;
    this.user.id = this._id;
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
