import {
  device,
  showCards,
  orderAscMaxCP,
  orderDesMaxCP,
  filterFleeRate,
  filterSpawn,
  alphaOrderAZ,
  alphaOrderZA,
  filterRegion,
  searchPkm,
  filterPkmType,
} from './data.js';

import data from './data/pokemon/pokemon.js';

// PARA EL DESLIZANTE DEL MENU EN MOBILE
if (device() === 'Mobile') {
  document.querySelectorAll('.menu>ul>li>span').forEach((elem) => {
    elem.addEventListener('click', (e) => {
      e.currentTarget.parentElement.querySelector('.subMenu').classList.toggle('hide');
    });
  });
}

// PARA EL BUSCADOR DESPLEGABLE
const iconSearch = document.getElementById('searchToggle');
iconSearch.addEventListener('click', () => {
  document.getElementById('searchBox').classList.toggle('searchBox-opened');
});

// FUNCIÓN QUE MUESTRA A LOS POKEMON
const dataContainer = document.querySelector('#dataContainer');
dataContainer.innerHTML = showCards(data.pokemon);

const az = document.getElementById('orderAZ');

az.addEventListener('click', () => {
  dataContainer.innerHTML = showCards(alphaOrderAZ(data.pokemon));
});

const za = document.getElementById('orderZA');

za.addEventListener('click', () => {
  dataContainer.innerHTML = showCards(alphaOrderZA(data.pokemon));
});

// FUNCIONES QUE ORDENAN POR MAX-CP ASCENDENTE
const ascMaxCP = document.getElementById('ascMaxCP');

ascMaxCP.addEventListener('click', () => {
  dataContainer.innerHTML = showCards(orderAscMaxCP(data.pokemon));
});

// FUNCIONES QUE ORDENAN POR MAX-CP DESCENDENTE

const desMaxCP = document.getElementById('desMaxCP');

desMaxCP.addEventListener('click', () => {
  dataContainer.innerHTML = showCards(orderDesMaxCP(data.pokemon));
});

// FUNCIÓN QUE FILTRA POR TIPO
const types = document.querySelectorAll('.type>li');
types.forEach((li) => {
  li.addEventListener('click', () => {
    dataContainer.innerHTML = showCards(filterPkmType(data.pokemon, li.innerText.toLowerCase()));
  });
});

/* Son 18 tipos de pokemons de manera que no sería optimo crear 18 ID's y llamarlos a los 18 con
los getElementById, por eso utilizo el querySelectorAll para acceder a una clase que todos tengan
en común y al igual que en css accedo a los elementos que quiero manipular dentro de esa clase
(.type>li). Ahora bien el querySelectorAll me retorna un array con todos los elementos que necesito
entonces yo quiero añadirle a cada elemento de ese array el evento click, por eso le aplico el
forEach para que se "ejecute la función (añadir a cada <li> el evento click) una vez por cada
elemento (<li>)". En los parámetros de la función de filtrado pongo el array de objetos de pokemon
y el elemento HTML <li>.innerText para acceder al texto dentro de esa etiqueta
(el tipo de pokemon seleccionado por el usuario). */

// FUNCIONES QUE FILTRAN POR % DE HUÍDA
const escape = document.querySelectorAll('.escape>li');

escape.forEach((li) => {
  li.addEventListener('click', () => {
    dataContainer.innerHTML = showCards(filterFleeRate(data.pokemon, li.innerText.toLowerCase()));
  });
});

// FUNCIÓN QUE FILTRA POR % APARICIÓN
const capture = document.querySelectorAll('.spawn>li');
capture.forEach((li) => {
  li.addEventListener('click', () => {
    dataContainer.innerHTML = showCards(filterSpawn(data.pokemon, li.innerText.toLowerCase()));
  });
});

// FUNCIÓN DE FILTRO POR REGIÓN
const region = document.querySelectorAll('.region>li');
region.forEach((li) => {
  li.addEventListener('click', () => {
    dataContainer.innerHTML = showCards(filterRegion(data.pokemon, li.innerText.toLowerCase()));
  });
});

const inputSearch = document.getElementById('searchPkm');
inputSearch.addEventListener('keyup', () => {
  const pokeName = inputSearch.value.toLowerCase().trim();
  dataContainer.innerHTML = showCards(searchPkm(data.pokemon, pokeName));
  if (dataContainer.innerHTML !== data.pokemon.name.indexOF()) {
    dataContainer.innerHTML = `
    <section class="errorMessage">
      <p class="message"> Ningún POKÉMON coincide con tu búsqueda</p>
    </section>
    `;
  }
});

/* const a = data.pokemon.map((elem) => elem.encounter['base-flee-rate']);
 console.log(new Set(a));
const a = data.pokemon.map((elem) => elem['spawn-chance']);
console.log(new Set(a)); */
