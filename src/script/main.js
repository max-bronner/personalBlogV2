(() => {
  const filters = document.querySelector('.blog__filters');
  const posts = document.querySelectorAll('.card');
  const categorySelect = document.getElementById('category-select');
  const sortSelect = document.getElementById('sort-select');
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const showingCount = document.getElementById('showing-count');

  const filterPosts = () => {
    const category = categorySelect.value;
    const sortBy = sortSelect.value;
    const searchTerm = searchInput.value.toLowerCase();

    let visibleCount = 0;

    posts.forEach((post) => {
      const postCategory = post.dataset.category;
      const postTitle = post
        .querySelector('.card__title')
        .textContent.toLowerCase();
      const postExcerpt = post
        .querySelector('.card__excerpt')
        .textContent.toLowerCase();

      const matchesCategory = category === 'all' || postCategory === category;
      const matchesSearch =
        searchTerm === '' ||
        postTitle.includes(searchTerm) ||
        postExcerpt.includes(searchTerm);

      if (matchesCategory && matchesSearch) {
        post.style.display = 'block';
        visibleCount++;
      } else {
        post.style.display = 'none';
      }
    });

    showingCount.textContent = visibleCount;

    sortPosts(sortBy);
  };

  const sortPosts = (sortBy) => {
    const postGrid = document.querySelector('.blog__grid');
    const visiblePosts = Array.from(posts).filter(
      (post) => post.style.display !== 'none',
    );

    visiblePosts.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.dataset.date) - new Date(a.dataset.date);
      } else {
        return new Date(a.dataset.date) - new Date(b.dataset.date);
      }
    });

    visiblePosts.forEach((post) => {
      postGrid.appendChild(post);
    });
  };

  if (filters) {
    categorySelect.addEventListener('change', filterPosts);
    sortSelect.addEventListener('change', filterPosts);
    searchButton.addEventListener('click', filterPosts);
    searchInput.addEventListener('keyup', function (e) {
      if (e.key === 'Enter') {
        filterPosts();
      }
    });
  }

  sortPosts('newest');
})();
