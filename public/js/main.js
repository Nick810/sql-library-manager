// function showPage(list, page) {
//   const startIndex = (page * itemsPerPage) - itemsPerPage;
//   const endIndex = page * itemsPerPage;
//   list.forEach((element, i) => {
//     if (i >= startIndex && i < endIndex) {
//       element.style.display = 'block';
//     } else {
//       element.style.display = 'none';
//     }
//   });
// }

function showPage(page) {
  const bookList = document.querySelectorAll('.test')
  const startIndex = (page * 10) - 10;
  const endIndex = page * 10;
  return bookList.forEach((book, i) => {
    if (i >= startIndex && i < endIndex) {
      book.style.display = 'block';
    } else {
      book.style.display = 'none';
    }
  });
}

window.onload = () => {
  if (document.querySelectorAll('.pagination-links').length > 1) {
    const paginationLinks = document.querySelectorAll('.pagination-links');
    const slicedPath = window.location.pathname.slice(12, window.location.pathname.length);

    for (let i=0; i<paginationLinks.length; i++) {
      if (paginationLinks[i].textContent === slicedPath) {
        paginationLinks[i].classList.add('active');
      }
    }
  }
}

showPage(1);
