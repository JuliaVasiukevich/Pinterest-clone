export function header() {

    const theme = document.body.querySelector('.theme__checkbox');
    theme.addEventListener("click", () => {
        themed()
    });

    function save() {
        localStorage.setItem("theme", theme.checked);
    }

    let checked = JSON.parse(localStorage.getItem("theme"));
    theme.checked = checked;
    window.addEventListener('change', save);
}

header();
themed();

function themed() {
    const theme = document.body.querySelector('.theme__checkbox');
    const html = document.getElementById('pop');
    if (theme.checked) {
        // html.classList.toggle("theme-light");
        html.classList.add('theme-dark');
        html.classList.remove('theme-light');
    } else {
        html.classList.add('theme-light');
        html.classList.remove('theme-dark');
    }
};