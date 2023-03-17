export class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this.user = {};
  }

  getUserInfo() {
    this.user.name = this._name.textContent;
    this.user.job = this._job.textContent;
    return this.user;
  }

  setUserInfo({ name, job }) {
    this._name.textContent = name;
    this._job.textContent = job;
  }
}
