const regEx = {
    mail: /^[A-Za-zÄ-ý0-9-_.]+@[A-Za-zÄ-ý0-9-_.]+\.[A-Za-zÄ-ý0-9-_.]+$/,
    password: /^.{4,}$/ 
}

const campos = {
    mail: false,
    password: false
}

const   mailInput = document.querySelector("#inputMail"),
        passwordInput = document.querySelector("#inputPassword"),
        inputs = document.querySelectorAll(".textInput");


inputs.forEach(input => {
    input.addEventListener("click", () => {
        input.style.borderBottom = "2px solid #3B4CCA";
    })
    input.addEventListener("blur", () => {
        input.style.borderBottom = "2px solid #0a0a0a";
    })
});

const validarMail = () => {
    var mail = mailInput.value;
    if(regEx.mail.test(mail)) {
        console.log("Mail válido");
        mailInput.style.borderBottom = "2px solid #4BB543";
        campos.mail = true;
    } else {
        console.log("Mail inválido")
        mailInput.style.borderBottom = "2px solid #ff0033";
        campos.mail = false;
    }
}

const validarPassword = () => {
    var pass = passwordInput.value;
    if(regEx.password.test(pass)) {
        console.log("Contraseña válida");
        passwordInput.style.borderBottom = "2px solid #4BB543";
        campos.password = true;
    } else {
        console.log("Contraseña inválida");
        passwordInput.style.borderBottom = "2px solid #ff0033";
        campos.password = false;
    }
}



const init = () => {
    if(!localStorage.getItem("token")){
        document.querySelector("#logInForm").addEventListener("submit", login);
    } else {
        window.location.href = "pokedex.html";
    }
}

const login = (e) => {
    var mail = document.querySelector("#inputMail").value;
    var pass = document.querySelector("#inputPassword").value;

    validarMail();
    validarPassword();
    
    if(campos.mail && campos.password){

        axios({ 
            method: "post",
            url: "https://dmg-express-workshop.herokuapp.com/user/login",
            data: {
                user_mail: mail,
                user_password: pass
            }
        }).then((response) => {
            console.log(response.data);

            if(response.data.code === 200) {
                localStorage.setItem("token", response.data.message);
                window.location.href = "pokedex.html";
            } else {
                alert("Usuario inválido");
            }

        }).catch((error) => {
            console.log(error);

        }); 

    }

    e.preventDefault();
    
}

window.onload = init;