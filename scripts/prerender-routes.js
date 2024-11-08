// /pokemons/page/1
// /pokemons/page/2
// /pokemons/page/3
// /pokemons/page/4
// /pokemons/page/5
// /pokemons/pikachu

const TOTAL_POKEMONS = 10;
const TOTAL_PAGES = 5;

(async () => {

    const fs = require('fs');

    // Pagina de pokemon
    const pokemonIds = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1);
    let fileContent = pokemonIds.map(
        id => `/pokemons/${id}`
    ).join('\n');

    // Pagina de pokemons
    const totalPages = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);
    fileContent += '\n' + totalPages.map(id => `/pokemons/page/${id}`).join('\n');


    // Por nombre de pokemons
    const pokemonNameList = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${TOTAL_POKEMONS}`)
        .then(res => res.json());


    fileContent += '\n';
    fileContent += pokemonNameList.results.map((pokemon) => `/pokemons/${pokemon.name}`).join('\n');


    fs.writeFileSync('routes.txt', fileContent);
    console.log(`Routes.txt Generated`);

})();