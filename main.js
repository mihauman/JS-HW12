const photos ={
"male": "images/male.svg",
"female": "images/female.svg",
"n/a": "images/undef.svg",
"none": "images/undef.svg",
"hermaphrodite": "images/undef.svg"
}


const charBtn = document.getElementById('button-people');
const planetsWrap = document.querySelector('.planets');
const planetBtn = document.getElementById('button-planets');
const homeBtn = document.getElementById('button-home');
const nextBtn = document.getElementById('next');
const previousBtn = document.getElementById('previous');
const photo = document.querySelector('.photo');
const char = document.querySelector('.user');
const characters = document.querySelector('.users');
const butWrap = document.querySelector(".button-wrapper");
const inputFilm = document.querySelector(".usersNavigate");
let currentPage;

homeBtn.addEventListener('click', (event) => {
    planetsWrap.innerHTML = '';
    characters.innerHTML = '';
    butWrap.style.paddingTop = '300px';
    nextBtn.style.display = 'none';
    previousBtn.style.display = 'none';
    inputFilm.style.display = 'none';
});

async function getCharacters(currentFilm) {
    const result =  await axios.get(`https://swapi.co/api/films/${currentFilm}`);
    const array = result.data.characters;
    array.forEach(el => {
       let cards = axios.get(el).then(cards => {
       const infoCharacter = document.createElement('div');
       const name = cards.data.name;
       const gender = cards.data.gender
       infoCharacter.innerHTML = `
       <h3>${name}</h3>
       <h5>${cards.data.birth_year}</h5>
       <img class="icon" src="${photos[gender]}"></img>`
       characters.append(infoCharacter);
       infoCharacter.classList.add('user')
       });
    })
}

charBtn.addEventListener('click', (event) => {
    const currentFilmNumber = document.getElementById('filmNavigate').value;
    characters.innerHTML = '';
    planetsWrap.innerHTML = '';
    butWrap.style.paddingTop = '60px';
    nextBtn.style.display = 'none';
    previousBtn.style.display = 'none';
    inputFilm.style.display = 'flex';
    getCharacters(currentFilmNumber).then(film => {})
} 
);

async function getPlanets(currentPage) {
    const result = await axios.get('https://swapi.co/api/planets/' + '?page=' + currentPage);
    return result.data.results;
}

function createColoumPlanets (planets) {
    planetsWrap.innerHTML = '';
    planets.forEach(el => {
        const planet = document.createElement('div');
        planet.innerHTML = `
        <ul class="planetsList">
        <li class="planets_names">${el.name}</li>
        </ul>`;
        planetsWrap.append(planet);
    })
}
 
planetBtn.addEventListener('click', () => {
    characters.innerHTML = '';
    butWrap.style.paddingTop = '60px';
    nextBtn.style.display = 'block';
    inputFilm.style.display = 'none';
    currentPage = 1;
    getPlanets(currentPage).then(createColoumPlanets)
})

nextBtn.addEventListener('click', async function () {
    if (currentPage == 1) {
        nextBtn.style.display = 'block';
        previousBtn.style.display = 'block'
    }
    if (currentPage == 6 ) {
        nextBtn.style.display = 'none'
    }
    currentPage += 1;
    planetsWrap.innerHTML = '';
    await getPlanets(currentPage).then(createColoumPlanets);
})

previousBtn.addEventListener('click', async function () {
    currentPage -= 1;
    if(currentPage == 1) {
        previousBtn.style.display = 'none'
    }
    if (currentPage <= 6) {
        nextBtn.style.display = 'block'
    }
    planetsWrap.innerHTML = '';
    await getPlanets(currentPage).then(createColoumPlanets);
})
