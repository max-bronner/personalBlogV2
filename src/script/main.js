const createBlogPreview = (element) => {
  const state = {
    currentIndex: 0,
    // intervalId: null,
    INTERVAL_TIME: 16000,
  };

  const previewItems = element.querySelectorAll('.post-preview__item');
  const listItems = element.querySelectorAll('.post-list__item');

  const updateActiveElement = (item, i) => {
    item.classList.toggle('is-active', i === state.currentIndex);
  };

  /* const stopRotation = () => {
    if (state.intervalId) {
      clearInterval(state.intervalId);
      state.intervalId = null;
    }
  };

  const startRotation = () => {
    stopRotation();
    state.intervalId = setInterval(() => {
      state.currentIndex = (state.currentIndex + 1) % previewItems.length;
      previewItems.forEach(updateActiveElement);
      listItems.forEach(updateActiveElement);
    }, state.INTERVAL_TIME);
  }; */

  const handleMouseEnter = (event) => {
    const listItem = event.target.closest('.post-list__item');
    if (listItem) {
      state.currentIndex = Number(listItem.dataset.index ?? 0);
      previewItems.forEach(updateActiveElement);
      listItems.forEach(updateActiveElement);
    }
  };

  const setupEventListeners = () => {
    /* element.addEventListener('mouseenter', stopRotation);
    element.addEventListener('focusin', stopRotation);
    element.addEventListener('mouseleave', startRotation);
    element.addEventListener('focusout', (e) => {
      if (!element.contains(e.relatedTarget)) {
        startRotation();
      }
    }); */

    const postList = element.querySelector('.post-list');
    postList.addEventListener('mouseenter', handleMouseEnter, true);
    postList.addEventListener('focus', handleMouseEnter, true);
  };

  setupEventListeners();
  // startRotation();
};

const blogPreviewElement = document.querySelector('.blog-preview');
if (blogPreviewElement) {
  createBlogPreview(blogPreviewElement);
}
