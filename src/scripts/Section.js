export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element, place = 'prepend') {
    if (place === 'append') {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems(data) {
    this.clear();

    data.forEach(card => {
      this._renderer(card);
    });
  }
}
