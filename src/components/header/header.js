import { makeCards } from "../basic-card/basic-card.js";
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

function searchCards(keyword) {
  let json = localStorage.getItem("desk");
  let currentDeskId = JSON.parse(json)["_id"];
  let currentDeskTitle = JSON.parse(json)["title"];
  let arrayOfFoundCards = [
    {
      pictures: [],
      title: currentDeskTitle,
      _id: currentDeskId,
    },
  ];

  let searchHashtag = "#" + keyword;

  for (let card of arrayOfAllCards[currentDeskId]["pictures"]) {
    if (card["description"].includes(searchHashtag)) {
      arrayOfFoundCards[0].pictures.push(card);
    }
  }
  return arrayOfFoundCards;
}

function clearDesk() {
  let desk = document.querySelector(".grid");
  desk.innerHTML = "";
}

search.addEventListener("keydown", (event) => {
  if (search.value === "") return;

  if (event.key == "Enter") {
    let arrayOfFoundCards = searchCards(search.value);
    clearDesk();
    makeCards(arrayOfFoundCards[0]);
    search.value = "";
  }
});
