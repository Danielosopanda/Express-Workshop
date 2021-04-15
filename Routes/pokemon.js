const express = require("express");
const pokemon = express.Router();
const db = require("../config/database");

pokemon.post("/", async (request, response, next) => {
    const { pok_name, pok_height, pok_weight, pok_base_experience } = request.body;

    if(pok_name && pok_height && pok_weight && pok_base_experience){
        let query = "INSERT INTO pokemon (pok_name, pok_height, pok_weight, pok_base_experience)";
        query += ` VALUES('${pok_name}', ${pok_height}, ${pok_weight}, ${pok_base_experience})`;

        const rows = await db.query(query);

        if(rows.affectedRows == 1){
            return response.status(201).json({ code: 201, message: "Pokémon insertado correctamente" })
        }

        return response.status(500).json({ code: 500, message: "Ocurrió un error" });
    }    

    return response.status(500).json({ code: 500, message: "Campos incompletos" });
});

pokemon.delete("/:id([0-9]{1,3})", async (request, response, next) => {
    const query = `DELETE FROM pokemon WHERE pok_id = ${request.params.id}`;

    const rows = await db.query(query);

    if(rows.affectedRows == 1){
        return response.status(200).json({ code: 200, message: "Pokémon borrado con éxito" });
    }

    return response.status(404).json({ code: 404, message: "Pokémon no encontrado" });
});

pokemon.put("/:id([0-9]{1,3})", async (request, response, next) => {
    const { pok_name, pok_height, pok_weight, pok_base_experience } = request.body;

    if(pok_name && pok_height && pok_weight && pok_base_experience){
        
        let query = `UPDATE pokemon SET pok_name = '${pok_name}', pok_height = ${pok_height}, `;
        query += `pok_weight = ${pok_weight}, pok_base_experience = ${pok_base_experience}  WHERE pok_id = ${request.params.id}`;

        const rows = await db.query(query);

        if(rows.affectedRows == 1){
            return response.status(201).json({ code: 201, message: "Pokémon modificado correctamente" })
        }

        return response.status(500).json({ code: 500, message: "Ocurrió un error" });
    }    

    return response.status(500).json({ code: 500, message: "Campos incompletos" });
});

pokemon.patch("/:id([0-9]{1,3})", async (request, response, next) => {

    if(request.body.pok_name){
        let query = `UPDATE pokemon SET pok_name = '${request.body.pok_name}' WHERE pok_id = ${request.params.id}`;

        const rows = await db.query(query);

        if(rows.affectedRows == 1){
            return response.status(201).json({ code: 201, message: "Pokémon modificado correctamente" })
        }
        return response.status(500).json({ code: 500, message: "Ocurrió un error" });
    }
    
    return response.status(500).json({ code: 500, message: "Campos incompletos" });

});

pokemon.get("/", async (request, response, next) => {
    const pkmn = await db.query("SELECT * FROM pokemon");
    return response.status(200).json({ code: 1, message: pkmn});
});


pokemon.get("/:id([0-9]{1,3})", (request, response, next) => {
    const id = request.params.id - 1;
    if (id >= 0 && id <= 722) {
        return response.status(200).json({ code: 1, message: pkmn });  
    } else {
        return response.status(404).json({ code: 404, message: "Pokémon no encontrado" });
    }   
});

pokemon.get("/:name([A-Za-z]+)", (request, response, next) => {
    const name = request.params.name;

    const pkmn = pk.filter((pokemon) => {
        return (pokemon.name.toUpperCase() == name.toUpperCase()) && pokemon;
    });

    (pkmn.length > 0) ? response.status(200).send(pkmn) : response.status(400).send("Pokémon no encontrado");

});


module.exports = pokemon; 
