export {
  modalWindow,
  putMethodForCurrentDesk,
  putMethodForNextDesk,
  modalWindowOpening,
};

function modalWindowOpening() {
  const modalWindow = document.querySelector(".modal-wrapper");
  const pictureID = modalWindow.getAttribute("data-img_id");

  /*methods*/
  // function putMethodForCurrentDesk(deskID, currentDesk, pictureID) {
  //   return fetch(`http://localhost:3000/desks/${deskID}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     },
  //     body: JSON.stringify(
  //       currentDesk["pictures"].filter((element) => {
  //         return element["_id"] !== pictureID;
  //       })
  //     ),
  //   });
  // }

  // function putMethodForNextDesk(deskID, nextDesk, currentPicture) {
  //   return fetch(`http://localhost:3000/desks/${deskID}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     },
  //     body: JSON.stringify(nextDesk["pictures"].push(currentPicture)),
  //   });
  // }

  /*ОБРАБОТЧИК */
  modalWindow.addEventListener("click", (e) => {
    console.log(1);
    console.log(2);

    let arrayOfDesks;
    let currentDesk;
    let currentPicture;
    const nextDesk = null;

    async function fetchMovies() {
      const response = await fetch("http://localhost:3000/desks");
      let res = await response.json();
      arrayOfDesks = await res.data;
      console.log(arrayOfDesks);
      console.log(pictureID);
      console.log(arrayOfDesks[0]);
      for (const desk of arrayOfDesks) {
        if (
          desk["pictures"].find((element) => {
            element["_id"] === pictureID;
            console.log(pictureID);
          })
        ) {
          console.log(desk);

          currentDesk = desk;
          // break
        }
      }
      console.log(currentDesk);
    }

    fetchMovies();

    //   let currentDeskID = currentDesk["_id"];

    //   // Ищет текущий !объект! картинки
    //   currentPicture = currentDesk["pictures"].find((element) => {
    //     element["_id"] === pictureID;
    //   });

    //   //итого у меня есть текущая доска, у меня есть нужная картинка

    //   if (e.target.tagName === "P") {
    //     const deskTitle = e.target.textContent;

    //     for (const desk of arrayOfDesks) {
    //       if (desk["title"] === deskTitle) {
    //         nextDesk = desk;
    //         // break
    //       } else {
    //         return;
    //       }
    //     }
    //     let nextDeskID = nextDesk["_id"];

    //     putMethodForCurrentDesk(currentDeskID, currentDesk, pictureID); // изменили в текущей доске
    //     putMethodForNextDesk(nextDesk, currentPicture); // добавили в следующую

    //     // render() зАБРАТЬ ИЗ UTIlS
    //   } else if (e.target.value === "Send") {
    //     const archiveDesk = arrayOfDesks.find(
    //       (element) => element["title"] === "archived"
    //     );
    //     let archiveDeskID = archiveDesk["_id"];
    //     putMethodForCurrentDesk(deskID, currentDesk, pictureID);
    //     putMethodForNextDesk(archiveDeskID, archiveDesk, currentPicture);

    //     // render() зАБРАТЬ ИЗ UTIlS
    //   }
  });
}
