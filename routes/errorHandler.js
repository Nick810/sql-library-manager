const handleFourOFour = (req, res, next) => {
  const err = new Error;
  err.status = 404;
  err.message = 'Sorry! We couldn\'t find the page you were looking for';
  next(err);
};

const handleGlobalError = (err, req, res, next) => {
  if (err.status === 404) {
    res.render('page-not-found', {
      title: '404 Page Not Found',
      heading: 'Page Not Found'
    });
    console.error('Error: Sorry! We couldn\'t find the page you were looking for');
  } else if (err.status || 500) {
    res.render('error', {
      title: 'Server Error',
      heading: 'Server Error'
    });
    console.error('Sorry! There was an unexpected error on the server.');
  }
};

module.exports = { handleFourOFour, handleGlobalError };
