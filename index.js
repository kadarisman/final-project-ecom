const express = require('express');
const app = express();
const port = process.env.PORT || 7008;



//var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var storesRouter = require('./routes/stores');
var productsRouter = require('./routes/products');
var orderRouter = require('./routes/orders');
var categoriesRouter = require('./routes/categories');
const loginRouter = require('./routes/login');


//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/stores', storesRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', orderRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/login', loginRouter);

module.exports = app;

app.get('/', (req, res) => res.send("Hello"));
app.listen(port, () => console.log(`app running at port ${port}`));