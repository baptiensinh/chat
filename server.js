var express = require("express"),
  user = require("./routes/user"),
  routes = require("./routes/index"),
  admin = require("./routes/admin/index"),
  multer = require("multer"),
  path = require("path");
  http = require('http');

var session = require("express-session");
var app = express();
var bodyParser = require("body-parser");
var mysql = require("mysql");
var ejsEngine = require("ejs-locals");
app.engine("ejs", ejsEngine);
app.set("view engine", "ejs");
var server = http.createServer(app);
var io = require('socket.io').listen(server);
// ! global

var hostname = "localhost";
var port = 9999;

// ! mysql
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodejsimages",
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});

global.db = connection;

// ! all environments
app.set("views", __dirname + "/views");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/login", express.static(path.join(__dirname, "public")));
app.use("/home", express.static(path.join(__dirname, "public")));
app.use("/u", express.static(path.join(__dirname, "public"))); // ! images with login
app.use("/i", express.static(path.join(__dirname, "public"))); // ! images without login
app.use("/p", express.static(path.join(__dirname, "public"))); // ! profile user
app.use("/c", express.static(path.join(__dirname, "public"))); // ! change password user
app.use("/edit", express.static(path.join(__dirname, "public"))); // ! edit image
app.use("/delete", express.static(path.join(__dirname, "public"))); // ! delete image
app.use("/ca", express.static(path.join(__dirname, "public"))); // ! change avatar user
app.use("/search", express.static(path.join(__dirname, "public"))); // ! change avatar user
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/admin", express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 18000000,
    }, // ! auto delete after 5 hour
  })
);

//TODO: set upload image to server :) - start setup upload image
// ! in future -> all upload to function :(
// ? dont code like this
// Set The Storage Engine
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb) {
    cb(null, "3raw" + "-" + Date.now() + path.extname(file.originalname));
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100000000,
  },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  },
}).single("myImage");

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}
// ! end setup image

// ? development only
app.get("/", routes.index); // ? call for main index page
app.get("/register", user.signup); // ? call for signup page
app.post("/register", user.signup); // ? call for signup post
app.get("/login", routes.index); // ? call for login page
app.post("/login", user.login); // ? call for login post
app.get("/login/register", user.signup); // ? call for signup page
app.get("/home/profile", user.profile); // ? to render users profile
app.get("/home/logout", user.logout); // ? call for logout
app.get("/home", user.home); // ? call for login
app.get("/home-page", user.homenotlogin); // ? call for without login
app.get("/upload", user.upload); // ? call for page upload
app.get("/search", user.search); // ? call for search
app.post("/search", user.search); // ? call for search
app.get("/messenger",user.messager);// ? call for message page

// ? call for upload image
app.post("/upload", (req, res) => {
  upload(req, res, err => {
    // ! this line for debug
    console.log(req.file.filename);
    var userId = req.session.userId;
    // ? var username = req.session.username;
    var post = req.body;
    var title = post.title;
    var description = post.description;
    if (req.method == "POST") {
      if (userId == null) {
        // ? true-done
        var sql_photos_any =
          "INSERT INTO `photos_any` (`title`,`status_photo_any`,`images_url`,`images_description`) VALUES ('" +
          title +
          "','0','" +
          req.file.filename +
          "','" +
          description +
          "')";
        console.log(sql_photos_any); // TODO: just for debug
        db.query(sql_photos_any, function(err, result) {
          db.query(
            "SELECT * FROM `photos_any` WHERE `images_url` = '" +
              req.file.filename +
              "'",
            function(err, result) {
              var url = `i/${result[0].id}`;
              res.redirect(url);
            }
          );
        });
      } else {
        var sql_photos =
          "INSERT INTO `photos` (`title`,`id_user`,`status_photo`,`images_description`,`images_url`) VALUES ('" +
          title +
          "','" +
          userId +
          "','0','" +
          description +
          "','" +
          req.file.filename +
          "')";
        console.log(sql_photos); // TODO: just for debug
        db.query(sql_photos, function(err, result) {
          sql_photos_redirect =
            "SELECT * FROM `photos` WHERE `images_url` = '" +
            req.file.filename +
            "'";
          db.query(sql_photos_redirect, function(err, result) {
            var url = `u/${result[0].id}`;
            res.redirect(url);
          });
        });
      }
    }
  });
});

