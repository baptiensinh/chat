var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
var session = require('express-session');
app.use(session({secret: "dmm map"}));
var csdl= require("./database/csdl")
var server = require("http").Server(app);
var url = require('url');
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var io = require("socket.io")(server);
var port = process.env.PORT || 4000;
var arruser=[];
var nameuser=null;

XuLy = async function (req, res){
  var ten= "";
  var thoat= "";
  var dk= "";
  var userId = req.session.user;
  if(userId == undefined){
     res.render("login");
    }
  else {
      ten = req.session.user.TenDN;
      thoat = "<a href=/?thoat=1>Exit</a>"
      nameuser= ten;
      res.render("chat",{thoat:thoat});
      io.on('connection', function(socket){
        console.log("an user connected ");
        // console.log(socket.adapter.rooms);
        if(arruser.indexOf(nameuser)>=0){
        }
        else{
          arruser.push(nameuser);
          console.log(arruser);
          socket.emit("serverSendUser",nameuser);
          socket.broadcast.emit("list-user",arruser);
        }

        socket.on('disconnect', function(){
          console.log("an user disconnected");
          console.log("arr48",arruser);
          arruser.splice(arruser.indexOf(nameuser), 1);
          console.log("arr50",arruser);
          socket.broadcast.emit("list-user",arruser);

        });
      socket.on("SendNamechat",function(data){
        console.log(data);
      })
      });
    };


};




app.post("/dangnhap", async function (req, res) {
  var email = req.body.email;
  var matkhau = req.body.pass;
  var record = await csdl.Login(email, matkhau);
  if (record == 0) {
  req.session.user = undefined;

}
else{
  req.session.user = record;
}
await XuLy(req,res);
});

app.post("/dangky", async function (req, res) {
  var tendn = req.body.username;
  var matkhau = req.body.pass;
  var email = req.body.email;
  var record = await csdl.Register(tendn, matkhau, email); 
if (record == 0) 
       res.render("register");
    else
    res.render("login");
});



app.get("/register", async function(req,res){
    res.render("register");
});
app.get("/chat", async function(req,res){
  res.render("chat");
});

app.get("/",async function(req,res){
  var q = url.parse(req.url, true).query;
  if (q.thoat == 1) {
    req.session.user = undefined ;
   
  }
  if (q.dk != undefined) 
  res.render("register");
  else {
      await XuLy(req, res);
    }
});

server.listen(port, function(){
  console.log('listening on *:' + port);
});


