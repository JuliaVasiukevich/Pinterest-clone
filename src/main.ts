console.log('lalalal')

fetch('/users').then(res => res.json()).then(res => {
    console.log(res);
})