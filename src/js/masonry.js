import {debounce} from "./helper.js";

const cls = require("./cls.json");

export class Masonry {
  constructor(container, settings = {}) {
    this.container = container;
    this.settings = settings;

    this.children = null;
    this.childrenData = null;
    this.settingSizes = null;

    this.setParameters = this.setParameters.bind(this);
  }

  initiate() {
    this.children = Array.from(this.container.children);
    this.childrenData = Array.from(this.children).map((child) => ({element: child}));

    this.settingSizes =
      Object.keys(this.settings["responsive"]).map((item) => Number(item)).sort((a, b) => a - b);

    this.setEvents();
    this.setParameters();
  }

  masonryActive() {
    this.container.classList.add(cls.active);
  }

  setEvents() {
    window.addEventListener("resize", debounce(this.setParameters, 200));
  }

  setParameters() {
    this.setCurrentSettings(document.documentElement.clientWidth);

    document.querySelector(`.${cls["page-header"]}`).style.padding = `0 ${this.settings.gap}px`;
    document.querySelector(`.${cls.main}`).style.padding = `0 ${this.settings.gap}px`;

    const itemWidth = (this.container.offsetWidth - this.settings.gap * (this.settings.columns - 1)) / this.settings.columns;
    this.setWidth(itemWidth);

    this.setCardContentPadding();

    this.childrenData = this.childrenData.map((child) => ({
      ...child,
      height: child.element.offsetHeight,
      width: child.element.offsetWidth,
    }));

    this.setSizeContainer();
    this.setPosition(itemWidth);
    this.masonryActive();
  }

  setCurrentSettings(width) {
    let currentSize = 0;
    this.settingSizes.forEach((size) => {
      if(width >= size) currentSize = size;
    });

    this.settings.columns = this.settings["responsive"][currentSize].columns;
    this.settings.gap = this.settings["responsive"][currentSize].gap;
  }

  setWidth(width) {
    this.children.forEach((child) => child.firstChild.style.width = `${width}px`);
  }

  setSizeContainer() {
    const columnsHeight = new Array(this.settings.columns).fill(0);

    this.childrenData.forEach((child, index) => {
      columnsHeight[index % this.settings.columns] += child.height + this.settings.gap;
    });

    const maxHeight = columnsHeight.reduce((acc, size) => (size > acc) ? size : acc);

    this.container.style.minHeight = `${maxHeight - this.settings.gap}px`;
  }

  setPosition(itemWidth) {
    const topSets = new Array(this.settings.columns).fill(0);

    this.childrenData = this.childrenData.map((child, index) => {
      const columnIndex = index % this.settings.columns;
      const left = columnIndex * itemWidth + this.settings.gap * columnIndex;
      const top = topSets[columnIndex];
      topSets[columnIndex] += child.height + this.settings.gap;

      return {...child, left, top};
    });

    this.childrenData.forEach((child) => {
      child.element.style.transform = `translate3d(${child.left}px, ${child.top}px, 0)`;
    });
  }

  setCardContentPadding() {
    this.childrenData = this.childrenData.map((child) => {
      const gap = this.settings.gap;

      return {...child, gap};
    });

    this.childrenData.forEach((child) => {
      child.element.querySelector(`.${cls["card-content"]}`).style.padding = `${child.gap}px`;
    });
  }
}
