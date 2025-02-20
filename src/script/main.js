const createBlogPreview = (element) => {
  const state = {
    currentIndex: 0,
    INTERVAL_TIME: 16000,
  };

  const previewItems = element.querySelectorAll('.post-preview__item');
  const listItems = element.querySelectorAll('.post-list__item');

  const updateActiveElement = (item, i) => {
    item.classList.toggle('is-active', i === state.currentIndex);
  };

  const handleMouseEnter = (event) => {
    const listItem = event.target.closest('.post-list__item');
    if (listItem) {
      state.currentIndex = Number(listItem.dataset.index ?? 0);
      previewItems.forEach(updateActiveElement);
      listItems.forEach(updateActiveElement);
    }
  };

  const setupEventListeners = () => {
    const postList = element.querySelector('.post-list');
    postList.addEventListener('mouseenter', handleMouseEnter, true);
    postList.addEventListener('focus', handleMouseEnter, true);
  };

  setupEventListeners();
};

const blogPreviewElement = document.querySelector('.blog-preview');
if (blogPreviewElement) {
  createBlogPreview(blogPreviewElement);
}
