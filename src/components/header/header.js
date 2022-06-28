//import { getDesks } from "../desk/desk.js";

const search = document.querySelector(".header__search");
search.addEventListener("keydown", (event) => {
  if (search.value === "") return;

  if (event.key == "Enter") {
    console.log("input is working!");
    console.log(search.value);
    //searchCards(search.value, cardsInfo);
    //renderDesk();
    search.value = "";
  }
});

// function searchCards(keyword, data) {
//   for (let item of data["pictures"]) {
//     if (keyword === item.description) console.log("TADAAAAAAAA");
//   }
// }
