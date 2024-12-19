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
function createMovies(movies, container) {
	// se borra todo lo que haya en este contenedor para despues volverlo a renderizar en el forEach
	container.innerHTML = ''

	// crear el espacio en el DOM por cada pelicula que haya
	movies.forEach(movie => {
		const movieContainer = document.createElement('div')
		movieContainer.classList.add('movie-container')

		const movieIMG = document.createElement('img')
		movieIMG.classList.add('movie-img')
		movieIMG.setAttribute('alt', movie.title)
		movieIMG.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path)

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
async function getTrendingMovies(){
	// llamar a la API en la parte de peliculas en tendencia diaria
	const { data } = await api('trending/movie/day')

	const movies = data.results

	// console.log({data, movies})

	// se llama la función que pone las películas en el DOM, en este caso es para las tendencias
	createMovies(movies, genericSection);
}