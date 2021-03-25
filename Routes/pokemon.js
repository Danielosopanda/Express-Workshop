const express = require("express");
const pokemon = express.Router();
const db = require("../config/database");

pokemon.post("/", (request, response, next) => {
    return response.status(200).send(request.body)
});

// /pokemon (mostrar todos los pokémon)
pokemon.get("/", async (request, response, next) => {
    const pkmn = await db.query("SELECT * FROM pokemon");
    return response.status(200).json({ code: 1, message: pkmn});
});


// Buscar un pokemon por su id
pokemon.get("/:id([0-9]{1,3})", (request, response, next) => {
    const id = request.params.id - 1;
    if (id >= 0 && id <= 722) {
        return response.status(200).json({ code: 1, message: pkmn });  
    } else {
        return response.status(404).json({ code: 404, message: "Pokémon no encontrado" });
    }   
});

//Buscar un pokemon por su nombre
pokemon.get("/:name([A-Za-z]+)", (request, response, next) => {
    const name = request.params.name;

    const pkmn = pk.filter((pokemon) => {
        return (pokemon.name.toUpperCase() == name.toUpperCase()) && pokemon;
    });

    (pkmn.length > 0) ? response.status(200).send(pkmn) : response.status(400).send("Pokémon no encontrado");

});


module.exports = pokemon; 