// ?  after upload image with login
app.get("/u/:id", async (req, res) => {
  var id = req.params.id;
  db.query(`SELECT * FROM photos WHERE id = ${id}`, async (err, result) => {
    if (err) throw err;
    if (result[0].status_photo == 2) {
      var url = "../home";
      res.render("push.ejs", {
        data: id,
        url: url,
      });
    }
  });
  var title = "",
    img_description = "",
    username = "",
    url_avatar = "",
    img_url = "",
    status_photo = "";
  var username_nav = req.session.username;
  if (username_nav == null) {
    username_nav = "";
  }
  // var sql2 = "SELECT * FROM `users` WHERE `id` = (SELECT `id_user` FROM `photos` WHERE `id` = '" + id + "')";
  // console.log(sql2);// ! only for debug
  // var ex_query = db.query(sql2, function (err, result) {
  //     return result[0].username;
  // });

  var sql = "SELECT * FROM photos WHERE id = " + id + "";
  console.log(sql); // ! only for debug
  db.query(sql, async function(err, result) {
    if (err) throw err;
    // ! just for debug
    console.log(result);
    console.log(result[0].images_url);
    title = result[0].title;
    img_description = result[0].images_description;
    //img_url = '<img class="card-img-top img-fluid" src="';
    img_url += "uploads/";
    img_url += result[0].images_url;
    //img_url += '"  alt="Card image cap"></img>';
    status_photo = result[0].status_photo;
    db.query(
      "SELECT * FROM users WHERE id=" + result[0].id_user + "",
      async function(err, result) {
        if (err) throw err;
        console.log(result);
        username = result[0].username;
        id_username = result[0].id;
        //url_avatar='uploads/';
        url_avatar = result[0].avatar_url;
        db.query(
          "SELECT * FROM photos ORDER BY id DESC LIMIT 10",
          async function(err, result) {
            if (err) throw err;
            await res.render("home/newsfeed.ejs", {
              username: username,
              id_username: id_username,
              url_avatar: url_avatar,
              title: title,
              img_description: img_description,
              img_url: img_url,
              username_nav: username_nav,
              status_photo: status_photo,
              data: result,
            });
          }
        );
      }
    );
  });
});

// ? after upload image whitout login
app.get("/i/:id", async (req, res) => {
  var id = req.params.id;
  db.query(`SELECT * FROM photos_any WHERE id = ${id}`, async (err, result) => {
    if (err) throw err;
    if (result[0].status_photo_any == 2) {
      var url = "../home-page";
      res.render("push.ejs", {
        data: id,
        url: url,
      });
    }
  });
  var title = "",
    img_description = "",
    username = "Anonymous",
    img_url = "",
    url_avatar = null,
    id_username = "../home-page";
  var username_nav = req.session.username;
  if (username_nav == null) {
    username_nav = "";
  }

  db.query("SELECT * FROM photos_any WHERE id= " + id + "", async function(
    err,
    result
  ) {
    if (err) throw err;
    title = result[0].title;
    img_description = result[0].images_description;
    status_photo_any = result[0].status_photo_any;
    img_url += "uploads/";
    img_url += result[0].images_url;
    db.query("SELECT * FROM photos ORDER BY id DESC LIMIT 10", async function(
      err,
      result
    ) {
      if (err) throw err;
      await res.render("home/newsfeed.ejs", {
        username: username,
        id_username: id_username,
        url_avatar: url_avatar,
        title: title,
        img_description: img_description,
        img_url: img_url,
        username_nav: username_nav,
        status_photo: status_photo_any,
        data: result,
      });
    });
  });
});

// ? profile user, show all image for user
app.get("/p/:id", async (req, res) => {
  var id = req.params.id;
  db.query(`SELECT * FROM users WHERE id = ${id}`, async (err, result) => {
    if (err) throw err;
    if (result[0].status_user == 1) {
      var url = "/home";
      res.render("userpush.ejs", {
        data: id,
        url: url,
      });
    }
  });
  var change_avatar = "";
  var username_show = "";

  var username_nav = req.session.username;
  //var id_user = req.session.userId;
  if (username_nav == null) {
    username_nav = "";
  }
  db.query("SELECT * FROM users WHERE id = " + id + "", async (err, result) => {
    if (err) throw err;
    username_show = result[0].username;
    change_avatar = result[0].avatar_url;
    console.log(username_show);
    db.query(
      "SELECT * FROM photos WHERE id_user = " + id + " ORDER BY id DESC",
      async (err, result) => {
        if (err) throw err;
        await res.render("home/profile.ejs", {
          data: result,
          username_show: username_show,
          username_nav: username_nav,
          change_avatar: change_avatar,
          id: id,
        });
      }
    );
  });
  // res.render("home/profile.ejs", {
  //   username_nav: username_nav,
  //   id: id
  // });
  //res.html(id);
});

