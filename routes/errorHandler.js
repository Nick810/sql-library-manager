const handleFourOFour = (req, res, next) => {
  res.status(404)
    .render('page-not-found', {
      title: '404 Page Not Found',
      heading: 'Page Not Found'
    });
  console.error('Error: Sorry! We couldn\'t find the page you were looking for');

};

const handleGlobalError = (err, req, res, next) => {
  res.status(err.status || 500)
    .render('error', {
      title: 'Server Error',
      heading: 'Server Error'
    });
  console.error('Sorry! There was an unexpected error on the server.');
};

module.exports = { handleFourOFour, handleGlobalError };
