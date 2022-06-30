/*
так для него ничего не прописано на сервере. для того, чтобы высвечивался полный объект есть функция app.get+

а поскольку у тебя указала айдишка, он не понимает, куда ему идти+

кароч, история такая: берешь вот тот фетч, меняешь там вместо объекта pop:pop подставляешь pictures: 
и свой новый массив, на сервере на аналогии, что я накидала вместо консоль лога в req.body кладешь свой измененный массив.
Основная задача: сразу достучаться до одной доски, с которой забираешь, а потом в которую кладешь.
Результат можно будет увидеть либо в измененном массиве, который приходит, либо в самой БД.
*/

// fetch("http://localhost:3000/desks/62b5a979540ca9d24c112980", {
//   method: "PUT",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ pop: "pop" }), // подставляешь pictures: и свой новый массив
// })
//   .then((res) => res.json())
//   .then((res) => console.log(res));
s
export { modalWindow, putMethodForCurrentDesk, putMethodForNextDesk };

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

/*ОБРАБОТЧИК */
modalWindow.addEventListener("click", (e) => {
  let arrayOfDesks = null;
  let currentDesk = null;
  let currentPicture = null;
  const nextDesk = null;

  fetch("http://localhost:3000/desks")
    .then((res) => res.json())
    .then((res) => {
      arrayOfDesks = res.data;
      console.log(arrayOfDesks);
    });

  for (const desk of arrayOfDesks) {
    if (
      desk["pictures"].find((element) => {
        element["_id"] == pictureID;
      })
    ) {
      currentDesk = desk;
      // break
    }
  }

  let currentDeskID = currentDesk["_id"];

  // Ищет текущий !объект! картинки
  currentPicture = currentDesk["pictures"].find((element) => {
    element["_id"] === pictureID;
  });

  //итого у меня есть текущая доска, у меня есть нужная картинка

  if (e.target.tagName === "P") {
    const deskTitle = e.target.textContent;

    for (const desk of arrayOfDesks) {
      if (desk["title"] === deskTitle) {
        nextDesk = desk;
        // break
      } else {
        return;
      }
    }
    let nextDeskID = nextDesk["_id"];

    putMethodForCurrentDesk(currentDeskID, currentDesk, pictureID); // изменили в текущей доске
    putMethodForNextDesk(nextDesk, currentPicture); // добавили в следующую

    // render() зАБРАТЬ ИЗ UTIlS
    
  } else if (e.target.value === "Send") {
    const archiveDesk = arrayOfDesks.find(
      (element) => element["title"] === "archived"
    );
    let archiveDeskID = archiveDesk["_id"];
    putMethodForCurrentDesk(deskID, currentDesk, pictureID);
    putMethodForNextDesk(archiveDeskID, archiveDesk, currentPicture);

    // render() зАБРАТЬ ИЗ UTIlS

  }
})

