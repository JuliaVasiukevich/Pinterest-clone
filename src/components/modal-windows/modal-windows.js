import { make } from "../../utils.js";
import { getDesks } from "../desk/desk.js";
import { makeCards } from "../basic-card/basic-card.js";
import { modalWindowOpening } from "../card_movement/card_movement.js";

import { generateCardModalWindow } from "../card_modal-window/card_modal-window.js";



export const claims = [
  "Spam",
  "Nudity or pornography",
  "Self-harm",
  "Misinformation",
  "Hateful activities",
  "Dangerous goods",
  "Harassment or privacy violations",
  "Graphic violence",
  "My intellectual property",
];

document.body.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("card__button-claim") ||
    event.target.classList.contains("card__button-desk") ||

    event.target.classList.contains("card__overlay") ||
    event.target.classList.contains("description__text") ||
    event.target.classList.contains("menu__contacts")
  ) {
    const modalWrapper = make("div", "modal-wrapper");
    const pictureId = event.target.getAttribute("data-img_id");
    modalWrapper.setAttribute("data-img_id", `${pictureId}`);
    document.body.append(modalWrapper);

    const modalBody = make("div", "modal-body");
    modalWrapper.append(modalBody);

    const modalWindow = make("div", "modal-window");
    modalBody.append(modalWindow);

    if (event.target.classList.contains("card__button-claim")) {
      generateModalСlaims(claims);
    }

    if (event.target.classList.contains("card__button-desk")) {
      let loading = make("div", "modal-window__loading");
      modalWindow.append(loading);
      getDesks(generateModalDesk);
    }


    if (
      event.target.classList.contains("card__overlay") ||
      event.target.classList.contains("description__text")
    ) {
      generateCardModalWindow();
    if (event.target.classList.contains("menu__contacts")) {
      generateModalContacts();
    }
  }
  modalWindowOpening();
});

function generateModalDesk(desksArray) {
  const modalWindow = document.querySelector(".modal-window");

  const deskTitleElement = make("h2", "modal-window__title");
  deskTitleElement.innerHTML = `Select board:`;
  modalWindow.append(deskTitleElement);

  for (let element of desksArray) {
    let deskElement = make("p", "modal-window__element");
    deskElement.textContent = element;
    modalWindow.append(deskElement);
  }
  const loading = document.querySelector(".modal-window__loading");
  loading.remove();
  return;
}

function generateModalСlaims(claimsArray) {
  const modalWindow = document.querySelector(".modal-window");

  const claimTitleElement = make("h2", "modal-window__title");


  claimTitleElement.innerHTML = `Report pin`;

  modalWindow.append(claimTitleElement);

  const form = make("form", "modal-window__form", {
    enctype: "multipart/form-data",
  });
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

        event.preventDefault();
        // const modalWrapper = document.querySelector(".modal-wrapper");
        // const pictureID = modalWrapper.getAttribute('data-img_id');
        // console.log(pictureID);
        let msg = {
          message: radio.value,
        };
        fetch("http://localhost:3000/telegram", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(msg),
        });
      } else {
        event.preventDefault();
        modalWrapper.remove();
      }
    }
  });

  return;
}

function generateModalContacts() {
  const modalWindow = document.querySelector(".modal-window");

  const contactTitleElement = make("h2", "modal-window__title");
  contactTitleElement.innerHTML = `Contact our team`;
  modalWindow.append(contactTitleElement);

  const team = [
    { name: "Julia V.", link: "https://github.com/JuliaVasiukevich" },
    { name: "Anna B.", link: "https://github.com/AnnaBR01" },
    { name: "Julia K.", link: "https://github.com/Julia-Kovalchuk" },
    { name: "Anna Yu.", link: "https://github.com/annyurchenko" },
  ];

  for (let person of team) {
    const contactElement = make("div", "modal-window__contact-element");
    modalWindow.append(contactElement);

    let contactName = make("p", "modal-window__contact-name");
    contactName.textContent = `${person["name"]}:`;
    contactElement.append(contactName);

    let contactLink = make("a", "modal-window__contact-link", {
      href: person["link"],
      target: "blanck",
    });
    contactElement.append(contactLink);

    let contactImage = make("img", "modal-window__contact-image", {
      src: "../images/github-logo.png",
      alt: "select",
    });
    contactLink.append(contactImage);
  }

  return;
}

document.body.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("modal-wrapper") ||
    event.target.classList.contains("modal-close") ||
    event.target.classList.contains("modal-body") ||
    event.target.classList.contains("button--close")
  ) {
    const modalWrapper = document.querySelector(".modal-wrapper");
    modalWrapper.remove();
  }
});

const select = document.querySelector(".header__selection");

select.addEventListener("change", function (event) {
  const sectionCard = document.querySelector(".grid");
  sectionCard.innerHTML = "";


  localStorage.removeItem("desk");
  let json = "";

  const deskName = event.target.value;
  let arrayOfDesks = null;
  const data = fetch("http://localhost:3000/desks")
    .then((res) => res.json())
    .then((res) => {
      arrayOfDesks = res.data;

      for (let desk of arrayOfDesks) {
        if (desk.title === deskName) {
          makeCards(desk);


          json = JSON.stringify(desk);
          localStorage.setItem("desk", json);
        }
      }
    })
    .then(() => {
      var Masonry = require("masonry-layout");
      var elem = document.querySelector(".grid");
      var msnry = new Masonry(elem, {
        itemSelector: ".grid-item",
        percentPosition: true,
        fitWidth: true,
        gutter: 10,

      });
    });
});
