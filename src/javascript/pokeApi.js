// pokeApi module
const pokeApi = {};

// Get details of pokemons
pokeApi.GetPokemonDetails = (pokemons) => {
    return fetch(pokemons.url)
    .then((response) => response.json())
    .then(convertPokemonApiToPokemon)
}

// get pokemons
pokeApi.getPokemons = (offset = 0, limit = 12) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.GetPokemonDetails))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails);
};

// Get pokemon stats
pokeApi.getPokemonStats = (url) => {
    return fetch(url)
        .then((response) => response.json())
        .then((pokemon) => (convertPokeStatsApiToPokemonStats(pokemon)))
        .then((pokemonDetails) => pokemonDetails);
};

pokeApi.getPokemons()