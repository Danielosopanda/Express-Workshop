const express = require("express");
const user = express.Router();
const db = require("../config/database");

user.post("/", async (request, response, next) => {

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

user.get("/", async (request, response, next) => {

    const query = "SELECT * FROM user";
    const rows = await db.query(query);

    return response.status(200).json({ code: 201, message: rows });

});

module.exports = user;