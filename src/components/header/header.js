import { make, makeCards } from "../../utils.js";

export function header() {
  const theme = document.body.querySelector(".theme__checkbox");
  theme.addEventListener("click", () => {
    themed();
  });

  let checked = JSON.parse(localStorage.getItem("theme"));
  theme.checked = checked;
  window.addEventListener("change", ()=>{
    localStorage.setItem("theme", theme.checked)
  });
}

header();
themed();

function themed() {
  const theme = document.body.querySelector(".theme__checkbox");
  const html = document.getElementById("pop");
  if (theme.checked) {
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
  let searchHashtag = ("#" + keyword).toLowerCase();
  let arrayOfFoundCards = [
    {
      pictures: [],
    },
  ];

  for (let card of arrayOfAllCards[currentDeskId]["pictures"]) {
    const description =  (card["description"]).toLowerCase();
    if (description.includes(searchHashtag)) {
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


export function generateListOfDesks(desksArray) {
  const select = document.querySelector(".header__selection");

  for (let deskName in desksArray) {
      if (desksArray[deskName]) {
          const option = make("option", "header__option");
          option.innerHTML = `${desksArray[deskName]}`;
          select.append(option);

          if (localStorage.length > 1) {
              let json = localStorage.getItem("desk");
              let deskAfterReboot = JSON.parse(json);

              let titleDeskAfterReboot = deskAfterReboot.title;
              const options = document.querySelectorAll(".header__option");

              for (let option of options) {
                  if (option.textContent === titleDeskAfterReboot) {
                      option.setAttribute("selected", "");
                  }
              }
          }
      } else continue;
  }
}