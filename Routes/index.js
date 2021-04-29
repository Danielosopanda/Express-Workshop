//Dependencias
const express = require("express");
const morgan = require("morgan");
const app = express();

//Routers
const pokemon = require("./pokemon");
const user = require("./user");

//Middleware
const auth = require("../Middleware/auth");
const notFound = require("../Middleware/notFound");
const index = require("../Middleware/index");
const CORS = require("../Middleware/CORS");

app.use(CORS);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Página principal
app.get("/", index);

app.use("/user", user);

app.use(auth);

app.use("/pokemon", pokemon);

app.use(notFound);

// Inciar servidor
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running");
});

