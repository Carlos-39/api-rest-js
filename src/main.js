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

// conseguir peliculas en tendencia de la API para el home
async function getTrendingMoviesPreview(){
	// llamar a la API en la parte de peliculas en tendencia diaria
	const { data } = await api('trending/movie/day')

	const movies = data.results

	console.log({data, movies})

	// crear el espacio en el DOM por cada pelicula que haya
	movies.forEach(movie => {
		const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')

		const movieContainer = document.createElement('div')
		movieContainer.classList.add('movie-container')

		const movieIMG = document.createElement('img')
		movieIMG.classList.add('movie-img')
		movieIMG.setAttribute('alt', movie.title)
		movieIMG.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path)

		// renderizar en el DOM
		movieContainer.appendChild(movieIMG)
		trendingPreviewMoviesContainer.appendChild(movieContainer)
	})
}

// conseguir categorías de las películas de la API para el home
async function getCategoriesMoviesPreview(){
	// llamar a la API en la parte de genero de películas
	const { data } = await api('genre/movie/list', {
		params: {
			'language': 'es-419' // Idioma configurado solo para esta consulta
		}
	})

	const categories = data.genres

	console.log({data, categories})

	// crear el espacio en el DOM por cada genero que haya
	categories.forEach(category => {
		const categoryPreviewMoviesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list')

		const categoryContainer = document.createElement('div')
		categoryContainer.classList.add('category-container')

		const categoryTitle = document.createElement('h3')
		categoryTitle.classList.add('category-title')
		categoryTitle.setAttribute('id', 'id' + category.id)
		const categoryTitleText = document.createTextNode(category.name)

		// renderizar en el DOM
		categoryTitle.appendChild(categoryTitleText)
		categoryContainer.appendChild(categoryTitle)
		categoryPreviewMoviesContainer.appendChild(categoryContainer)
	})
}