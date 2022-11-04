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

const form = document.querySelector(".encryptForm")
const outpBox = document.querySelector("#encrypted")
const button = document.querySelector(".button")
let method = null
const codeMethod = document.querySelector("#codeMethod")
setInterval(() => {
    codeMethod.querySelectorAll("option").forEach(opt => {
        opt.selected?method=opt.value:null
    })
}, 200)
const codeOptions = []
document.querySelectorAll("#codeType>option").forEach(opt => codeOptions.push(opt))
const inpBox = document.createElement("textarea")
inpBox.placeholder = "Informe o texto"
inpBox.classList.add("textBox")
inpBox.name = "message"
turnOnOff(inpBox)
const keyBox = inpBox.cloneNode(true)
keyBox.placeholder = "Informe a chave"
keyBox.name = "key"
//O que é usado está sendo guardado em constantes
form.insertAdjacentElement("afterbegin", inpBox)
inpBox.insertAdjacentElement("afterend", keyBox)

const getPass = () => {
    fetch('http://127.0.0.1:8000/password-generator/', {
        headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest', //Necessary to work with request.is_ajax()
            'X-CSRFToken': csrftoken,
        }
    })
        .then(res => res.json())
        .then(res => outpBox.value = res.password)
}

const salsa20 = () => {
    req = {
        message: inpBox.value,
        key: keyBox.value
    }

    fetch('http://127.0.0.1:8000/salsa20/?type=decode', {
        method: "POST",
        body: JSON.stringify(req),
        headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest', //Necessary to work with request.is_ajax()
            'X-CSRFToken': csrftoken,
            'Content-Type' : "application/json"
        }
    })
        .then(res => res.json())
        .then(res => outpBox.value = res.message)
}

const defaultPosts = (encryptor) => {
    if (encryptor=="points" && method == "decode") {
        outpBox.value = "Não é possível traduzir os pontos!!!"
        return
    }
    req = {message: inpBox.value}

    fetch(`http://127.0.0.1:8000/${encryptor}/?type=${method}`, {
        method: "POST",
        body: JSON.stringify(req),
        headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest', //Necessary to work with request.is_ajax()
            'X-CSRFToken': csrftoken,
            'Content-Type' : "application/json"
        }
    })
        .then(res => res.json())
        .then(res => {
            if (!res.key){
                outpBox.value = res.message
            } else {
                outpBox.value = `Texto criptografado: ${res.message}\n\nChave: ${res.key}`
            }
        })
}

function turnOnOff (box ,hidden=true) {
    hidden?box.classList.add("hidden"):box.classList.remove("hidden")
}

// JSON.stringify(objeto)


setInterval(() => {
    codeOptions.forEach(opt => {
        if (opt.selected){
            switch (opt.value) {
                case "password-generator":
                    turnOnOff(inpBox)
                    turnOnOff(keyBox) 
                    button.onclick = e => {
                        e.preventDefault()
                    getPass()
                }; break
                case "salsa20":
                    if (method == "decode") {
                        turnOnOff(inpBox, false)
                        turnOnOff(keyBox, false)
                        button.onclick = e => {
                            e.preventDefault()
                            salsa20()
                        };
                    }
                    else {
                        turnOnOff(keyBox)
                        turnOnOff(inpBox, false)
                        button.onclick = e => {
                            e.preventDefault()
                            defaultPosts(opt.value)
                        };
                    }
                     break
                
                case "binary":
                case "cifra-cesar":
                case "points":
                    turnOnOff(inpBox, false)
                    turnOnOff(keyBox)
                    button.onclick = e => {
                        e.preventDefault()
                        defaultPosts(opt.value)
                    }; break

                default:
                    turnOnOff(inpBox)
                    turnOnOff(keyBox)
                    button.onclick = e => e.preventDefault()
                    break
            }
        }
    })
}, 200)

