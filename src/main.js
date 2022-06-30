// import { getDesks } from "./components/desk/desk.js";

import { makeCards } from "./components/basic-card/basic-card.js";
import { header } from "./components/header/header.js";
import { generateModalDesk } from "./components/modal-windows/modal-windows";
import { appearModalWindows } from "./components/modal-windows/modal-windows";
import { disappearModalWindows } from "./components/modal-windows/modal-windows";
// import {
//   modalWindow,
//   putMethodForCurrentDesk,
//   putMethodForNextDesk,
// } from "./components/card_movement/card_movement.js";

fetch("http://localhost:3000/desks")
  .then((res) => res.json())
  .then((res) => console.log(res));
