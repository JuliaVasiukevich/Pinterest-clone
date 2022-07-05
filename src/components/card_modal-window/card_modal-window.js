import { make } from "../../utils.js";
import { makeRandomColor } from "../../utils.js";

export function generateCardModalWindow(obj) {
  let arrayOfDesks;
  let currentDesk;
  let currentPicture;

  /* может это вынести у утилс? встречается еще в makecard*/
  const API_URL = "http://localhost:3000";
  const PICTURES_PREFIX = "/images/pictures/";
  const AVATAR_PREFIX = "/images/avatars/";

  const modalWrapper = document.querySelector(".modal-wrapper");
  const modalWindow = document.querySelector(".modal-window");
  const pictureId = modalWrapper.getAttribute("data-img_id");

  async function findPicture() {
    const response = await fetch("http://localhost:3000/desks");
    let res = await response.json();
    arrayOfDesks = await res.data;

    for (const desk of arrayOfDesks) {
      let deskNow = desk["pictures"];
      let deskHaveObj = deskNow.filter((e) => e["_id"] == pictureId);
      let LengthDesk = deskHaveObj.length;
      if (LengthDesk) {
        currentDesk = desk;
      }
    }

    // Ищет текущий !объект! картинки
    currentPicture = currentDesk["pictures"].find(
      (element) => element["_id"] == pictureId
    );

    modalWindow.classList.add("card-window");
    const pictureBox = make("div", "card-window__picture");
    modalWindow.append(pictureBox);
    const cardImage = make("img", "card-window__img", {
      src: `${API_URL}${PICTURES_PREFIX}${currentPicture["url"]}`,
      alt: "picture",
    });
    pictureBox.append(cardImage);

    const description = make("div", "card-window__description");
    modalWindow.append(description);
    const buttonX = make("button", [
      "button",
      "card-window__button",
      "button--close",
    ]);
    buttonX.textContent = "x";
    description.append(buttonX);

    const authorInfo = make("div", "card-window__author-info");
    description.append(authorInfo);

    if (currentPicture.author.avatar) {
      const avatarImage = make("img", "card-window__avatar-img", {
        src: `${API_URL}${AVATAR_PREFIX}${currentPicture.author.avatar}`,
        alt: "avatar",
      });
      authorInfo.append(avatarImage);
    } else {
      const avatarImage = make("div", "card-window__avatar-img");
      avatarImage.style.backgroundColor = `${makeRandomColor()}`;
      const avatarLetter = make("div", "card-window__avatar-letter");
      avatarImage.append(avatarLetter);
      avatarLetter.textContent = `${currentPicture.author.name[0]}`;
      authorInfo.append(avatarImage);
    }

    const authorName = make("div", "card-window__author");
    authorName.textContent = `${currentPicture.author.name}`;
    authorInfo.append(authorName);

    const desctiptionText = make("div", "card-window__desctiption-text");
    desctiptionText.textContent = `${currentPicture["description"]}`;

    description.append(desctiptionText);
  }

  findPicture();
}
