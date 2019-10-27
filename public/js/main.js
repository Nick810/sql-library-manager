window.onload = () => {
  if (document.querySelectorAll('.pagination-links').length > 1) {
    const paginationLinks = document.querySelectorAll('.pagination-links');
    const slicedPath = window.location.pathname.slice(12, window.location.pathname.length);

    for (let i=0; i<paginationLinks.length; i++) {
      if (paginationLinks[i].textContent === slicedPath) {
        paginationLinks[i].classList.add('active');
        paginationLinks[i].firstElementChild.style.color = 'white';
      }
    }

  }
}
