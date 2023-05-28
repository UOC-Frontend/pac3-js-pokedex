
function getFact() {
  let randomNumber = getRandom(1, 1100);
  console.log(randomNumber);

  fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`)
    .then(x => x.json())
    .then(fact => {  // fact es todo el objeto que recibimos
      console.dir(fact);
      //console.log(card)
      const out = document.querySelector('#cards'); // seleccionar body y guardarlo en una variable
      const temp = document.getElementById('template'); // seleccionar template y guardarlo en una variable
      const clonedTemplate = temp.content.cloneNode(true); // clonar template

      let card = clonedTemplate.querySelector('.card');
      let randomFact = clonedTemplate.querySelector('.fact'); // seleccionar el p y guardarlo en una variable
      let label = clonedTemplate.querySelector('label');  // seleccionar el label y guardarlo en variable
      let check = clonedTemplate.querySelector('input'); // seleccionar checkbox y guardarlo en una variable

      let img = clonedTemplate.querySelector('img'); // seleccionar la img y guardarla en la variable
      let name = clonedTemplate.querySelector('.pokemonName');
      let type = clonedTemplate.querySelector('.pokemonType');

      img.setAttribute('src', `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${randomNumber}.png`)
      name.textContent = fact.name[0].toUpperCase() + fact.name.slice(1);

      const pokeType = fact.types.map(type => type.type.name)[0];

      if (pokeType != null) {
        type.textContent = `Type: ${pokeType}`;
      } else {
        type.textContent = `Type: in progress ...`
      }



      //card.setAttribute('pokemonName', fact.name);
      //name.textContent = fact.name;
      /**
       card.setAttribute('id', fact.id);
      randomFact.textContent = fact.value;
      
      label.setAttribute('for', `check-${fact.id}`);
      check.setAttribute('id', `check-${fact.id}`);
       */

      // https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.img
      out.appendChild(clonedTemplate);
    })
}

let counter = 0;
function count(me) {
  console.log(me);
  (me.checked) ? counter++ : counter--;
  document.getElementById('likes').innerText = counter;
}



