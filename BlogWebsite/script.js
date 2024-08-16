document.addEventListener('DOMContentLoaded', () => {
    const articleId = new URLSearchParams(window.location.search).get('id');
    const articleContent = document.getElementById('article-content');
    const commentsList = document.getElementById('comments-list');
    const commentForm = document.getElementById('comment-form');

    // Fetch article data
    fetch('data/articles.json')
        .then(response => response.json())
        .then(data => {
            const article = data.find(a => a.id == articleId);
            if (article) {
                articleContent.innerHTML = `
                    <h2>${article.title}</h2>
                    <p>${article.content}</p>
                `;
                loadComments(articleId);
            } else {
                articleContent.innerHTML = `<p>Article not found.</p>`;
            }
        })
        .catch(error => console.error('Error fetching article data:', error));

    // Load comments for the article
    function loadComments(articleId) {
        const comments = JSON.parse(localStorage.getItem(`comments-${articleId}`)) || [];
        commentsList.innerHTML = comments.map(c => `
            <div class="comment">
                <p><strong>${c.name}</strong> (${c.email}):</p>
                <p>${c.comment}</p>
            </div>
        `).join('');
    }

    // Handle comment form submission
    commentForm.addEventListener('submit', event => {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const comment = document.getElementById('comment').value;

        const newComment = { name, email, comment };
        const comments = JSON.parse(localStorage.getItem(`comments-${articleId}`)) || [];
        comments.push(newComment);
        localStorage.setItem(`comments-${articleId}`, JSON.stringify(comments));
        
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('comment').value = '';

        loadComments(articleId);
    });
});

function toggleMenu() {
    const navLinks = document.getElementById("nav-links");
    navLinks.classList.toggle("show");
}