import {
    make
} from "../../utils.js";

// import imgs from '../../../server/images/pictures/*.jpg';
// import ava from '../../../server/images/avatars/img1.jpg';


fetch('http://localhost:3000/desks').then(res => res.json()).then((res) => {
    const url = '../../../server/images/pictures/' + res.data[0].pictures[0].url;
    renderImage(url);
});

const imgUrl = '../../server/images/pictures/';
const avaUrl = './images/avatars/';

function renderImage(imageName) {
    const wrapper = document.getElementById('pep');
    const img = document.createElement('img');
    let img1 = new URL(`../../../server/images/pictures/${imageName}`, import.meta.url);
    // import img222 from imageName;
    img.src = img1;
    wrapper.append(img);
}

// fetch('http://localhost:3000/desks').then(res => res.json()).then((res) => {
//     const url = res.data[0].pictures[0].author.avatar;
//     renderAvatar(url);
// });

// function renderAvatar(imageName) {
//     const wrapper = document.getElementById('pep');
//     const img = document.createElement('img');
//     img.src = avaUrl + imageName;
//     wrapper.append(img);
// }


export function getDesks(yourFunction) {
    return fetch('http://localhost:3000/desks').then(res => res.json())
        .then(res => {
            const titles = res.data.map(desk => {
                if (desk.title !== 'archived') {
                    return desk.title
                }
            });
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