// ? change password username
// ! GET
app.get("/c/:id", async (req, res) => {
  var id = req.params.id;
  var id_user = req.session.userId;
  var data = "";
  var url = "";
  if (id == id_user) {
    res.render("home/changepass.ejs", {
      data: data,
      url: url,
      id: id,
    });
  } else {
    res.redirect(`/p/${id}`);
  }
});

// ? change password username
// ! POST
app.post("/c/:id", async (req, res) => {
  var id = req.params.id;
  var url_err = `/c/${id}`;
  var url = "/c/";
  if (req.method == "POST") {
    var post = req.body;
    var pass_old = post.pass_old;
    var pass_new = post.pass_new;
    if (pass_old != pass_new) {
      await db.query(
        "UPDATE users SET pass= " + pass_new + " WHERE id = " + id + "",
        async err => {
          if (err) throw err;
          var data = "Successful password update.";
          url_err = `/p/${id}`;
          await res.render("home/changepass.ejs", {
            data: data,
            url: url,
            id: url_err,
          });
        }
      );
    } else {
      var data = "Cant update new password, try again";
      await res.render("home/changepass.ejs", {
        data: data,
        url: url,
        id: url_err,
      });
    }
  }
});

// ? edit images
// ! GET
app.get("/edit/:idimg/:iduser", async (req, res) => {
  var idimg = req.params.idimg;
  var iduser = req.params.iduser;
  console.log(idimg);
  console.log(iduser);
  var userId = req.session.userId;
  if (iduser == userId) {
    await db.query(
      "SELECT * FROM photos WHERE id = " + idimg + "",
      async (err, result) => {
        if (err) throw err;
        res.render("editimg/index.ejs", {
          data: result,
          idimg: idimg,
          iduser: iduser,
        });
      }
    );
  } else {
    res.redirect(`/u/${idimg}`);
  }
});

// ? edit images
// ! POST
app.post("/edit/:idimg/:iduser", async (req, res) => {
  var idimg = req.params.idimg;
  var iduser = req.params.iduser;
  if (req.method == "POST") {
    var post = req.body;
    var title = post.title;
    var description = post.description;
    await db.query(
      `UPDATE photos SET title = "${title}" WHERE id = ${idimg} and id_user = ${iduser}`,
      async err => {
        if (err) throw err;
      }
    );
    await db.query(
      `UPDATE photos SET images_description = "${description}" WHERE id = ${idimg} and id_user = ${iduser}`,
      async err => {
        res.redirect(`/u/${idimg}`);
      }
    );
  } else {
    res.redirect(`/edit/${idimg}/${iduser}`);
  }
});

// ? delete image
// ! GET
app.get("/delete/:idimg/:iduser", async (req, res) => {
  var idimg = req.params.idimg;
  var iduser = req.params.iduser;
  // ! just for debug
  console.log(idimg);
  console.log(iduser);
  var userId = req.session.userId;
  if (iduser == userId) {
    await db.query(
      "SELECT * FROM photos WHERE id = " + idimg + "",
      async (err, result) => {
        if (err) throw err;
        res.render("delimg/index.ejs", {
          data: result,
          idimg: idimg,
          iduser: iduser,
        });
      }
    );
  } else {
    res.redirect(`/u/${idimg}`);
  }
});

// ? delete image
// ! POST
app.post("/delete/:idimg/:iduser", async (req, res) => {
  var idimg = req.params.idimg;
  var iduser = req.params.iduser;
  // ! just for debug
  console.log(idimg);
  console.log(iduser);
  var userId = req.session.userId;
  if (iduser == userId) {
    await db.query(
      `UPDATE photos SET status_photo = 2 WHERE id = ${idimg} and id_user = ${iduser}`,
      async (err, result) => {
        if (err) throw err;
        res.render("push.ejs", {
          data: idimg,
          url: iduser,
        });
      }
    );
  } else {
    res.redirect(`/u/${idimg}`);
  }
});

// ? change avatar user
// ! GET
app.get("/ca/:id", async (req, res) => {
  var id = req.params.id;
  var userId = req.session.userId;
  var username = req.session.username;
  if (userId == id) {
    //TODO: upload image with login
    res.render("home/uploadavatar.ejs", {
      data_username: username,
      id: id,
    });
  } else {
    res.redirect(`/p/${id}`);
  }
});

