import {
    make,
    API_URL
} from "../../utils.js";
import {
    generateListOfDesks
} from "../../components/header/header.js";

export function getDesks(yourFunction) {
    return fetch(`${API_URL}/desks`)
        .then((res) => res.json())
        .then((res) => {
            const titles = res.data.map((desk) => {
                if (desk.title !== "archived") {
                    return desk.title;
                }
            });
            yourFunction(titles);
        });
}

getDesks(generateListOfDesks);

const addBoardButton = document.getElementById("add_board");

addBoardButton.addEventListener("click", (event) => {
    const modalWrapper = make("div", "modal-wrapper");
    const modalBody = make("div", "modal-body");
    const modalWindow = make("div", "modal-window");
    const deskTitleElement = make("h2", "modal-window__title");
    const input = make("input", "modal-window__input");
    const button = make("button", ["button", "modal-window__button"]);
    const errorMessage = make('div', ['error-message']);
    const massage = make("p", "modal-window__massage");

    input.addEventListener('input', () => {
        errorMessage.textContent = '';
    })

    deskTitleElement.innerHTML = `Add board:`;
    button.textContent = "Add";
    input.placeholder = "Enter board name";

    document.body.append(modalWrapper);
    modalWrapper.append(modalBody);
    modalBody.append(modalWindow);
    modalWindow.append(deskTitleElement);
    modalWindow.append(input, button, errorMessage);


    button.addEventListener("click", async () => {
        let newDesk = {
            title: input.value,
        };
        massage.textContent = 'Succses!';

        async function addNewDesk(newDesk) {
            try {
                const response = await fetch(`${API_URL}/desks`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newDesk),
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message);
                }
                return true;
            } catch (e) {
                errorMessage.textContent = e;
                return false;
            }
        }
        const result = await addNewDesk(newDesk);
        if (result) {
            input.remove();
            button.remove();
            modalWindow.append(massage);
            setTimeout(function () {
                location.reload();
            }, 3000);
        }
    });
});