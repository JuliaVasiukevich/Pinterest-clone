import { make } from "../../utils.js";
import { makeRandomColor } from "../../utils.js";

const cardsInfo = {
  title: "Desk 1",
  pictures: [
    {
      author: {
        avatar: "",
        name: "Anna Julia",
        id: 1,
      },
      description: "Some text ",
      url: "https://jrnlst.ru/sites/default/files/covers/cover_6.jpg",
      id: 1,
    },
    {
      author: {
        avatar:
          "https://img5.cliparto.com/pic/xl/254123/6379578-surprise-woman-pop-art-avatar-character-icon.jpg",
        name: "Anna",
        id: 2,
      },
      description: "Some text ",
      url: "https://i.pinimg.com/736x/02/43/33/024333d4c372ff4827db5b35353819f1.jpg",
      id: 2,
    },
    {
      author: {
        avatar:
          "https://www.100maketov.ru/storage/low/58e3511e6e453263b9fb70a9",
        name: "Julia",
        id: 3,
      },
      description:
        "Some long text  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo natus temporibus",
      url: "https://i.pinimg.com/736x/02/43/33/024333d4c372ff4827db5b35353819f1.jpg",
      id: 3,
    },
    {
      author: {
        avatar:
          "https://www.100maketov.ru/storage/low/58e3511e6e453263b9fb70a9",
        name: "Julia",
        id: 4,
      },
      description:
        "Some long text  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo natus temporibus",
      url: "https://i.pinimg.com/736x/02/43/33/024333d4c372ff4827db5b35353819f1.jpg",
      id: 4,
    },
    {
      author: {
        avatar: "https://klike.net/uploads/posts/2019-03/1551511784_4.jpg",
        name: "Julia",
        id: 5,
      },
      description:
        "Some long text  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo natus temporibus",
      url: "https://i.pinimg.com/736x/02/43/33/024333d4c372ff4827db5b35353819f1.jpg",
      id: 5,
    },
  ],
};

export function makeCards(data) {
  const cards = document.querySelector(".grid");

  for (let item of data["pictures"]) {
    const card = make("div", ["card", "grid-item"]);
    cards.prepend(card);

    const pictureBox = make("div", "card__picture-box");
    card.append(pictureBox);

    const cardImage = make("img", "card__img", {
      src: `${item["url"]}`,
      alt: "picture",
    });
    cardImage.setAttribute("data-img_ID", `${item.id}`); //привязка к ID для дальнейшей работы с модальным окном

    const cardOverlay = make("div", "card__overlay");
    cardOverlay.style.backgroundColor = `url(${item["url"]})`;
    pictureBox.append(cardImage, cardOverlay);

    const buttonAddCardOnDesk = make("button", [
      "card__button",
      "button",
      "card__desk",
    ]);
    cardOverlay.append(buttonAddCardOnDesk);
    buttonAddCardOnDesk.textContent = "Добавить на доску";

    const buttonComplain = make("button", [
      "card__button",
      "button",
      "card__claim",
    ]);
    cardOverlay.append(buttonComplain);
    buttonComplain.textContent = "Пожаловаться";

    const descriptionBlock = make("div", ["card__description", "description"]);
    card.append(descriptionBlock);

    if (item.author.avatar) {
      const avatarImage = make("img", "description__avatar-img", {
        src: `${item.author.avatar}`,
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
    desctiptionText.setAttribute("data-img_ID", `${item.id}`);

    descriptionBlock.append(desctiptionText);
  }
  return cards;
}

makeCards(cardsInfo);
