const express = require("express");
const user = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../config/database");

user.post("/signin", async (request, response, next) => {

    const {user_name, user_mail, user_password} = request.body;

    if(user_name && user_mail && user_password){
        let query = "INSERT INTO user (user_name, user_mail, user_password) ";
        query += `VALUES ('${user_name}', '${user_mail}', '${user_password}')`;

        const rows = await db.query(query);

        if(rows.affectedRows == 1){
            return response.status(201).json({ code: 201, message: "Usuario registrado correctamente" });
        }

        return response.status(500).json({ code: 500, message: "Ocurrió un error" });
    }

    return response.status(500).json({ code: 500, message: "Campos incompletos" });
    
});

user.post("/login", async (request, response, next) => {

    const { user_mail, user_password } = request.body;
    const query = `SELECT * FROM user WHERE user_mail = '${user_mail}' AND user_password = '${user_password}'`;

    const rows = await db.query(query);

    if(user_mail && user_password) {
        if(rows.length == 1) {

            const token = jwt.sign({
                user_id: rows[0].user_id, 
                user_mail: rows[0].user_mail
            }, "debugkey");

            return response.status(200).json({ code: 200, message: token });
        } else {
            return response.status(200).json({ code: 200, message: "El usuario y la contraseña no coinciden" });
        }
    }
    return response.status(500).json({ code: 500, message: "Campos incompletos" });

    
});

user.get("/", async (request, response, next) => {

    const query = "SELECT * FROM user";
    const rows = await db.query(query);

    return response.status(200).json({ code: 201, message: rows  });

});

module.exports = user;