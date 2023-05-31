// should only draw the card elements, doesn't have it's own layout, only receives the template array and draws it into DOM

export default class Section {
  constructor( {items, renderer}, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
    this._items = items;
    
  }

  addItem(element, position = "append") {
    if (position === "prepend") {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }

  renderItems() {
    this._items.forEach(this._renderer)
  }

  // renderItems(items, renderer) {
  //   items.forEach((item) => {
  //     const renderedItem = renderer(item); // passing item as an argument to a renderer function
  //     this.addItem(renderedItem);
  //   });
  // }
}
