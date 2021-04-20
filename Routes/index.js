const express = require("express");
const morgan = require("morgan");
const app = express();
const pokemon = require("./pokemon");
const user = require("./user");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Página principal
app.get("/", (request, response, next) => {
    return response.status(200).json({ code: 1, messsage: "Bienvenido al pokédex" });
});

app.use("/pokemon", pokemon);
app.use("/user", user);

app.use((request, response, next) => {
    return response.status(404).json({ code: 404, message: "URL no encontrada" });
});

// Inciar servidor
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running");
});

