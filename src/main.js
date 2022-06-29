// import { getDesks } from "./components/desk/desk.js";

import { makeCards } from "./components/basic-card/basic-card.js";

import { appearModalWindows } from "./components/modal-windows/modal-windows";
import { disappearModalWindows } from "./components/modal-windows/modal-windows";

fetch("http://localhost:3000/desks")
  .then((res) => res.json())
  .then((res) => console.log(res));
