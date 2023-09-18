class Pokemon {
    number;
    name;
    type;
    types = [];
    img;
};

// function that convert api to pokemon class
function convertPokemonApiToPokemon(pokemonApi) {
    const pokemon = new Pokemon();

    pokemon.number = pokemonApi.id;
    pokemon.name = pokemonApi.name;

    const types = pokemonApi.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;
    pokemon.types = types;
    pokemon.type = type;
    
    pokemon.img = pokemonApi.sprites.other.dream_world.front_default;

    return pokemon;
};

class PokemonStats {
    number;
    name;
    type;
    types = [];
    img;
    hp;
    attack;
    defense;
    special_attack;
    special_defense;
    speed;
};

function convertPokeStatsApiToPokemonStats(pokemonApi) {
    const newPokemonStats = new PokemonStats();

    newPokemonStats.number = pokemonApi.id;
    newPokemonStats.name = pokemonApi.name;

    const types = pokemonApi.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;
    newPokemonStats.types = types;
    newPokemonStats.type = type;

    newPokemonStats.img = pokemonApi.sprites.other.dream_world.front_default;
    newPokemonStats.hp = pokemonApi.stats[0].base_stat;
    newPokemonStats.attack = pokemonApi.stats[1].base_stat;
    newPokemonStats.defense = pokemonApi.stats[2].base_stat;
    newPokemonStats.special_attack = pokemonApi.stats[3].base_stat;
    newPokemonStats.special_defense = pokemonApi.stats[4].base_stat;
    newPokemonStats.speed = pokemonApi.stats[5].base_stat;

    return newPokemonStats;
};