interface Selector {
  nameSelector: string;
  jobSelector: string;
  avatarSelector: string;
}

interface User {
  name?: string;
  about?: string;
  _id?: string;
  avatar?: string;
}

export class UserInfo {
  _name;
  _about;
  _avatar;
  user: { name: string; about: string; id: string; avatar: string };

  constructor({ nameSelector, jobSelector, avatarSelector }: Selector) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector) as HTMLImageElement;
    this.user = { name: "", about: "", id: "", avatar: "" }
  }

  setUserInfo(user: User) {
    if (user.name) {
      this._name.textContent = user.name;
      this.user.name = user.name;
    }
    if (user.about) {
      this._about.textContent = user.about;
      this.user.about = user.about;
    }
    if (user._id) {
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
