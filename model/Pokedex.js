const fetch = require('node-fetch');

let url = "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json";

let settings = { method: "Get" };

const fetchPokemon = () => fetch(url, settings)
    .then(res => res.json())
    .then((json) => {
         return json
    });

module.exports.fetchPokemon = fetchPokemon;