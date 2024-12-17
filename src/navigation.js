// aca se encargara de toda la lógica de navegación de la pagina

// cambiar de vista cuando se hace click en la lupa de buscar
searchFormBtn.addEventListener('click', () => {
	location.hash = '#search='
})

// cambiar de vista cuando se hace click en ver mas (del home) para ir a tendencias
trendingBtn.addEventListener('click', () => {
	location.hash = '#trends'
})

// cambiar de vista cuando se hace click en la flechita para ir al home
arrowBtn.addEventListener('click', () => {
	location.hash = '#home'
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
}

function searchPage() {
	console.log('vista de busquedas')

	// estilos correspondientes a los que va en la sección de búsqueda (película detail)
	headerSection.classList.remove('header-container--long')
	headerSection.style.background = ''
	arrowBtn.classList.remove('inactive')
	arrowBtn.classList.remove('header-arrow--white')
	headerTitle.classList.add('inactive')
	headerCategoryTitle.classList.remove('inactive')
	searchForm.classList.remove('inactive')

	trendingPreviewSection.classList.add('inactive')
	categoriesPreviewSection.classList.add('inactive')
	genericSection.classList.remove('inactive')
	movieDetailSection.classList.add('inactive')
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
}