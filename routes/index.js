/*
* GET home page.
*/

exports.index = function (req, res) {
  var message = '';
  res.render('login/index.ejs', { message: message });

};