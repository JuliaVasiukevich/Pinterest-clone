import {
  getDesks
} from "../desk/desk.js";

const claims = ["test1", "test2", "test3", "test4", "test5", "test6"];

function make(tagName, className, attributes) {
  let element = document.createElement(tagName);

  if (typeof className === "string") {
    element.classList.add(className);
  } else {
    element.classList.add(...className);
  }

  for (let attributeName in attributes) {
    element[attributeName] = attributes[attributeName];
  }
  return element;
}

export function generateModalDesk(modalWindow) {
  const deskWrapper = make("div", "modal-wrapper");
  document.body.append(deskWrapper);

  const deskBody = make("div", "modal-body");
  deskWrapper.append(deskBody);

  const desks = make("div", "modal-window");
  deskBody.append(desks);

  const deskTitleElement = make("h1", "modal-window__title");
  deskTitleElement.innerHTML = `Модальное окно <br/> меню выбор доски`;
  desks.append(deskTitleElement);

  for (let element of modalWindow) {
    let deskElement = make("p", "modal-window__element");
    deskElement.textContent = element;
    desks.append(deskElement);
  }

  return desks;
}

getDesks(generateModalDesk);


export function generateModalСlaims(modalWindow) {
  const deskWrapper = make("div", "modal-wrapper");
  document.body.append(deskWrapper);

  const deskBody = make("div", "modal-body");
  deskWrapper.append(deskBody);

  const claims = make("div", "modal-window");
  deskBody.append(claims);

  const claimTitleElement = make("h1", "modal-window__title");
  claimTitleElement.innerHTML = `Модальное окно <br/> меню пожаловаться`;
  claims.append(claimTitleElement);

  const form = make("form", "modal-window__form");
  claims.append(form);
  /*Два атрибута HTML необходимы:
action содержит адрес, который определяет, куда будет отправлена информация формы;
method может быть либо GET, либо POST и определяет, как будет отправлена информация формы.*/

  for (let element of modalWindow) {
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

  deskWrapper.addEventListener("click", (event) => {
    if (event.target.tagName === "LABEL") {
      claimButtonSend.classList.add("modal-window__button-active");
    }
  });

  return claims;
}

generateModalСlaims(claims);