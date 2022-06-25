import {
    make
} from "../../utils.js";

fetch('http://localhost:3000/desks').then(res => res.json()).then((res) => {
    const url = res.data[0].pictures[0].url;
    renderImage(url);
});

const imgUrl = './images/pictures/';

function renderImage(imageName) {
    const wrapper = document.getElementById('pep');
    const img = document.createElement('img');
    img.src = imgUrl + imageName;
    wrapper.append(img);
}



export function getDesks(yourFunction) {
    return fetch('http://localhost:3000/desks').then(res => res.json())
        .then(res => {
            const titles = res.data.map(desk => desk.title);
            yourFunction(titles);
        })
}

const wrapper = document.getElementById('pep');

const createInputWithButton = () => {
    const input = make("input", 'input__add');
    const button = make("button", "button__clear");
    button.textContent = 'Add';
    input.placeholder = 'Add desk';


    button.addEventListener('click', () => {

        let newDesk = {
            title: input.value
        }

        function addNewDesk(newDesk) {
            fetch('http://localhost:3000/desks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newDesk)
            });
        }
        addNewDesk(newDesk);
        input.value = '';
    });

    wrapper.append(input);
    wrapper.append(button);

    return input;
};

createInputWithButton();


// addNewDesk(newDesk);