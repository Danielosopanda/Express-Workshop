const { request, response } = require("express");
const express = require("express");
const app = express();
const {pokemon} = require("./pokedex.json");

app.get("/", (request, response, next) => {
    response.send("Bienvenido a la Pokédex");
});

app.get("/pokemon", (request, response, next) => {
    response.status(200);
    response.send(pokemon);
});

app.get("/pokemon/all", (request, response, next) => {
    response.status(200);
    response.send(pokemon);
});


app.get("/pokemon/:id([0-9]{1,3})", (request, response, next) => {
    const id = request.params.id - 1;
    if(id >= 0 && id <= 150){
        response.status(200);
        response.send(pokemon[request.params.id - 1]);  
    } else {
        response.status(404);
        response.send("Pokémon no encontrado");
    }
});

app.get("/pokemon/:name", (request, response, next) => {
    const name = request.params.name;
    
    pokemon.forEach(pokemon => {
        if(pokemon.name == name){
            response.status(200);
            response.send(pokemon);
        } else {
            response.status(404);
            response.send("Pokémon no encontrado");
        }
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running");
});

