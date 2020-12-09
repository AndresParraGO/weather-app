
async function getComments() {
	let res = await fetch('/api/get-comments');
	let data = await res.json();
	return data;
}

async function renderComments() {
	const $sectionComments = document.getElementById('section-comments');

	if($sectionComments) {
		$sectionComments.innerHTML = '';
		$sectionComments.innerHTML = '<img src="/assets/loading.gif" class="icon-loading text-center" />';
		
		let comments = await getComments();
		$sectionComments.innerHTML = '';

		if(comments.length === 0) {
			$sectionComments.innerHTML = '<p class="text-center">Sin comentarios</p>';
		} else {
			comments.forEach(el => {
				let itemComment = document.createElement('article');

				let stars = '';
				for(let i = 1; i <= el.stars; i++) {
					stars += '<span class="fas fa-star"></span>';
				}

				itemComment.className = 'animate__animated animate__backInUp m-4 bg-dark p-4';
				itemComment.innerHTML = `
					<p class="fs-4 mb-0">${el.txt}</p>
					<span class="section-comments-date">${el.createdAt}</span>
					<div class="section-comments-stars">${stars}</div>
				`;
				$sectionComments.appendChild(itemComment);
			});
		}
	}


}
