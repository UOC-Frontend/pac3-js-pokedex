async function getTenPokemons() {
  for (let i = 0; i < 10; i++) {
    await createPokemonCard();
  }
}

async function createPokemonCard() {

  const pokemon = await getPokemon();
  console.log(pokemon);

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


async function getPokemons() {
  let randomNumber = getRandom(1, 1100);
  console.log(`Random -> ${randomNumber}`);

  // await indica que se espera a que la respuesta esté completa
  let object = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`)
    .then(x => x.json())
    .then(pokemon => {
      console.dir("JÉLOU\n" + pokemon);
    })
}


async function getPokemon() {
  let pokemon = {}
  let randomNumber = getRandom(1, 1100);

  await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`)
    .then(obj => obj.json())
    .then(pok => {
      console.dir(pok);

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