var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();

var pool = require('./models/bd');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var noticiasRouter = require('./routes/noticias');
var juegosRouter = require('./routes/juegos');
var novedadesRouter = require('./routes/novedades');
var streamersRouter = require('./routes/streamers');
var contactoRouter = require('./routes/contacto');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//select
//pool.query('select nombre, edad, salario from empleados').then(function
//  (resultados) {
//  console.log(resultados)
//});

//insert
//var obj = {
// nombre: 'Juan',
//  apellido: 'Lopez',
// trabajo: 'docente',
//  edad: 38,
//  salario: 88000,
//  mail: 'Juan@lopez.com.ar'
//}

//pool.query('insert into empleados set ?', [obj]).then
//(function (resultados){
//  console.log(resultados)
//})

//update
//var id = 25;
//var obj = {
//  nombre: 'Pablo',
//  apellido: 'Gomez'
//}

//pool.query('update empleados set ? where id_emp=?', [obj,id]).then
//(function (resultados){
//  console.log(resultados)
//})

//borrar
//var id = 26;

//pool.query('delete from empleados where id_emp=?', [id]).then
//(function (resultados){
//  console.log(resultados)
//})

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/noticias', noticiasRouter);
app.use('/juegos', juegosRouter);
app.use('/novedades', novedadesRouter);
app.use('/streamers', streamersRouter);
app.use('/contacto', contactoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
