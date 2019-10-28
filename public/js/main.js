window.onload = () => {
  if (document.querySelectorAll('.pagination-links').length > 1) {
    const pathName = window.location.pathname;
    const paginationLinks = document.querySelectorAll('.pagination-links');
    let slicedPath = pathName.slice(pathName.indexOf('/page/') + 6, pathName.length);

    if (pathName.includes('find')) {
      slicedPath = pathName.slice(pathName.indexOf('/page/') + 6, pathName.length - 1);
    }

    for (let i=0; i<paginationLinks.length; i++) {
      if (paginationLinks[i].textContent === slicedPath) {
        paginationLinks[i].classList.add('active');
      }
    }
  }
}