// ? change avatar user
// ! POST
app.post("/ca/:id", async (req, res) => {
  var id = req.params.id;
  upload(req, res, err => {
    // ! this line for debug
    console.log(req.file.filename);
    var userId = req.session.userId;
    // ? var username = req.session.username;
    // ! var post = req.body;
    if (req.method == "POST") {
      db.query(
        `UPDATE users SET avatar_url = '${req.file.filename}' WHERE id = ${id}`,
        async err => {
          if (err) throw err;
          res.redirect(`/p/${id}`);
        }
      );
    }
  });
});

// ? just for test get data from url
app.get("/test/:id", (req, res) => {
  /*
    On express 3
    !    req.param(fieldName)
    On express 4
    !    req.params.fieldName
    */
  var id = req.params.id;
  console.log(id);
  res.render("test.ejs", {
    data: id,
  });
});
// ! Middleware
//----------------------code Hung--------------------------------------------------------------------------
//-----signup
app.get("/admin/signinadmin", admin.signinadmin);
app.post("/admin/signinadmin", admin.signinadmin_);
app.get("/admin/home", admin.home);
app.get("/admin/logout", admin.logout); // ? call for logout

//---
app.get("/admin/listuser", admin.listuser); //1
app.get("/admin/user/:id", admin.user); //2
app.put("/admin/user", admin.edituser);
//app.delete("/admin/user/delete", admin.deleteuser);
app.get("/admin/newuser", admin.newuser); //3
app.post("/admin/newuser", admin.newuser_1);
app.get("/admin/listdeleteuser", admin.listdeleteuser); //4
// ---------------ham delete user-----------------------------------
/*app.get("/admin/listdeleteuser/:id", async (req, res) => {
  
  var id = req.params.id;
  // ! just for debug  
  console.log(id);  
  
    await db.query(
      "SELECT * FROM users WHERE id = " + id + "",
      async (err, result) => {
        if (err) throw err;
        id=result[0].id;
        email=result[0].email;
        db.query(
          "INSERT deleteuser SET email=? WHERE id=?",[email,id],
          async (err, result) => {
            if(err) throw err;            
          }
        );        
      }
    );     
});
app.post("/admin/listdeleteuser/:id", async (req, res) => {
  
  var id = req.params.id;
  // ! just for debug
  console.log(id);  
  
    await db.query(
      `UPDATE photos SET status_photo = 2 WHERE id_user = ${id}`,
      async (err, result) => {
        if (err) throw err;
        db.query(
          `UPDATE users SET status_user = 1 WHERE id = ${id}`,
          async (err, result) => {
            if(err) throw err;
            result.redirect("/admin/listdeleteuser");
          }
        )
        
      }
    );  
});*/

app.get("/admin/listdeleteuser/:id", async (req, res) => {
  if (req.session.admin) {
    var id = req.params.id;
    // ! just for debug
    console.log(id);
    res.render("admin/push.ejs", {
      id: id,
    });
  } else {
    res.redirect("/admin/signinadmin");
  }
});

app.post("/admin/listdeleteuser/:id", async (req, res) => {
  var id = req.params.id;
  var email_del = "";
  // ! just for debug
  console.log(id);
  await db.query(
    `SELECT * FROM users WHERE id = ${id}`,
    async (err, result) => {
      console.log(`SELECT * FROM users WHERE id = ${id}`);
      if (err) throw err;
      email_del = result[0].email;
      await db.query(
        `INSERT INTO deleteuser (email) VALUES ('${email_del}')`,
        async err => {
          if (err) throw err;
          await db.query(
            `UPDATE photos SET status_photo= '2' WHERE id_user=${id}`,
            async err => {
              if (err) throw err;
              await db.query(
                `UPDATE users SET status_user= '1' WHERE id=${id}`,
                async err => {
                  if (err) throw err;
                  res.redirect("/admin/listuser");
                }
              );
            }
          );
        }
      );
    }
  );
});

//----------------------------------------------------------------------------------------------------------------
//---Code Bảo
app.get("/admin/listphoto0", admin.listphoto0);
app.get("/admin/listphoto1", admin.listphoto1);
app.get("/admin/listphoto2", admin.listphoto2);
app.get("/admin/listphotoandanh", admin.listphotoandanh);
app.get("/admin/listdeletephoto1/:id", async (req, res) => {
  if (req.session.admin) {
    var id = req.params.id;
    // ! just for debug
    console.log(id);
    res.render("admin/push1.ejs", {
      id: id,
    });
  } else {
    res.redirect("/admin/signinadmin");
  }
});

