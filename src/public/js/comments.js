



function initComments() {

	// Render Comments
	renderComments();

	const $iconComment = document.getElementById('icon-comment');
	const $commentContent = document.getElementById('comment-content');
	const $commentForm = document.getElementById('comment-form');

	const $commentStars = Array.from(document.querySelectorAll('.comment-stars span'));

	let points = null;

	function createComment(txt, stars) {
		fetch('/api/new-comment', {
			method: 'POST',
			body: JSON.stringify({ txt: txt, stars: stars }),
			headers: { 'Content-Type': 'application/json' }
		})
		.then(res => res.json())
		.then(data => $commentContent.classList.remove('active'));
	}



	document.addEventListener('click', e => {
		if(e.toElement.id == 'icon-comment'|| e.toElement.parentElement.id == 'icon-comment') {
			$commentContent.classList.toggle('active');	
 		}
	});

	$commentStars.forEach((el, i, arr) => {
		el.addEventListener('click', e => {
			points = el.getAttribute('data-value');
			arr.forEach((element, index) => {
				if(index < points) {
					element.classList.add('active')
				} else {
					element.classList.remove('active');
				}
			});
		});
	});


	// Event Form Submit
	$commentForm.addEventListener('submit', e => {
		e.preventDefault();
		let inputText = e.target.children[0].value;

		if(inputText.length <= 0 || points === null) {
			alert('Debes dar un puntaje y dejar un comentario')
		} else {	
			createComment(inputText, points);
			renderComments();
		}

	});

}

document.addEventListener('DOMContentLoaded', initComments);