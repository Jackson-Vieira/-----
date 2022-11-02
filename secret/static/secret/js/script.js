const genTextBox = () => {
    return `<textarea name="message" id="textInput" cols="30" rows="10" class="textBox" placeholder="Escreva seu texto aqui"></textarea>`
} //Gera uma caixa de texto em formato String

const form = document.querySelector(".encryptForm") //guarda o formulario em uma constante

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');

const button = document.querySelector(".button")

button.onclick = (e) => {
    e.preventDefault()
    fetch("http://127.0.0.1:8000/password-genenator", {
        method: "GET",
        credentials: 'same-origin',
        headers:{
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest', //Necessary to work with request.is_ajax()
            'X-CSRFToken': csrftoken,
        }
    })
    .then(res => res.json())
    .then(res => console.log(res))
}


