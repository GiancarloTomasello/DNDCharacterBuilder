const Express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = Express();

app.use(Express.urlencoded());
app.use(cookieParser());
app.use('/static', Express.static('public'));
app.set('view engine', 'pug');

const mainRoutes = require('./routes');

app.use(mainRoutes);


app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});