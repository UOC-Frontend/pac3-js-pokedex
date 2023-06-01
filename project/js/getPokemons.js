const pokemonList = [];

async function getTenPokemons() {
  let pokemon = {};
  for (let i = 0; i < 10; i++) {

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

  let article = clonedTemplate.querySelector('.card');
  let id = clonedTemplate.querySelector('.id');
  let img = clonedTemplate.querySelector('img');
  let name = clonedTemplate.querySelector('.pokemonName');
  let type = clonedTemplate.querySelector('.pokemonType');

  article.setAttribute('id', `${pokemon.id}`);
  article.addEventListener('click', miFunc)
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

function miFunc(e) {
  pokemonList.forEach(pokemon => {
    console.log(pokemon)
    if (pokemon.id == this.id) {
      removeAllChild();
      showExtraInformation(pokemon);
    }
  });
}

async function showExtraInformation(pokemon) {
  const out = document.querySelector('#cards');
  const temp = document.getElementById('extraInfoTemplate');
  const clonedTemplate = temp.content.cloneNode(true);

  let article = clonedTemplate.querySelector('.cardExtend');
  let id = clonedTemplate.querySelector('.id');
  let img = clonedTemplate.querySelector('img');
  let name = clonedTemplate.querySelector('.pokemonName');
  let type = clonedTemplate.querySelector('.pokemonType');

  let weight = clonedTemplate.querySelector('.weight');
  let height = clonedTemplate.querySelector('.height');
  let abilities = clonedTemplate.querySelector('.abilities');
  let hp = clonedTemplate.querySelector('.hp');
  let attack = clonedTemplate.querySelector('.attack');
  let defense = clonedTemplate.querySelector('.defense');

  article.setAttribute('id', `${pokemon.id}`);
  article.addEventListener('click', miFunc);

  img.setAttribute('src', pokemon.url);
  id.textContent = `#${pokemon.id}`;
  name.textContent = pokemon.name;
  weight.textContent = pokemon.weight;
  height.textContent = pokemon.height;
  abilities.textContent = pokemon.abilities[0].ability.name;
  hp.textContent = pokemon.stats[0].base_stat;
  attack.textContent = pokemon.stats[1].base_stat;
  defense.textContent = pokemon.stats[2].base_stat;

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

  let imgNumber = addZerosBeforeRandomNumber(randomNumber);

  await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`)
    .then(obj => obj.json())
    .then(pok => {
      //console.dir(pok)
      const name = pok.name[0].toUpperCase() + pok.name.slice(1);
      const type = pok.types.map(type => type.type.name)[0];
      const id = pok.id;
      const weight = pok.weight;
      const height = pok.height;
      const url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${imgNumber}.png`;
      const abilities = pok.abilities
      const stats = pok.stats;
      const sprites = pok.sprites;

      pokemon.id = id;
      pokemon.name = name;
      pokemon.type = type;
      pokemon.url = url;
      pokemon.weight = weight;
      pokemon.height = height;
      pokemon.abilities = abilities;
      pokemon.stats = stats;
      pokemon.sprites = sprites;

    })
  console.log(pokemon)
  return pokemon;
}