var createError = require('http-errors');
var express = require('express');
var history = require('connect-history-api-fallback')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
var app = express();

// 몽고디비 기반 ODM (DB 핸들링 편하게)
const mongoose = require('mongoose')

// 토큰 JWT 
const jwt = require('jsonwebtoken');
const key = '베리베리어려운키'
const token = jwt.sign({ id: 'memi', email: 'memi@xxx.com' }, key);
// console.log(token)

//  DB 커넥트  
const User = require('./models/users')
mongoose.connect('mongodb://localhost:27017/nemv', { useNewUrlParser: true }, (err) => {
   if (err) return console.error(err)
   console.log('mongoose connected!')
    // .then(r => console.log(r))
    // .catch(e => console.error(e))
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors()) // api 위에서 사용하겠다고 선언
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api', require('./routes/api'))
app.use(history());
// be , fe 연결 (dist)
app.use(express.static(path.join(__dirname, 'fe', 'dist')));



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

// const verifyToken = (t, k) => {
//   return new Promise((resolve, reject) => {
//     jwt.verify(t, k, (err, v) => {
//       if (err) reject(err)
//       resolve(v)
//     })
//   })
// 

module.exports = app;
