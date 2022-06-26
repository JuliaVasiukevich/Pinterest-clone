export function header() {

    const theme = document.body.querySelector('.theme');
    console.log(theme)
    theme.addEventListener("click", () => {
        const html = document.getElementById('pop');
        console.log(html);
        html.classList.toggle("theme-dark")
        html.classList.add('theme-light');
        save();
    });
    
    const checked = JSON.parse(localStorage.getItem('theme'));
    if (checked == true) {
        document.getElementById("theme").checked = true;
    }

    function load() {
        theme.checked = checked;
    }

    function save(){
        localStorage.setItem('theme', checkbox.checked);
    }

    load();
}

header();