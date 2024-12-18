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

// conseguir peliculas diarias en tendencia de la API para el home
async function getTrendingMoviesPreview(){
	// llamar a la API en la parte de peliculas en tendencia diaria
	const { data } = await api('trending/movie/day')

	const movies = data.results

	// console.log({data, movies})

	// se borra todo lo que haya en este contenedor para despues volverlo a renderizar en el forEach
	trendingMoviesPreviewList.innerHTML = ""

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
		trendingMoviesPreviewList.appendChild(movieContainer)
	})
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

	// se borra todo lo que haya en este contenedor para despues volverlo a renderizar en el forEach
	categoriesPreviewList.innerHTML = ""

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
		categoriesPreviewList.appendChild(categoryContainer)
	})
}

// conseguir películas de la API dependiendo de la categoría para la vista categorías
async function getMoviesByCategory(id){
	// llamar a la API en la parte de películas por genero para la sección de categorías
	const { data } = await api('/discover/movie', {
		params: {
			// enviar query params para filtrar por genero
			with_genres: id
		}
	})

	const movies = data.results

	// console.log({data, movies})

	// se borra todo lo que haya en este contenedor para despues volverlo a renderizar en el forEach
	genericSection.innerHTML = ""

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
		genericSection.appendChild(movieContainer)
	})
}