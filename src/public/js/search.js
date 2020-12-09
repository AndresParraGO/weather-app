

const $searchForm = document.getElementById('search-form');

if($searchForm) {
	$searchForm.addEventListener('submit', e => {
		e.preventDefault();
		if(e.target.children[0].value !== '') {
			location.pathname = `/city/${e.target.children[0].value}`;
		}
	});
}