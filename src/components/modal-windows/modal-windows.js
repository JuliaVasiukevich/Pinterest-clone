import {
  make
} from "../../utils.js";
import {
  getDesks
} from "../desk/desk.js";
import {
  makeCards
} from "../basic-card/basic-card.js";

export const claims = ["test1", "test2", "test3", "test4", "test5", "test6"];

document.body.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("card__claim") ||
    event.target.classList.contains("card__desk")
  ) {
    const modalWrapper = make("div", "modal-wrapper");
    document.body.append(modalWrapper);

    const modalBody = make("div", "modal-body");
    modalWrapper.append(modalBody);

    const modalWindow = make("div", "modal-window");
    modalBody.append(modalWindow);

    if (event.target.classList.contains("card__claim")) {
      generateModalСlaims(claims);
    }


    if (event.target.classList.contains("card__desk")) {
      getDesks(generateModalDesk);
    }
  }
});


function generateModalDesk(desksArray) {
  const modalWindow = document.querySelector(".modal-window");

  const deskTitleElement = make("h1", "modal-window__title");
  deskTitleElement.innerHTML = `Модальное окно <br/> меню выбор доски`;
  modalWindow.append(deskTitleElement);

  for (let element of desksArray) {
    let deskElement = make("p", "modal-window__element");
    deskElement.textContent = element;
    modalWindow.append(deskElement);
  }
  return;
}


// getDesks(generateModalDesk);

function generateModalСlaims(claimsArray) {
  const modalWindow = document.querySelector(".modal-window");


  const claimTitleElement = make("h1", "modal-window__title");
  claimTitleElement.innerHTML = `Модальное окно <br/> меню пожаловаться`;
  modalWindow.append(claimTitleElement);

  const form = make("form", "modal-window__form");
  modalWindow.append(form);
  /*Два атрибута HTML необходимы:
action содержит адрес, который определяет, куда будет отправлена информация формы;
method может быть либо GET, либо POST и определяет, как будет отправлена информация формы.*/

  for (let element of claimsArray) {
    let claimElement = make("label", "modal-window__form-element");
    claimElement.textContent = element;

    let radioElement = make("input", "modal-window__radio", {
      type: "radio",
      name: "claims",
      value: `${element}`,
    });
    claimElement.prepend(radioElement);
    form.append(claimElement);
  }

  const claimButtons = make("div", "modal-window__buttons");
  form.append(claimButtons);

  const claimButtonCancel = make("button", [
    "modal-window__button",
    "button",
    "modal-close",
  ]);
  claimButtonCancel.textContent = "Cancel";
  claimButtons.append(claimButtonCancel);

  const claimButtonSend = make("input", ["modal-window__button", "button"], {
    type: "submit",
    value: "Send",
  });
  claimButtons.append(claimButtonSend);

  const modalWrapper = document.querySelector(".modal-wrapper");

  modalWrapper.addEventListener("click", (event) => {
    if (event.target.tagName === "LABEL") {
      claimButtonSend.classList.add("modal-window__button-active");
    }
  });

  claimButtonSend.addEventListener("click", (event) => {
    const radios = document.querySelectorAll(".modal-window__radio");

    for (let radio of radios) {
      if (radio.checked) {
        console.log("Отправляем на почту"); //TODO: add send by email
      } else {
        event.preventDefault();
        modalWrapper.remove();
      }
    }
  });

  return;
}


document.body.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("modal-wrapper") ||
    event.target.classList.contains("modal-close") ||
    event.target.classList.contains("modal-body")
  ) {
    const modalWrapper = document.querySelector(".modal-wrapper");
    modalWrapper.remove();
  }
});


// function switchByDesk() {
//   const deskElement = document.querySelectorAll(".modal-window__element");
//   console.log(deskElement);
// }
// switchByDesk();
// generateModalСlaims(claims);