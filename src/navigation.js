// aca se encargara de toda la lógica de navegación de la pagina

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

	// llamar funciones de la api del home
	getTrendingMoviesPreview()
	getCategoriesMoviesPreview()
}

function categoryPage() {
	console.log('vista de categorias')
}

function movieDetailsPage() {
	console.log('vista de movies')
}

function searchPage() {
	console.log('vista de busquedas')
}

function trendsPage() {
	console.log('vista trends')
}