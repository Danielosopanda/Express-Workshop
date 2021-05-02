const init = () => {
    document.querySelector(".btn-secondary").addEventListener("click", () => {
        window.location.href = "signin.html";
    });

    document.querySelector(".btn-primary").addEventListener("click", login);
}

const login = () => {
    var mail = document.querySelector("#input-mail").value;
    var pass = document.querySelector("#input-password").value;

    axios({ 
        method: "post",
        url: "http://localhost:3000/user/login",
        data: {
            user_mail: mail,
            user_password: pass
        }
    }).then((response) => {
        console.log(response);

    }).catch((error) => {
        console.log(error);
        
    });
}

window.onload = init;