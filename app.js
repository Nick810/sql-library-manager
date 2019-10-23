const express = require('express');
const mainRoutes = require('./routes');
const errorHandler = require('./routes/errorHandler');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.use('/static', express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', mainRoutes);
app.use(errorHandler.handleFourOFour);
app.use(errorHandler.handleGlobalError);

app.listen(port, () => {
  console.log(`This application is listening on localhost:${port}`)
});
