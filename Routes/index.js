
const express = require("express");
const morgan = require("morgan");
const app = express();
const pokemon = require("./pokemon");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/* app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); */


//Página principal
app.get("/", (request, response, next) => {
    return response.status(200).send("Bienvenido a la Pokédex");
});

app.use("/pokemon", pokemon);

// Inciar servidor
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running");
});

