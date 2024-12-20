// aca se encargara de toda la lógica de navegación de la pagina

// cambiar de vista cuando se hace click en la lupa de buscar
searchFormBtn.addEventListener('click', () => {
	// agarrar el valor del input que introduce el usuario y que se ponga en el hash
	location.hash = `#search=${searchFormInput.value}`
})

// cambiar de vista cuando se hace click en ver mas (del home) para ir a tendencias
trendingBtn.addEventListener('click', () => {
	location.hash = '#trends'
})

// cambiar de vista cuando se hace click en la flechita para ir a lo anterior buscado
arrowBtn.addEventListener('click', () => {
	if (window.history.length <= 2) {
		location.hash = '#home'
	} else {
		location.hash = window.history.back()
	}
})

// llamar a navigator cuando cargue la pagina
window.addEventListener('DOMContentLoaded', navigator)
// llamar a navigator cuando cambie el hash
window.addEventListener('hashchange', navigator, false)

// esta función se llamara cuando cargue la aplicación y cuando cambie el has de la página
function navigator() {
	console.log({location})

	// se puede hacer de esta manera el cambios de los hash para el navigator
	if(location.hash.startsWith('#trends')) {
		trendsPage()
	} else if (location.hash.startsWith('#search=')) {
		searchPage()
	} else if (location.hash.startsWith('#movie=')) {
		movieDetailsPage()
	} else if (location.hash.startsWith('#category=')) {
		categoryPage()
	} else {
		homePage()
	}

	// se llama el scrollTop para que siempre la vista empiece desde arriba
	document.documentElement.scrollTop = 0
}

// function por cada uno de los hash que se pueden tener
function homePage() {
	console.log('vista home')

	// estilos correspondientes a los que va en la sección de home
	headerSection.classList.remove('header-container--long')
	headerSection.style.background = ''
	arrowBtn.classList.add('inactive')
	arrowBtn.classList.remove('header-arrow--white')
	headerTitle.classList.remove('inactive')
	headerCategoryTitle.classList.add('inactive')
	searchForm.classList.remove('inactive')

	trendingPreviewSection.classList.remove('inactive')
	categoriesPreviewSection.classList.remove('inactive')
	genericSection.classList.add('inactive')
	movieDetailSection.classList.add('inactive')

	// llamar funciones de la api del home
	getTrendingMoviesPreview()
	getCategoriesMoviesPreview()
}

function categoryPage() {
	console.log('vista de categorias')

	// estilos correspondientes a los que va en la sección de categorias
	headerSection.classList.remove('header-container--long')
	headerSection.style.background = ''
	arrowBtn.classList.remove('inactive')
	arrowBtn.classList.remove('header-arrow--white')
	headerTitle.classList.add('inactive')
	headerCategoryTitle.classList.remove('inactive')
	searchForm.classList.add('inactive')

	trendingPreviewSection.classList.add('inactive')
	categoriesPreviewSection.classList.add('inactive')
	genericSection.classList.remove('inactive')
	movieDetailSection.classList.add('inactive')

	// conseguir el id de la categoría
	const idMovie = location.hash.split('=')[1].split('-')[0]

	// conseguir el nombre de la categoría e insertarlo
	let categoryName = location.hash.split('=')[1].split('-')[1]

	// reemplazar los espacios para que funcione bien
	categoryName = categoryName.replaceAll('%20', ' ')

	headerCategoryTitle.innerHTML = categoryName

	// mostrar las películas por la categoría seleccionada
	getMoviesByCategory(idMovie)
}

function movieDetailsPage() {
	console.log('vista de movies')

	// estilos correspondientes a los que va en la sección de películas
	headerSection.classList.add('header-container--long')
	// headerSection.style.background = ''
	arrowBtn.classList.remove('inactive')
	arrowBtn.classList.add('header-arrow--white')
	headerTitle.classList.add('inactive')
	headerCategoryTitle.classList.add('inactive')
	searchForm.classList.add('inactive')

	trendingPreviewSection.classList.add('inactive')
	categoriesPreviewSection.classList.add('inactive')
	genericSection.classList.add('inactive')
	movieDetailSection.classList.remove('inactive')

	// traer el id de la película
	const idMovie = location.hash.split('=')[1]

	// llamado a la función que trae los detalles de la película
	getMovieById(idMovie)
}

function searchPage() {
	console.log('vista de busquedas')

	// estilos correspondientes a los que va en la sección de búsqueda (película detail)
	headerSection.classList.remove('header-container--long')
	headerSection.style.background = ''
	arrowBtn.classList.remove('inactive')
	arrowBtn.classList.remove('header-arrow--white')
	headerTitle.classList.add('inactive')
	headerCategoryTitle.classList.add('inactive')
	searchForm.classList.remove('inactive')

	trendingPreviewSection.classList.add('inactive')
	categoriesPreviewSection.classList.add('inactive')
	genericSection.classList.remove('inactive')
	movieDetailSection.classList.add('inactive')

	// conseguir lo que el user introduce en el buscador
	let query = location.hash.split('=')[1]

	// reemplazar los espacios para que funcione bien
	query = query.replaceAll('%20', ' ')
	console.log(`Buscando la película: ${query}`)

	// mostrar las películas dependiendo de lo que se puso en el buscador
	getMoviesBySearch(query)
}

function trendsPage() {
	console.log('vista trends')

	// estilos correspondientes a los que va en la sección de tendencias
	headerSection.classList.remove('header-container--long')
	headerSection.style.background = ''
	arrowBtn.classList.remove('inactive')
	arrowBtn.classList.remove('header-arrow--white')
	headerTitle.classList.add('inactive')
	headerCategoryTitle.classList.remove('inactive')
	searchForm.classList.add('inactive')

	trendingPreviewSection.classList.add('inactive')
	categoriesPreviewSection.classList.add('inactive')
	genericSection.classList.remove('inactive')
	movieDetailSection.classList.add('inactive')

	// agregar titulo de tendencias para la vista tendencias
	headerCategoryTitle.innerHTML = 'Tendencias'

	// llamar a que se muestre las tendencias diarias de forma completa para la vista tendencias
	getTrendingMovies()
}