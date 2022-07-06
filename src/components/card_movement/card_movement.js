import {
  makeCards
} from "../../utils.js";

export {
  modalWindow,
  putMethodForCurrentDesk,
  putMethodForNextDesk,
  modalWindowOpening,
};

function modalWindowOpening() {
  const section = document.querySelector(".grid");
  const modalWindow = document.querySelector(".modal-wrapper");
  const pictureID = modalWindow.getAttribute("data-img_id");

  function putMethodForCurrentDesk(deskID, currentDesk, pictureID) {
    let arrayPictures = currentDesk["pictures"];
    let newArrayPictures = arrayPictures.filter((e) => e["_id"] !== pictureID);
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

      currentPicture = currentDesk["pictures"].find(
        (element) => element["_id"] == pictureID
      );

      if (e.target.tagName === "P") {
        const deskTitle = e.target.textContent;

        for (const desk of arrayOfDesks) {
          let check = desk["title"] === deskTitle;

          if (check) {
            nextDesk = desk;
          }
        }

        let nextDeskID = nextDesk["_id"];

        putMethodForCurrentDesk(currentDeskID, currentDesk, pictureID)
          .then((res) => res.json())
          .then((data) => {
            const desk = JSON.stringify(data);
            localStorage.setItem('desk', desk);
            makeCards(data);
          })
        putMethodForNextDesk(nextDeskID, nextDesk, currentPicture);
        let newCurrentDesk;
        for (let desk of arrayOfDesks) {
          if (desk["_id"] === currentDeskID) {
            newCurrentDesk = desk;
          }
        }

        removeModalWindow(newCurrentDesk);
      } else if (e.target.value === "Send") {
        let archiveDesk = arrayOfDesks.find(
          (element) => element["title"] === "archived"
        );
        let archivedtDeskID = archiveDesk["_id"];

        putMethodForCurrentDesk(currentDeskID, currentDesk, pictureID)
        .then((res) => res.json())
        .then((data) => {
          const desk = JSON.stringify(data);
          localStorage.setItem('desk', desk);
          makeCards(data);
        });
        putMethodForNextDesk(archivedtDeskID, archiveDesk, currentPicture);
        removeModalWindow(currentDesk);
      }
    }
    fetchMovies();
  });
}