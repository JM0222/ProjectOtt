var express = require('express')
var router = express.Router();

router.use('/sign', require('./sign'))
// 미들웨어 세팅 // 
// const verifyToken = (t) => {
//   return new Promise((resolve, reject) => {
//     jwt.verify(t, cfg.secretKey, (err, v) => {
//       if (err) reject(err)
//       resolve(v)
//     })
//   })
// }
// router.all('*', function(req, res, next) {
//   // 토큰 검사
//   const token = req.headers.authorization
//   verifyToken(token)
//     .then(v => {
//       console.log(v)
//       next()
//     })
//     .catch(e => res.send({ success: false, msg: e.message }))  
// });

router.use('/test', require('./test'))
router.use('/user', require('./user'))
// router.all('*', function(req, res, next) {
//     next(createError(404, '그런 api 없어'));
//   });
  
module.exports = router;