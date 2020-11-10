//TODO: register
exports.signup = function (req, res) {
    message = '';
    message_e = '';
    if (req.method == "POST") {
        var post = req.body;
        var name = post.username;
        var pass = post.pass;
        var email = post.email;
        // ! just for debug - 1 rows
        console.log(`${name}///${pass}///${email}`);
        var sql_check = "SELECT * FROM `users` WHERE `username` = '" + name + "'";
        var sql_check_e = "SELECT * FROM `users` WHERE `email` = '" + email + "'";
        var sql = "INSERT INTO `users`(`username`,`email`,`pass`,`status_user`,`point_user`) VALUES ('" + name + "','" + email + "','" + pass + "','0','0')";
        // ! just for debug - 2 rows
        console.log(sql);
        console.log(sql_check);

        // TODO: check username and email exist
        var result_email = db.query(sql_check_e, function (err, result) {
            return result;
        });
        var query = db.query(sql_check, function (err, result) {
            // ! just for debug
            console.log(result.length);
            console.log(result);
            // TODO: check user
            if (result.length > 0) {
                message = "This username is already taken";
                // ! for debug, insert more value
                sql = '';
                res.render('register/index.ejs', {
                    message: message
                });
            }
            // TODO: check email
            else if (result_email.length > 0) {
                message_e = "This email is already taken";
                // ! for debug, insert more value
                sql = '';
                res.render('register/index.ejs', {
                    message_e: message_e
                });
            }
            //TODO: if anything true, insert to datebase
            else {
                var query_insert = db.query(sql, function (err, result) {
                    message = "You are register successfully!";
                    res.render('login/index.ejs', {
                        message: message
                    });
                });
            }
        });
    } else {
        res.render('register');
    }
};

//TODO: login
exports.login = async function (req, res) {
    var message = '';

    if (req.method == "POST") {
        var post = req.body;
        var email = post.email;
        var pass = post.pass;

        var sql = "SELECT * FROM `users` WHERE `email`='" + email + "' and pass = '" + pass + "'";

        await db.query(sql, function (err, results) {
            if (err) throw err;
            if (results.length) {
                if (results[0].status_user == 1) {
                    message = "User was deleted";
                    res.render('login/index.ejs', {
                        message: message
                    });
                }
                else{
                    req.session.userId = results[0].id;
                    req.session.username = results[0].username;
                    //TODO: just for debug
                    console.log(results[0].id);
                    console.log(results[0].username);
                    res.redirect('home');
                }
            } else {
                message = 'Email or username not correct.';
                res.render('login/index.ejs', {
                    message: message
                });
            }

        });
    } else {
        res.render('login/index.ejs', {
            message: message
        });
    }
};

//TODO: logout functionality
exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect("../login");
    })
};

//TODO: show profile
//TODO: after login
exports.profile = function (req, res) {
    var userId = req.session.userId;
    if (userId == null) {
        res.redirect("/login");
        return;
    }
    res.redirect(`/p/${userId}`);
};
//TODO: show username on home page
// ! just for home page
exports.home = async function (req, res) {
    var username = req.session.username;
    var id = req.session.userId;
    if (id == null) {
        res.redirect("../login");
        return;
    } else {
        db.query(`SELECT * FROM photos ORDER BY id DESC`, async (err, result) => {
            if (err) throw err;
            res.render('home/index.ejs', {
                data: username,
                owl: result,
                content: result
            });
        });
    }
};

exports.search = async function (req, res) {
    var username = req.session.username;
    if (req.method == "POST") {
        var post = req.body;
        var search = post.search;
        db.query(`SELECT * FROM photos WHERE title LIKE "${search}%" OR images_description LIKE "${search}%" ORDER BY id DESC`, async (err, result) => {
            if (err) throw err;
            res.render('home/search.ejs', {
                data: username,
                owl: search,
                content: result
            });
        });
    }
};

// TODO: without login
exports.homenotlogin = function (req, res) {
    var  username = '';
    db.query(`SELECT * FROM photos ORDER BY id DESC`, async (err, result) => {
        if (err) throw err;
        res.render('home/index.ejs', {
            data: username,
            owl: result,
            content: result
        });
    });
};

//TODO: upload image to server
exports.upload = function (req, res) {
    var userId = req.session.userId;
    var username = req.session.username;
    if (userId == null) {
        //TODO: upload image without login
        var data_username = '';
        res.render('home/upload.ejs', {
            data_username: data_username
        });
    } else {
        //TODO: upload image with login
        res.render('home/upload.ejs', {
            data_username: username
        });
    }
    //TODO: just for POST
}
exports.messager = function (req, res) {
    var userId = req.session.userId;
    var username = req.session.username;
    if (userId == null) {
        //TODO: upload image without login
        var data_username = '';
        res.redirect("../login");
        return;
    } else {
        //TODO: upload image with login
        res.render('chat/chat.ejs', {
            user: username
        });
    }
};

//TODO: change password not here - > goto file server