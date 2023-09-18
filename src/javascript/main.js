// Variables
const pokemonList = document.getElementById('pokemonList');
const pokemonModal = document.getElementById('pokemonModal');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const maxPokemons = 151;
const limit = 12;
let offset = 0;

// function that convert pokemons data in <li></li>
function convertPokemonStatsDataToLi(pokemon) {
    return `
        <div class="${pokemon.type}" id="container">
            <header>
                <span class="pokemonName">
                    <img src="/assets/icon/icon_type_${pokemon.type}.png" alt="icon_type_">
                    ${pokemon.name}
                </span>
                <span class="pokemonNumber">#${pokemon.number}</span>
            </header>

            <main>
                <img src="/assets/img/details_type_bg_${pokemon.type}.png" alt="background ${pokemon.type}" id="background">
                <img src="${pokemon.img}" alt="${pokemon.name}" id="pokemonImg">
            </main>

            <section id="statsDetail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">
                    <img src="/assets/icon/icon_type_${type}.png" alt="icon_type_">
                    ${type}
                    </li>`).join('')}
                </ol>
            </section>

            <footer>
                <ul>
                    <li>Base Stats</li>
                    <li class="stats">Hp: ${pokemon.hp}</li>
                    <li class="stats">Attack: ${pokemon.attack}</li>
                    <li class="stats">Defense: ${pokemon.defense}</li>
                    <li class="stats">Special Attack: ${pokemon.special_attack}</li>
                    <li class="stats">Special Defense: ${pokemon.special_defense}</li>
                    <li class="stats">Speed: ${pokemon.speed}</li>
                </ul>
                <button id="buttonModal" type="button" onClick="closeModal()">Close</button>
            </footer>
        </div>
    `
};

function convertPokemonsDataToLi(pokemon){
    return `
        <li class="pokemon ${pokemon.type}" onClick="showModal('${pokemon.name}')">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">
                    <img src="/assets/icon/icon_type_${type}.png" alt="icon_type_">
                    ${type}
                    </li>`).join('')}
                </ol>
                
                <img src="${pokemon.img}" alt="${pokemon.name}">
            </div>
        </li>
    `;
};


// function that render pokemon list
function loadPokemons(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemon = []) => {
        let newHtml = pokemon.map(convertPokemonsDataToLi).join('');
        pokemonList.innerHTML += newHtml;
    });
};

// Function that load more pokemons
loadMoreBtn.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxPokemons) {
        const newLimit = maxRecords - offset
        loadPokemons(offset, newLimit)

        loadMoreBtn.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemons(offset, limit)
    };
});

// Function that show modal
function showModal(pokemonName){
    const url = 'https://pokeapi.co/api/v2/pokemon/' + pokemonName;

    pokemonModal.setAttribute('class', 'enable');

    pokeApi.getPokemonStats(url).then((pokemon) => {
        let newHtml = convertPokemonStatsDataToLi(pokemon);
        pokemonModal.innerHTML = newHtml;
    });

};

// function that close modal
function closeModal() {
    pokemonModal.setAttribute('class', 'disable');
};

// start the pokédex...
loadPokemons(offset, limit);