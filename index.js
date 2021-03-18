const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const {pokemon} = require("./pokedex.json");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Página principal
app.get("/", (request, response, next) => {
    return response.status(200).send("Bienvenido a la Pokédex");
});

app.post("/pokemon", (request, response, next) => {
    return response.status(200).send(request.body)
});

// /pokemon (mostrar todos los pokémon)
app.get("/pokemon", (request, response, next) => {
    return response.status(200).send(pokemon);
});


// Buscar un pokemon por su id
app.get("/pokemon/:id([0-9]{1,3})", (request, response, next) => {
    const id = request.params.id - 1;
    if(id >= 0 && id <= 150){
        return response.status(200).send(pokemon[request.params.id - 1]);  
    } else {
        return response.status(404).send("Pokémon no encontrado");
    }   
});

//Buscar un pokemon por su nombre
app.get("/pokemon/:name([A-Za-z]+)", (request, response, next) => {
    const name = request.params.name;

    const pk = pokemon.filter((pokemon) => {
        return (pokemon.name.toUpperCase() == name.toUpperCase()) && pokemon;
    });

    (pk.length > 0) ? response.status(200).send(pk) : response.status(400).send("Pokémon no encontrado");

});

// Inciar servidor
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running");
});

