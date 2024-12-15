// conseguir peliculas en tendencia de la API para el home
async function getTrendingMoviesPreview(){
	// llamar a la API en la parte de peliculas en tendencia diaria
	const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY)

	const data = await res.json()

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

getTrendingMoviesPreview()