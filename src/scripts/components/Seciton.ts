interface Place {
  _id: string;
  name: string;
  link: string;
  owner: {
    _id: string
  };
  likes: {
    _id: string
  }[];
}

export class Section {
  _renderer;
  _container;



  constructor(renderer: (container: Element, place: Place) => void, containerSelector: string) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items: Place[]) {
    items.forEach(item => {
      this._renderer(this._container, item)
    });

  }

  addItem(element: Element) {
    this._container.prepend(element)
  }
}
