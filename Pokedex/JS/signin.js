const regEx = {
    mail: /^[A-Za-zÄ-ý0-9-_.]+@[A-Za-zÄ-ý0-9-_.]+\.[A-Za-zÄ-ý0-9-_.]+$/,
    name: /^[A-Za-zÄ-ý\s]{3,40}$/,
    password: /^.{4,}$/ 
}

const campos = {
    mail: false,
    name: false,
    password: false
}

const   nameInput = document.querySelector("#inputName"),
        mailInput = document.querySelector("#inputMail"),
        passwordInput = document.querySelector("#inputPassword"),
        signInForm = document.querySelector("#signInForm"),
        inputs = document.querySelectorAll(".textInput");

inputs.forEach(input => {
    input.addEventListener("click", () => {
        input.style.borderBottom = "2px solid #3B4CCA";
    });
        input.addEventListener("blur", () => {
            input.style.borderBottom = "2px solid #0a0a0a";
    });
});

const validarName = () => {
    var name = nameInput.value;
    if(regEx.name.test(name)) {
        console.log("Nombre válido");
        nameInput.style.borderBottom = "2px solid #4BB543";
        campos.name = true;
    } else {
        console.log("Nombre inválido")
        nameInput.style.borderBottom = "2px solid #ff0033";
        campos.name = false;
    }
}

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

const signIn = (e) => {
    validarName();
    validarMail();
    validarPassword();

    var name = nameInput.value,
        mail = mailInput.value,
        pass = passwordInput.value;

    if(campos.name && campos.mail && campos.password) {

        axios({ 
            method: "post",
            url: "http://localhost:3000/user/signin",
            data: {
                user_name: name,
                user_mail: mail,
                user_password: pass
            }
        }).then((response) => {
            console.log(response);

        }).catch((error) => {
            console.log(error);

        }); 
        

    } else {
        
    }
    e.preventDefault();
}

signInForm.addEventListener("submit", signIn);
