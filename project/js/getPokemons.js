const pokemonList = [];

async function getTenPokemons() {
  let pokemon = {};
  for (let i = 0; i < 3; i++) {

    pokemon = await getRandomPokemon();
    await pokemonList.push(pokemon);
    await createPokemonCard(pokemon);
  }
}

async function printFilter() {
  let pokemons = await filterByPokemonName();
  removeAllChild();

  for (const key in pokemons) {
    await createPokemonCard(pokemons[key]);
  }
}

async function filterByPokemonName() {
  const textSearch = document.getElementById('search-input').value;
  return pokemonList.filter(function (pokemon) {
    return (pokemon.name).toLowerCase().indexOf(textSearch.toLowerCase()) > -1;
  });
}

async function createPokemonCard(pokemon) {
  if (pokemon === undefined) {
    pokemon = await getRandomPokemon();
    pokemonList.push(pokemon);
  }
  const out = document.querySelector('#cards');
  const temp = document.getElementById('template');
  const clonedTemplate = temp.content.cloneNode(true);

  let id = clonedTemplate.querySelector('.id');
  let img = clonedTemplate.querySelector('img');
  let name = clonedTemplate.querySelector('.pokemonName');
  let type = clonedTemplate.querySelector('.pokemonType');

  id.textContent = `#${pokemon.id}`;
  img.setAttribute('src', pokemon.url);
  name.textContent = pokemon.name;

  const pokeType = pokemon.type;
  if (pokeType != null) {
    type.textContent = `Type: ${pokeType}`;
  } else {
    type.textContent = `Type: in progress ...`
  }
  out.appendChild(clonedTemplate);
}


function removeAllChild() {
  let element = document.getElementById('cards');
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}


async function getRandomPokemon() {
  let pokemon = {}
  let randomNumber = getRandom(1, 1100);

  await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`)
    .then(obj => obj.json())
    .then(pok => {
      const name = pok.name[0].toUpperCase() + pok.name.slice(1);
      const type = pok.types.map(type => type.type.name)[0];
      const id = pok.id;
      const weight = pok.weight;
      const height = pok.height;
      const url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${randomNumber}.png`;

      pokemon.name = name;
      pokemon.type = type;
      pokemon.id = id;
      pokemon.weight = weight;
      pokemon.height = height;
      pokemon.url = url;
    })
  return pokemon;
}