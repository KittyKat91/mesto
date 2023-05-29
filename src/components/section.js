// should only draw the card elements, doesn't have it's own layout, only receives the template array and draws it into DOM

export default class Section {
  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector);
  }

  addItem(element, position = "append") {
    if (position === "prepend") {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }

  renderItems(items, renderer) {
    items.forEach((item) => {
      const renderedItem = renderer(item); // passing item as an argument to a renderer function
      this.addItem(renderedItem);
    });
  }
}
