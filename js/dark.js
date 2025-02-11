const checkbox = document.getElementById('checkbox');

checkbox.addEventListener('change', function () {
    //change the theme  of the website
    document.body.classList.toggle('dark');

    if(body.style.background === 'black'){
        body.style.background = 'rgb(0, 128, 128)';

    }

    else{
        body.style.background = 'black';
    }
});