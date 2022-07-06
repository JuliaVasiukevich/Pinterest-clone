export const API_URL = "http://localhost:3000";
export const PICTURES_PREFIX = "/images/pictures/";
export const AVATAR_PREFIX = "/images/avatars/";

export const make = (tagName, classNames, attributes) => {
  const element = document.createElement(tagName);

  if (typeof classNames === "string") {
    element.classList.add(classNames);
  } else {
    element.classList.add(...classNames);
  }

  for (let attributeName in attributes) {
    element[attributeName] = attributes[attributeName];
  }

  return element;
};

export function makeRandomColor() {
  return (
    "#" + (Math.random().toString(16) + "000000").substring(2, 8).toUpperCase()
  );
}

export function makeCards(data) {
  const cards = document.querySelector(".grid");
  cards.innerHTML = "";

  for (let item of data.pictures) {
    const card = make("div", ["card", "grid-item"]);
    cards.append(card);

    const pictureBox = make("div", "card__picture-box");
    card.append(pictureBox);

    const cardImage = make("img", "card__img", {
      src: `${API_URL}${PICTURES_PREFIX}${item["url"]}`,
      alt: "picture",
    });

    cardImage.setAttribute("data-img_id", `${item._id}`); 

    const cardOverlay = make("div", "card__overlay");
    cardOverlay.setAttribute("data-img_id", `${item._id}`); 
    cardOverlay.style.backgroundColor = `url(${API_URL}${PICTURES_PREFIX}${item["url"]})`;
    pictureBox.append(cardImage, cardOverlay);

    const buttonAddCardOnDesk = make("button", [
      "card__button",
      "button",
      "card__button-desk",
    ]);
    buttonAddCardOnDesk.setAttribute("data-img_id", `${item._id}`);
    cardOverlay.append(buttonAddCardOnDesk);
    buttonAddCardOnDesk.textContent = "Add to the board";

    const buttonComplain = make("button", [
      "card__button",
      "button",
      "card__button-claim",
    ]);
    buttonComplain.setAttribute("data-img_id", `${item._id}`);
    cardOverlay.append(buttonComplain);
    buttonComplain.textContent = "Complain";

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

    desctiptionText.setAttribute("data-img_id", `${item._id}`);

    descriptionBlock.append(desctiptionText);

    cardImage.onload = () => {
      var Masonry = require("masonry-layout");
      var elem = document.querySelector(".grid");
      var msnry = new Masonry(elem, {
        itemSelector: ".grid-item",
        percentPosition: true,
        fitWidth: true,
        gutter: 10,
        columnWidth: 200,
      });
    };
  }
  return cards;
}