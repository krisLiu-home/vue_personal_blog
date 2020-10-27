const allowOrigin = ['http://localhost:8080'];

module.exports = function (req, res, next) {
  if ('origin' in req.headers && allowOrigin.includes(req.headers.origin)) {

    res.header('access-control-allow-origin', req.headers.origin);
  }
  next();

}