export function header() {

    const theme = document.body.querySelector('.theme__checkbox');
    theme.addEventListener("click", () => {
        themed()
    });

    function save() {
        localStorage.setItem("theme", theme.checked);
    }

    let checked = JSON.parse(localStorage.getItem("theme"));
    theme.checked = checked;
    window.addEventListener('change', save);
}

header();
themed();

function themed() {
    const theme = document.body.querySelector('.theme__checkbox');
    const html = document.getElementById('pop');
    if (theme.checked) {
        // html.classList.toggle("theme-light");
        html.classList.add('theme-dark');
        html.classList.remove('theme-light');
    } else {
        html.classList.add('theme-light');
        html.classList.remove('theme-dark');
    }
};

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
