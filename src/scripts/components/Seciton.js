export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
   this._items.then(items => {
    items.forEach(item => {
      this._renderer(this._container, item)
    });
   })
    
  }

  addItem(element){
    this._container.prepend(element)
  }
}
