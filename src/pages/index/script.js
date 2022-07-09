import {Masonry} from "../../js/masonry.js";

const cls = require("../../js/cls.json");
const responsive = require("../../js/responsive.json");

const gallery = document.querySelector(`.${cls["gallery-list"]}`);

const layout = new Masonry(gallery, responsive);
const delay = 250;

let interval = setTimeout(function fontLoadListener () {
  let hasLoaded = false;

  try {
    hasLoaded = document.fonts.check("16px 'Montserrat'");
  } catch (err) {
    console.info("CSS font loading API error", err);
  }

  interval = setTimeout(fontLoadListener, delay);
  if(hasLoaded) fontLoadedSuccess();
}, delay);

function fontLoadedSuccess() {
  clearTimeout(interval);
  layout.initiate();
}


