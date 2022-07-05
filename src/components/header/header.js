import { makeCards } from "../basic-card/basic-card.js";
import { make } from "../../utils.js";

export function header() {
  const theme = document.body.querySelector(".theme__checkbox");
  theme.addEventListener("click", () => {
    themed();
  });

  function save() {
    localStorage.setItem("theme", theme.checked);
  }

  let checked = JSON.parse(localStorage.getItem("theme"));
  theme.checked = checked;
  window.addEventListener("change", save);
}

header();
themed();

function themed() {
  const theme = document.body.querySelector(".theme__checkbox");
  const html = document.getElementById("pop");
  if (theme.checked) {
    // html.classList.toggle("theme-light");
    html.classList.add("theme-dark");
    html.classList.remove("theme-light");
  } else {
    html.classList.add("theme-light");
    html.classList.remove("theme-dark");
  }
}

const search = document.querySelector(".header__searchbar");

let arrayOfAllCards;

async function fetchArrayOfCards() {
  const response = await fetch("http://localhost:3000/desks")
    .then((res) => res.json())
    .then((res) => {
      return (arrayOfAllCards = res.data);
    });
}
fetchArrayOfCards();

function getDeskIdFromLocalStorage() {
  let json = localStorage.getItem("desk");
  let idExtended = JSON.parse(json)["_id"];

  for (let object in arrayOfAllCards) {
    if (arrayOfAllCards[object]["_id"] === idExtended) {
      return object;
    }
  }
}

export function clearDesk() {
  let desk = document.querySelector(".grid");
  desk.innerHTML = "";
}

function searchCards(keyword) {
  let currentDeskId = getDeskIdFromLocalStorage();
  let searchHashtag = "#" + keyword;
  let arrayOfFoundCards = [
    {
      pictures: [],
    },
  ];

  for (let card of arrayOfAllCards[currentDeskId]["pictures"]) {
    if (card["description"].includes(searchHashtag)) {
      arrayOfFoundCards[0].pictures.push(card);
    }
  }
  return arrayOfFoundCards;
}

function addBackToAllPinsButton() {
  let desk = document.querySelector(".desk");
  let button = document.querySelector(".desk__button");
  let currentDeskId = getDeskIdFromLocalStorage();

  if (!button) {
    let button = make("button", "desk__button");
    button.innerText = "Back to all Pins";
    desk.append(button);

    button.addEventListener("click", (event) => {
      clearDesk();
      makeCards(arrayOfAllCards[currentDeskId]);
      desk.lastChild.remove();
    });
  }
}

search.addEventListener("keydown", (event) => {
  if (search.value === "") return;

  if (event.key == "Enter") {
    let arrayOfFoundCards = searchCards(search.value);
    clearDesk();
    addBackToAllPinsButton();
    makeCards(arrayOfFoundCards[0]);
    search.value = "";
  }
});
