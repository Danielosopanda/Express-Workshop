var headers = {},
    url = "http://localhost:3000";

window.onload = () => {
    if(localStorage.getItem("token")) {
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
        loadPokemon();
    } else {
        window.location.href = "index.html";
    }
}

const loadPokemon = () => {
    axios.get(`${url}/pokemon`, headers)
    
    .then(response => {
        console.log(response);
        displayPokemon(response.data.message);
    }).catch(error => {
        console.log(error);
    });
}

const displayPokemon = (pokemon) => {
    var pokedex = document.querySelector(".pokedex");

    pokemon.forEach(pokemon => {
        pokedex.innerHTML +=    `<div class="pokemonCard sombra">
                                    <img title="Pokémon" src="https://dummyimage.com/200x200/000/fff">
                                    <h3>${pokemon.pok_name.charAt(0).toUpperCase() + pokemon.pok_name.slice(1)}</h3>
                                </div>`;
    });
}