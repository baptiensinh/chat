
/*exports.listuser=function(req,res){

    var sql="SELECT * FROM `users`";          
    db.query(sql, function(err, result){  
       res.render('admin/listuser',{data:result});
    });   
    
}

exports.user=function(req,res){
    var params=req.params;
    var id=params.id;
    var sql="SELECT * FROM USER WHERE ?",{id:id}
    db.query(sql, function(err,result){
        res.render('admin/user',{data:result});

    });*/
/// listuser
var post_md = require("../models/post");
exports.listuser = function (req, res) {
    if(req.session.admin){
        var data = post_md.getAllPosts();
    data.then(function (posts) {
        var data = {
            posts: posts,
            error: false
        };
        res.render("admin/listuser", { data: data });

    }).catch(function (err) {
        res.render("admin/listuser", { data: { error: "Get Post data is Error" } });
    });

    }else{
        res.redirect("/admin/signinadmin");
    }

    
}
//home
exports.home = function(req, res) {
    if(req.session.admin){

        res.render("Admin/dashboard",{data:{error:false}});

    }else{
        res.redirect("/admin/signinadmin");
    }
}

var post_md = require("../models/post");
exports.listphoto = function (req, res) {
    if(req.session.admin){
        var data = post_md.getAllPhoto();
    data.then(function (posts) {
        var data = {
            posts: posts,
            error: false
        };
        res.render("admin/listphoto", { data: data });

    }).catch(function (err) {
        res.render("admin/listphoto", { data: { error: "Get Post data is Error" } });
    });

    }else{
        res.redirect("/admin/signinadmin");
    }

    
}
//--------------update user

exports.user=function(req,res){

    if(req.session.admin){

    var params=req.params;
    var id=params.id;
    var data=post_md.getPostById(id);

    if(data){
        data.then(function(posts){
            var post=posts[0];
            var data={
                post:post,
                error:false                
            };
            res.render("Admin/user",{data:data});
        }).catch(function(err){
            var data={
                error: "Could not get User by Id"
            };
            res.render("Admin/user",{data:data});
        });
    }else{
        var data={
            error: "Could not get User by Id"
        };
        res.render("Admin/user",{data:data});

    }

    }else{
        res.redirect("/admin/signinadmin");
    }

    
    
};
// status_code: http:500 loi, 200: thanhcong
exports.edituser=function(req,res){
    var params=req.body;
    data=post_md.updatePost(params);
    if(!data){        
        res.json({status_code:500});
    }else{
        data.then(function(result){            
            res.json({status_code:200});            
        }).catch(function(err){
            res.json({status_code:500});
        });
    }    
};

exports.listdeleteuser = function (req, res) {

    if(req.session.admin){
        var data = post_md.getAllDeletePosts();
    data.then(function (posts) {
        var data = {
            posts: posts,
            error: false
        };
        res.render("admin/listdeleteuser", { data: data });

    }).catch(function (err) {
        res.render("admin/listdeleteuser", { data: { error: "Get Post data is Error" } });
    });

    }else{
        res.redirect("/admin/signinadmin");
    }    
}



//deleteuser
/*exports.deleteuser=function(req,res){
    var post_id=req.body.id;
    var data=post_md.deletePost(post_id);
    if(!data){
        res.json({status_code:500});
    }else{
        data.then(function(result){
            res.json({status_code:200});
        }).catch(function(err){
            res.json({status_code:500});
        });
    }
};*/
//them user
exports.newuser=function(req,res){
    if(req.session.admin){
        res.render("Admin/newuser",{data:{error:false}});
    }else{
        res.redirect("/admin/signinadmin");
    }
   
}
exports.newuser_1=function(req,res)
{
    var params=req.body;   
    
    

        var data=post_md.addPost(params);
        data.then(function(result){
        res.redirect("/admin/listuser");
        }).catch(function(err){
        var data={error:"Khong the insert"};
        res.render("Admin/newuser",{data:data});

    });
};

//-----sign in
// luu y defer tra ve ket qua la 1 chuoi xong dung admin.length kiểm tra
exports.signinadmin=function(req,res){
    res.render("Admin/login",{data:{error:false}});
};
exports.signinadmin_=function(req,res){
    var params=req.body;
    if(params.email.trim().length == 0){
        res.render("Admin/login",{data:{error:"Nhập email nhé bạn"}});
    }else
    {
        var data=post_md.getAdminByEmail(params.email);
        if(data){
            data.then(function(admin){
                if(admin.length){
                    var admin=admin[0];
                
                
                    if(params.password == admin.pass)
                    {
                    req.session.admin=admin;
                    res.redirect("/admin/home");
                    }
                    else{
                    res.render("Admin/login",{data:{error:"Password Wrong"}});                  
                    }  

                }else{
                    res.render("Admin/login",{data:{error:"Email not exists"}});

                }                             
                        

                });              

            

        }else{
            res.render("Admin/login",{data:{error:"Admin not exists"}});
        }


    }
};
//tro ve HOME
exports.home=function(req,res)
{
    if(req.session.admin){
        res.render("Admin/dashboard",{data:{error:false}});
    }else{
        res.redirect("/admin/signinadmin");
    }
}
//logout
//TODO: logout functionality
exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect("/admin/signinadmin");
    })
};

//listphoto---0
exports.listphoto0 = function (req, res) {
    if(req.session.admin){
        var data = post_md.getAllPhoto0();
    data.then(function (posts) {
        var data = {
            posts: posts,
            error: false
        };
        res.render("admin/listphoto-0", { data: data });

    }).catch(function (err) {
        res.render("admin/listphoto-0", { data: { error: "Get Post data is Error" } });
    });

    }else{
        res.redirect("/admin/signinadmin");
    }
    
}
//listphoto---1
exports.listphoto1 = function (req, res) {
    if(req.session.admin){
        var data = post_md.getAllPhoto1();
    data.then(function (posts) {
        var data = {
            posts: posts,
            error: false
        };
        res.render("admin/listphoto-1", { data: data });

    }).catch(function (err) {
        res.render("admin/listphoto-1", { data: { error: "Get Post data is Error" } });
    });

    }else{
        res.redirect("/admin/signinadmin");
    }
    
}
////listphoto---2
exports.listphoto2 = function (req, res) {
    if(req.session.admin){
        var data = post_md.getAllPhoto2();
    data.then(function (posts) {
        var data = {
            posts: posts,
            error: false
        };
        res.render("admin/listphoto-2", { data: data });

    }).catch(function (err) {
        res.render("admin/listphoto-2", { data: { error: "Get Post data is Error" } });
    });

    }else{
        res.redirect("/admin/signinadmin");
    }
    
}
//listphotoandanh
exports.listphotoandanh = function (req, res) {
    if(req.session.admin){
        var data = post_md.getAllPhotoandanh();
    data.then(function (posts) {
        var data = {
            posts: posts,
            error: false
        };
        res.render("admin/listphoto-andanh", { data: data });

    }).catch(function (err) {
        res.render("admin/listphoto-andanh", { data: { error: "Get Post data is Error" } });
    });

    }else{
        res.redirect("/admin/signinadmin");
    }
    
}



    

