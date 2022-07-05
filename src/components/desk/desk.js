import {
    make
} from "../../utils.js";

// fetch("http://localhost:3000/desks")
//   .then((res) => res.json())
//   .then((res) => {

//     const url = res.data[0].pictures[0].url;
//     renderImage(url);
//   });

// const API_URL = "http://localhost:3000";
// const PICTURES_PREFIX = "/images/pictures/";
// const AVATAR_PREFIX = "/images/avatars/";

// function renderImage(imageName) {
//   const wrapper = document.getElementById("pep");
//   const img = document.createElement("img");
//   img.src = API_URL + PICTURES_PREFIX + imageName;
//   wrapper.append(img);
// }

// fetch("http://localhost:3000/desks")
//   .then((res) => res.json())
//   .then((res) => {
//     const url = res.data[0].pictures[0].author.avatar;
//     renderAvatar(url);
//   });

// function renderAvatar(imageName) {
//   const wrapper = document.getElementById("pep");
//   const img = document.createElement("img");
//   img.src = API_URL + AVATAR_PREFIX + imageName;
//   wrapper.append(img);
// }

export function getDesks(yourFunction) {
    return fetch("http://localhost:3000/desks")
        .then((res) => res.json())
        .then((res) => {
            const titles = res.data.map((desk) => {
                if (desk.title !== "archived") {
                    return desk.title;
                }
            });
            yourFunction(titles);
        });
}

// const wrapper = document.getElementById('pep');

// const createInputWithButton = () => {
//     const input = make("input", 'input__add');
//     const button = make("button", "button__clear");
//     button.textContent = 'Add';
//     input.placeholder = 'Add desk';

// const createInputWithButton = () => {
//   const input = make("input", "input__add");
//   const button = make("button", "button__clear");
//   button.textContent = "Add";
//   input.placeholder = "Add desk";

//   button.addEventListener("click", () => {
//     let newDesk = {
//       title: input.value,
//     };

//     function addNewDesk(newDesk) {
//       fetch("http://localhost:3000/desks", {
//         method: "POST",
// headers: {
//   "Content-Type": "application/json",
// },
//         body: JSON.stringify(newDesk),
//       });
//     }
//     addNewDesk(newDesk);
//     input.value = "";
//   });

//   wrapper.append(input);
//   wrapper.append(button);

//   return input;
// };

// createInputWithButton();

// Making list of Desks

function generateListOfDesks(desksArray) {
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

getDesks(generateListOfDesks);

// This part is responsible for grid layout

// var Masonry = require("masonry-layout");
// var elem = document.querySelector('.grid');
// var msnry = new Masonry( elem, {
//   // options
//   itemSelector: '.grid-item',
//   columnWidth: 200
// });
// var elementMasonry = document.querySelector(".grid");

// var msnry = new Masonry(elementMasonry, {
//   itemSelector: ".grid-item",
//   columnWidth: 200,
//   // percentPosition: true,
//   // fitWidth: true,
//   // gutter: 10,
// });

const addBoardButton = document.getElementById("add_board");

addBoardButton.addEventListener("click", (event) => {
    const modalWrapper = make("div", "modal-wrapper");
    const modalBody = make("div", "modal-body");
    const modalWindow = make("div", "modal-window");
    const deskTitleElement = make("h2", "modal-window__title");
    const input = make("input", "modal-window__input");
    const button = make("button", ["button", "modal-window__button"]);
    const errorMessage = make('div', ['error-message']);
    const massage = make("p", "modal-window__massage");

    input.addEventListener('input', () => {
        errorMessage.textContent = '';
    })

    deskTitleElement.innerHTML = `Add board:`;
    button.textContent = "Add";
    input.placeholder = "Enter board name";

    document.body.append(modalWrapper);
    modalWrapper.append(modalBody);
    modalBody.append(modalWindow);
    modalWindow.append(deskTitleElement);
    modalWindow.append(input, button, errorMessage);


    button.addEventListener("click", async () => {
        let newDesk = {
            title: input.value,
        };
        massage.textContent = 'Succses!';

        async function addNewDesk(newDesk) {
            try {
                const response = await fetch("http://localhost:3000/desks", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newDesk),
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message);
                }
                return true;
            } catch (e) {
                errorMessage.textContent = e;
                return false;
            }
        }
        const result = await addNewDesk(newDesk);
        if (result) {
            input.remove();
            button.remove();
            modalWindow.append(massage);
            setTimeout(function () {
                location.reload();
            }, 3000);
        }


    });


});