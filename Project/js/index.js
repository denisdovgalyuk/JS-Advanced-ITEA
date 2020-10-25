const prev = document.querySelector('#prev');
const next = document.querySelector('#next');

let prevUrl = '';
let nextUrl = '';
let searchPeople = 'https://swapi.dev/api/people/?search=';

let dataPerson = {
	name: '',
	birth_year: '',
	gender: '',
	films: '',
	homeworld: '',
	species: ''
}

prev.addEventListener('click', prevStep);
next.addEventListener('click', nextStep);

(function initialization() {
	let url = '';

	if (!sessionStorage.getItem('api')) {
		url = 'https://swapi.dev/api/people/?page=1';
		sessionStorage.setItem('api', url);
	} else {
		url = sessionStorage.getItem('api');
	}
	
	request(url);
}());

function request(url) {
	fetch(url)
		.then((resp) => resp.json())
		.then((data) => {
			render(data.results);
			
			return data;
		}) 
		.then((data) => {
			prevUrl = data.previous;
			nextUrl = data.next;
		})  
		.catch((error) => console.error(error))
}

function getPersonInfo(url) {
	fetch(url) 
		.then((resp) => resp.json())
		.then((data) => {
			dataPerson.name = data.results[0].name;
			dataPerson.birth_year = data.results[0].birth_year;
			dataPerson.gender = data.results[0].gender;

			return data;
		})
		.then((data) => {
			return getFilms(data.results[0].films)
				.then((done) => {
					dataPerson.films = done;
					return data;
				})
		})
		.then((data) => {
			getHomeWorld(data.results[0].homeworld)
			return getHomeWorld(data.results[0].homeworld)
				.then((done) => {
					dataPerson.homeworld = done;
					return data;
				})
		})
		.then((data) => {
			if (data.results[0].species.length) {
				return getSpecies(data.results[0].species)
					.then((done) => {
						dataPerson.species = done;
						return data;
					})
			} else {
				dataPerson.species = '-'
			}
		})
		.then(() =>  {
			updatePeopleInfo()
		})
		.then(() => showModalEvent())
		.catch((err) => console.log(err))
}

function getFilms(films) {
	let arrFilms = [];
	return new Promise(function (resolve, reject) {
		films.forEach((api) => {
			fetch(api)
				.then((resp) => resp.json())
				.then((data) => {
					arrFilms.push(data.title)
					resolve(arrFilms);
				})
		});
	})
}

function getHomeWorld(api) {
	return new Promise(function (resolve, reject) {
		fetch(api)
			.then((resp) => resp.json())
			.then((data) => resolve(data.name));
	})
}

function getSpecies(api) {
	return new Promise(function (resolve, reject) {
		fetch(api)
		.then((resp) => resp.json())
		.then((data) => resolve(data.name))
	})
}

function render(people) {
	let block_wrapp = document.querySelector('.block-wrapper');
	block_wrapp.innerHTML = '';

	people.forEach((person) => {
		let block = document.createElement('div');
		block.classList = 'block show-modal';
		block.textContent = person.name;
		
		block_wrapp.appendChild(block);
	});

	windowModal();
}

function updatePeopleInfo() {
	return new Promise(function(resolve, reject) {
		const name = document.getElementById('name');
		const birth_year = document.getElementById('birth-year');
		const gender = document.getElementById('gender');
		const films = document.getElementById('films');
		const homeworld = document.getElementById('homeworld');
		const species = document.getElementById('species');
		const filmList = document.createElement('ul');

		filmList.classList = 'film-list';
		films.innerHTML = '';
		films.appendChild(filmList);	

		name.textContent = dataPerson.name;
		birth_year.textContent = dataPerson.birth_year;
		gender.textContent = dataPerson.gender;

		dataPerson.films.forEach((film) => {

			let filmItem = document.createElement('li');
			filmItem.textContent = film;

			filmList.appendChild(filmItem);

		})

		homeworld.textContent = dataPerson.homeworld;
		species.textContent = dataPerson.species;
		resolve()
	})
}

function prevStep() {
	if (prevUrl !== null) {
		sessionStorage.setItem('api', prevUrl);
		request(prevUrl);
	}
}

function nextStep() {
	if (nextUrl !== null) {
		sessionStorage.setItem('api', nextUrl);
		request(nextUrl);
	}
}

function windowModal () {
	let showModal = document.querySelectorAll('.show-modal'),
		overlay = document.querySelector('.overlay'),
		hideModal = document.querySelectorAll('.hide-modal');

	showModal.forEach((item) => item.addEventListener('click', getDatePerson)); 
	hideModal.forEach((item) => item.addEventListener('click', hideModalEvent));

	function getDatePerson(e) {
		let api = searchPeople + e.target.textContent;
		getPersonInfo(api);
	}

	function hideModalEvent() {
		let parentModal = this.closest('.modal');
		parentModal.classList.remove('active');
		overlay.classList.remove('active');
	}

};

function showModalEvent() {
	let modalElem = document.querySelector('.modal'),
	overlay = document.querySelector('.overlay');
	modalElem.classList.add('active');
	overlay.classList.add('active');
}