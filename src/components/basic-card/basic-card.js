const cardsInfo = {
  title: "Desk 1",
  pictures: [
    {
      author: {
        avatar: '',
        name: "Anna Julia",
        id: 1,
      },
      description: "Some text ",
      url: "https://jrnlst.ru/sites/default/files/covers/cover_6.jpg",
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
    },
    {
      author: {
        avatar:
          "https://klike.net/uploads/posts/2019-03/1551511784_4.jpg",
        name: "Julia",
        id: 5,
      },
      description:
        "Some long text  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo natus temporibus",
      url: "https://i.pinimg.com/736x/02/43/33/024333d4c372ff4827db5b35353819f1.jpg",
    },
  ],
};

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

function makeRandomColor() {
  return (
    "#" + (Math.random().toString(16) + "000000").substring(2, 8).toUpperCase()
  );
}

export function makeCards(data) {
  const cards = make("section", "cards");
  document.body.append(cards);

  for (let item of data["pictures"]) {
    const card = make("div", "card");
    cards.prepend(card);

    const pictureBox = make("div", "card__picture-box");
    card.append(pictureBox);

    const cardImage = make("img", "card__img", {
      src: `${item["url"]}`,
      alt: "picture",
    });

    const cardOverlay = make("div", "card__overlay");
    cardOverlay.style.backgroundColor = `url(${item["url"]})`;
    pictureBox.append(cardImage, cardOverlay);

    const buttonAddCardOnDesk = make("button", ["card__button", "button"]);
    cardOverlay.append(buttonAddCardOnDesk);
    buttonAddCardOnDesk.textContent = "Добавить на доску";

    const buttonComplain = make("button", ["card__button", "button"]);
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
    } 
    else {
      const avatarImage = make("div", "description__avatar-img");
      avatarImage.style.backgroundColor = `${makeRandomColor()}`;
      const avatarLetter = make("div", "description__avatar-letter");
      avatarImage.append(avatarLetter);
      avatarLetter.textContent = `${item.author.name[0]}`;
      descriptionBlock.append(avatarImage);
    }

    const desctiptionText = make("div", "description__text");
    desctiptionText.textContent = `${item["description"]}`;
    descriptionBlock.append(desctiptionText);
  }
  return cards;
}

makeCards(cardsInfo);
