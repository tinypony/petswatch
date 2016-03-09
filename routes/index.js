
/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.type('html');
  res.sendfile('public/app/index.html');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};