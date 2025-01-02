// crear instancia de axios para crear una config por defecto para poder trabajar en las consultas más fácil
const api = axios.create({
	baseURL: 'https://api.themoviedb.org/3/', // URL base para todas las peticiones
	headers: {
		'Content-Type': 'application/json;charset=utf8' // Encabezado para JSON
	},
	params: {
		'api_key': API_KEY, // Clave de acceso requerida por la API
		// 'language': 'es-419'
	}
})

// Utils -> para no hacer DRY

// función que renderiza las películas dependiendo el llamado a la API que haya
function createMovies(movies, container, { clean = true } = {}) {
	// si clean esta true se borra todo lo que haya en la sección a introducir las movies
	if(clean) {
		container.innerHTML = ''
	}

	// crear el espacio en el DOM por cada pelicula que haya
	movies.forEach(movie => {
		const movieContainer = document.createElement('div')
		movieContainer.classList.add('movie-container')

		// evento para que cuando se le de click a la pelicula vaya a los detalles de esta
		movieContainer.addEventListener('click', () => {
			location.hash = `#movie=${movie.id}`
		})

		const movieIMG = document.createElement('img')
		movieIMG.classList.add('movie-img')
		movieIMG.setAttribute('alt', movie.title)
		movieIMG.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path)
		movieIMG.setAttribute('loading', 'lazy') // implementación de lazy loading a las imágenes

		// implementar imagen por defecto en caso de que no cargue de la API
		movieIMG.addEventListener('error', () => {
			// agregarle imagen por defecto al src de la imagen
			movieIMG.setAttribute('src', '../images/image404.jpg')
		})

		// renderizar en el DOM
		movieContainer.appendChild(movieIMG)
		container.appendChild(movieContainer)
	})
}

// función que renderiza las categorías de películas dependiendo el llamado a la API que haya
function createCategories(categories, container) {
	// se borra todo lo que haya en este contenedor para despues volverlo a renderizar en el forEach
	container.innerHTML = ''

	// crear el espacio en el DOM por cada genero que haya
	categories.forEach(category => {
		const categoryContainer = document.createElement('div')
		categoryContainer.classList.add('category-container')

		const categoryTitle = document.createElement('h3')
		categoryTitle.classList.add('category-title')
		categoryTitle.setAttribute('id', 'id' + category.id)

		// evento para que cuando se cree una categoria sepa de que se esta hablando
		categoryTitle.addEventListener('click', () => {
			location.hash = `#category=${category.id}-${category.name}`
		})

		const categoryTitleText = document.createTextNode(category.name)

		// renderizar en el DOM
		categoryTitle.appendChild(categoryTitleText)
		categoryContainer.appendChild(categoryTitle)
		container.appendChild(categoryContainer)
	})
}

// llamados a la API

// conseguir peliculas diarias en tendencia de la API para el home
async function getTrendingMoviesPreview(){
	// llamar a la API en la parte de peliculas en tendencia diaria
	const { data } = await api('trending/movie/day')

	const movies = data.results

	// console.log({data, movies})

	// se llama la función que pone las películas en el DOM, en este caso es para las tendencias
	createMovies(movies, trendingMoviesPreviewList)
}

// conseguir categorías de las películas de la API para el home
async function getCategoriesMoviesPreview(){
	// llamar a la API en la parte de genero de películas
	const { data } = await api('genre/movie/list', {
		params: {
			// 'language': 'es-419' // Idioma configurado solo para esta consulta
		}
	})

	const categories = data.genres

	// console.log({data, categories})

	// se llama la función que pone las categorías en el DOM, en este caso es para la lista de categorías en el home
	createCategories(categories, categoriesPreviewList)
}

// conseguir películas de la API dependiendo de la categoría para la vista categorías
async function getMoviesByCategory(id){
	// llamar a la API en la parte de películas por genero para la sección de categorías
	const { data } = await api('discover/movie', {
		params: {
			// enviar query params para filtrar por genero
			with_genres: id
		}
	})

	const movies = data.results

	// console.log({data, movies})

	// se llama la función que pone las películas en el DOM, en este caso es para las películas por categoría
	createMovies(movies, genericSection)
}

// conseguir peliculas de la API dependiendo de lo que se puso en el buscador en la vista search
async function getMoviesBySearch(query){
	// llamar a la API en la parte de buscador de películas para la sección de search
	const { data } = await api('search/movie', {
		params: {
			// enviar query params para filtrar por lo del buscador
			query,
		}
	})

	const movies = data.results

	// console.log({data, movies})

	// se llama la función que pone las películas en el DOM, en este caso es para las películas en la vista de buscador
	createMovies(movies, genericSection)
}

// conseguir peliculas diarias en tendencia de la API para la vista de tendencias
async function getTrendingMovies(page = 1) {
	// llamar a la API en la parte de peliculas en tendencia diaria
	const { data } = await api('trending/movie/day', {
		// se pone la pagina para que cuando se cargue más, carguen mas películas
		params: {
			page
		}
	})

	const movies = data.results

	// console.log({data, movies})

	// se llama la función que pone las películas en el DOM, en este caso es para las tendencias, se pone la paginación
	createMovies(movies, genericSection, { clean: page == 1 });

	// botón para cargar más películas
	const btnLoadMore = document.createElement('button');
	btnLoadMore.innerText = 'Cargar más'
	
	// acción a a ejecutar cuando se le da click, en este caso la función de cargas más películas
	btnLoadMore.addEventListener('click', () => {
		// se quita el botón de cargar mas
		btnLoadMore.style.display = 'none';

		// se vuelve a llamar a la función para conseguir mas películas pero en otra pagina
		getTrendingMovies(page + 1)
	})

	genericSection.appendChild(btnLoadMore);
}

// conseguir los detalles de la pelicula seleccionada del home para la vista detailsPage
async function getMovieById(id){
	// llamar a la API en la parte de detalles de la película seleccionada
	const { data: movie } = await api(`movie/${id}`)

	// Poner la imagen de fondo de la película
	const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path
	headerSection.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%), url(${movieImgUrl})`

	// poner en el DOM los detalles de la película
	movieDetailTitle.textContent = movie.title
	movieDetailDescription.textContent = movie.overview
	movieDetailScore.textContent = movie.vote_average

	// poner la categoría a la que pertenece la película
	createCategories(movie.genres, movieDetailCategoriesList)

	// poner las peliculas recomendadas
	getRelatedMoviesId(id)
}

// conseguir las películas relacionadas para la vista de detalles de película
async function getRelatedMoviesId(id) {
	// llamar a la API en la parte de películas relacionadas
	const { data } = await api(`movie/${id}/similar`)

	const relatedMovies = data.results

	// renderizar las peliculas relacionadas
	createMovies(relatedMovies, relatedMoviesContainer)

	relatedMoviesContainer.scrollTo(0, 0);
}