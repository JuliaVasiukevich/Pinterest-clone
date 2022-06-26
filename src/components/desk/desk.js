// import { make } from "../../utils.js";

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

// const wrapper = document.getElementById("pep");

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
//         headers: {
//           "Content-Type": "application/json",
//         },
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
