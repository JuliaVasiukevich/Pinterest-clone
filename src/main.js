import { makeCards } from "../src/utils.js";
import { header } from "./components/header/header.js";
import {data } from "./components/basic-card/basic-card.js"
import { generateModalDesk } from "./components/modal-windows/modal-windows";
import { appearModalWindows } from "./components/modal-windows/modal-windows";
import { disappearModalWindows } from "./components/modal-windows/modal-windows";
import {
  modalWindow,
  putMethodForCurrentDesk,
  putMethodForNextDesk,
} from "./components/card_movement/card_movement.js";