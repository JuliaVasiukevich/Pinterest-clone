import { make } from "../../utils.js";
import { makeRandomColor } from "../../utils.js";

let firstDesk;
const data = fetch("http://localhost:3000/desks")
  .then((res) => res.json())
  .then((res) => {
    firstDesk = res.data[0];

    if (localStorage.length > 1) {
      let json = localStorage.getItem("desk");
      let deskAfterReboot = JSON.parse(json);

      makeCards(deskAfterReboot);
    } else {
      makeCards(firstDesk);
      json = JSON.stringify(firstDesk);
      localStorage.setItem("desk", json);
    }
  });

// const cards = document.querySelector('.desk')

export function makeCards(data) {
  const cards = document.querySelector(".grid");

  console.log(data);
  const API_URL = "http://localhost:3000";
  const PICTURES_PREFIX = "/images/pictures/";
  const AVATAR_PREFIX = "/images/avatars/";

  for (let item of data.pictures) {
    const card = make("div", ["card", "grid-item"]);
    cards.append(card);

    const pictureBox = make("div", "card__picture-box");
    card.append(pictureBox);

    const cardImage = make("img", "card__img", {
      src: `${API_URL}${PICTURES_PREFIX}${item["url"]}`,
      alt: "picture",
    });

    cardImage.setAttribute("data-img_id", `${item._id}`); //привязка к ID для дальнейшей работы с модальным окном

    const cardOverlay = make("div", "card__overlay");
    cardOverlay.style.backgroundColor = `url(${API_URL}${PICTURES_PREFIX}${item["url"]})`;
    pictureBox.append(cardImage, cardOverlay);

    const buttonAddCardOnDesk = make("button", [
      "card__button",
      "button",
      "card__button-desk",
    ]);
    buttonAddCardOnDesk.setAttribute("data-img_id", `${item._id}`);
    cardOverlay.append(buttonAddCardOnDesk);
    buttonAddCardOnDesk.textContent = "Добавить на доску";

    const buttonComplain = make("button", [
      "card__button",
      "button",
      "card__button-claim",
    ]);
    buttonComplain.setAttribute("data-img_id", `${item._id}`);
    cardOverlay.append(buttonComplain);
    buttonComplain.textContent = "Пожаловаться";

    const descriptionBlock = make("div", ["card__description", "description"]);
    card.append(descriptionBlock);

    if (item.author.avatar) {
      const avatarImage = make("img", "description__avatar-img", {
        src: `${API_URL}${AVATAR_PREFIX}${item.author.avatar}`,
        alt: "avatar",
      });
      descriptionBlock.append(avatarImage);
    } else {
      const avatarImage = make("div", "description__avatar-img");
      avatarImage.style.backgroundColor = `${makeRandomColor()}`;
      const avatarLetter = make("div", "description__avatar-letter");
      avatarImage.append(avatarLetter);
      avatarLetter.textContent = `${item.author.name[0]}`;
      descriptionBlock.append(avatarImage);
    }

    const desctiptionText = make("div", "description__text");
    desctiptionText.textContent = `${item["description"]}`;

    desctiptionText.setAttribute("data-img_id", `${item.id}`);

    descriptionBlock.append(desctiptionText);

    cardImage.onload = () => {
      var Masonry = require("masonry-layout");
      var elem = document.querySelector('.grid');
      var msnry = new Masonry(elem, {
        // options
        itemSelector: '.grid-item',
        columnWidth: 200,
        percentPosition: true,
        fitWidth: true,
        gutter: 10,
        // columnWidth: '.grid-sizer',
        percentPosition: true
      });
    }
  }
  return cards;
}
