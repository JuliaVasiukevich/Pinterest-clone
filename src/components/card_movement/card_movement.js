export {
  modalWindow,
  putMethodForCurrentDesk,
  putMethodForNextDesk,
  modalWindowOpening,
};

import { makeCards } from "../basic-card/basic-card.js";

function modalWindowOpening() {
  const section = document.querySelector(".grid");
  const modalWindow = document.querySelector(".modal-wrapper");
  const pictureID = modalWindow.getAttribute("data-img_id");

  /*methods*/
  function putMethodForCurrentDesk(deskID, currentDesk, pictureID) {
    let arrayPictures = currentDesk["pictures"];
    let newArrayPictures = arrayPictures.filter((e) => e["_id"] !== pictureID);
    // console.log(newArrayPictures);
    return fetch(`http://localhost:3000/desks/${deskID}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(newArrayPictures),
    });
  }

  function putMethodForNextDesk(deskID, nextDesk, currentPicture) {
    let arrayPictures = nextDesk["pictures"];
    arrayPictures.push(currentPicture);
    let newArrayPictures = arrayPictures;

    return fetch(`http://localhost:3000/desks/${deskID}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(newArrayPictures),
    });

  }

  function removeModalWindow(desk) {
    section.innerHTML = "";
    makeCards(desk);
    modalWindow.remove();
  }

  /*ОБРАБОТЧИК */
  modalWindow.addEventListener("click", (e) => {
    let arrayOfDesks;
    let currentDesk;
    let currentPicture;
    let nextDesk;

    async function fetchMovies() {
      const response = await fetch("http://localhost:3000/desks");
      let res = await response.json();
      arrayOfDesks = await res.data;

      arrayOfDesks = Array.from(arrayOfDesks);

      for (const desk of arrayOfDesks) {
        let deskNow = desk["pictures"];
        let deskHaveObj = deskNow.filter((e) => e["_id"] == pictureID);
        let LengthDesk = deskHaveObj.length;
        if (LengthDesk) {
          currentDesk = desk;
        }
      }
      let currentDeskID = currentDesk["_id"];

      // Ищет текущий !объект! картинки
      currentPicture = currentDesk["pictures"].find(
        (element) => element["_id"] == pictureID
      );
      // console.log(currentPicture);

      //   //итого у меня есть текущая доска, у меня есть нужная картинка

      if (e.target.tagName === "P") {
        const deskTitle = e.target.textContent;

        for (const desk of arrayOfDesks) {
          let check = desk["title"] === deskTitle;

          if (check) {
            nextDesk = desk;
          }
        }

        let nextDeskID = nextDesk["_id"];

        putMethodForCurrentDesk(currentDeskID, currentDesk, pictureID); // изменили в текущей доске
        putMethodForNextDesk(nextDeskID, nextDesk, currentPicture); // добавили в следующую
        removeModalWindow(currentDesk);
      } else if (e.target.value === "Send") {
        let archiveDesk = arrayOfDesks.find(
          (element) => element["title"] === "archived"
        );

        putMethodForCurrentDesk(currentDeskID, currentDesk, pictureID);
        putMethodForNextDesk("62b6cdf529b60bb10c244fce", archiveDesk, currentPicture);

        removeModalWindow(currentDesk);
      }
    }
    fetchMovies();
  });
}
