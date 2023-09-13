class Section {
  constructor({renderer}, selector) {
    //this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(data) {
    data.forEach(item => {
      this._renderer(item);
    });
  }

  /*renderItems() {
    this._initialArray.forEach(item => {
      this._renderer(item);
    });
  }*/

  addItem(element) {
    this._container.prepend(element);
  }
}

export default Section;