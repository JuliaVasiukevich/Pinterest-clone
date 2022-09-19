import {
  makeCards
} from "../../utils.js";
import {
  API_URL
} from "../../utils.js"

let firstDesk;
export const data = fetch(`${API_URL}/desks`)
  .then((res) => res.json())
  .then((res) => {
    firstDesk = res.data[0];

    if (localStorage.length > 1) {
      let json = localStorage.getItem("desk");
      let deskAfterReboot = JSON.parse(json);
      makeCards(deskAfterReboot);
    } else {
      makeCards(firstDesk);
      json = JSON.stringify(firstDesk);
      localStorage.setItem("desk", json);
    }
  });