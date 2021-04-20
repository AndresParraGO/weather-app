async function getComments() {
  let res = await fetch('/api/get-comments')
  let data = await res.json()
  return data
}

async function renderComments() {
  const $sectionComments = document.getElementById('section-comments')

  if($sectionComments) {
    $sectionComments.innerHTML = ''
    $sectionComments.innerHTML = '<img src="/assets/loading.gif" class="icon-loading text-center" />'

    let comments = await getComments()
    $sectionComments.innerHTML = ''

    if(comments.length === 0) {
      $sectionComments.innerHTML = '<p class="text-center">Sin comentarios</p>'
    } else {
      comments.forEach(el => {
        let itemComment = document.createElement('article')
        let itemCommentText = document.createElement('p')
        let itemCommentDate = document.createElement('span')
        let itemCommentStars = document.createElement('div')

        let stars = ''
        for(let i = 1; i <= el.stars; i++) {
          stars += '<span class="fas fa-star"></span>'
        }

        itemComment.className = 'animate__animated animate__backInUp m-4 bg-dark p-4'
        itemCommentText.textContent = el.txt
        itemCommentText.className = "fs-4 mb-0"
        itemCommentDate.textContent = el.createdAt
        itemCommentDate.className = "section-comments-date"
        itemCommentStars.innerHTML = stars
        itemCommentStars.className = "section-comments-stars"

        itemComment.appendChild(itemCommentText)
        itemComment.appendChild(itemCommentDate)
        itemComment.appendChild(itemCommentStars)
        $sectionComments.appendChild(itemComment)
      })
    }
  }
}
