const express = require("express");
const app = express();

app.get("/", (request, response, next) => {
    response.status(200);
    response.send("Hola mundo");
});

app.listen(3000, () => {
    console.log("Server is running");
});