app.post("/admin/listdeletephoto1/:id", async (req, res) => {
  var id = req.params.id;

  // ! just for debug
  console.log(id);
  await db.query(
    `UPDATE photos SET status_photo=2 WHERE id = ${id}`,
    async (err, result) => {
      if (err) throw err;
      res.redirect("/admin/listphoto1");
    }
  );
});

app.get("/admin/listdeletephoto0/:id", async (req, res) => {
  if (req.session.admin) {
    var id = req.params.id;
    // ! just for debug
    console.log(id);
    res.render("admin/push0-2.ejs", {
      id: id,
    });
  } else {
    res.redirect("/admin/signinadmin");
  }
});

app.post("/admin/listdeletephoto0/:id", async (req, res) => {
  var id = req.params.id;

  // ! just for debug
  console.log(id);
  await db.query(
    `UPDATE photos SET status_photo=2 WHERE id = ${id}`,
    async (err, result) => {
      if (err) throw err;
      res.redirect("/admin/listphoto0");
    }
  );
});

app.get("/admin/listduyetphoto0/:id", async (req, res) => {
  if (req.session.admin) {
    var id = req.params.id;
    // ! just for debug
    console.log(id);
    res.render("admin/push0-1.ejs", {
      id: id,
    });
  } else {
    res.redirect("/admin/signinadmin");
  }
});

app.post("/admin/listduyetphoto0/:id", async (req, res) => {
  var id = req.params.id;

  // ! just for debug
  console.log(id);
  await db.query(
    `UPDATE photos SET status_photo=1 WHERE id = ${id}`,
    async (err, result) => {
      if (err) throw err;
      res.redirect("/admin/listphoto0");
    }
  );
});

app.get("/admin/listdeleteandanh/:id", async (req, res) => {
  if (req.session.admin) {
    var id = req.params.id;
    // ! just for debug
    console.log(id);
    res.render("admin/pushdeleteN.ejs", {
      id: id,
    });
  } else {
    res.redirect("/admin/signinadmin");
  }
});

app.post("/admin/listdeleteandanh/:id", async (req, res) => {
  var id = req.params.id;

  // ! just for debug
  console.log(id);
  await db.query(
    `UPDATE photos_any SET status_photo_any=2 WHERE id = ${id}`,
    async (err, result) => {
      if (err) throw err;
      res.redirect("/admin/listphotoandanh");
    }
  );
});

app.get("/admin/listduyetandanh/:id", async (req, res) => {
  if (req.session.admin) {
    var id = req.params.id;
    // ! just for debug
    console.log(id);
    res.render("admin/pushduyetN.ejs", {
      id: id,
    });
  } else {
    res.redirect("/admin/signinadmin");
  }
});

app.post("/admin/listduyetandanh/:id", async (req, res) => {
  var id = req.params.id;

  // ! just for debug
  console.log(id);
  await db.query(
    `UPDATE photos_any SET status_photo_any=1 WHERE id = ${id}`,
    async (err, result) => {
      if (err) throw err;
      res.redirect("/admin/listphotoandanh");
    }
  );
});

// Socket IO
var onlineUsers=[];
io.on('connection', function(socket) {

     console.log('a user connected');

  socket.on('user name', function(user, callback) {
      var temp = 0;
      onlineUsers.push({
          profileName: user,
          profileId: socket.id,
          counter: temp
      })
      io.sockets.emit('connectedUsers', onlineUsers);

  });

  socket.on('disconnect', function() {
      var i = 0;
      while (i < onlineUsers.length) {
          if (onlineUsers[i].profileId == socket.id) {
              break;
          }
          i++;
      }
      console.log(socket.id + 'disconnect');

      onlineUsers.splice(i, 1);
      io.sockets.emit('connectedUsers', onlineUsers);
      console.log('user disconnected');
  });

  socket.on('chatting', function(message, sender, receiver) {

      socket.to(receiver).emit('reciverPeer', message, socket.id, receiver);
      socket.emit('senderPeer', message, socket.id, receiver);
  })

});
// Finish Socket IO

server.listen(`${port}`, () => {
  console.log(`App running in http://${hostname}:${port}`);
});
