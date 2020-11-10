var q=require("q");
//ds user
function getAllPosts(){
    var defer=q.defer();
    var query=db.query('SELECT * FROM users', function(err,posts){
        if(err){
            defer.reject(err);            
        }else{
            defer.resolve(posts);
        }
    });
    return defer.promise;
}

function getAllPhoto(){
    var defer=q.defer();
    var query=db.query('SELECT * FROM photos', function(err,posts){
        if(err){
            defer.reject(err);            
        }else{
            defer.resolve(posts);
        }
    });
    return defer.promise;
}
//update user
function getPostById(id){
    var defer=q.defer();
    var query=db.query('SELECT * FROM users WHERE ?', {id:id},function(err,posts){
        if(err){
            defer.reject(err);            
        }else{
            defer.resolve(posts);            
        }
    });
    return defer.promise;

}

function updatePost(params){
    if(params){
        var defer=q.defer();
        var query=db.query('UPDATE users SET username=?,email=?,pass=?,status_user=?,point_user=? WHERE id=?',[params.username,params.email,params.pass,params.status_user,params.point_user,params.id],function(err,result){
            if(err){
                defer.reject(err);                
            }else{
                defer.resolve(result);
            }            
        });
        return defer.promise;   
    }
    return false;   

}
//delete user
/*function deletePost(id){
    if(id){
        var defer=q.defer();
        var query=db.query('DELETE FROM users WHERE id=?',[id],function(err,result){
            if(err){
                defer.reject(err);                
            }else{
                defer.resolve(result);
            }            
        });
        return defer.promise;   
    }
    return false;

}*/

function getAllDeletePosts(){
    var defer=q.defer();
    var query=db.query('SELECT * FROM deleteuser', function(err,posts){
        if(err){
            defer.reject(err);            
        }else{
            defer.resolve(posts);
        }
    });
    return defer.promise;
}



//them user
function addPost(params){
    if(params){
        var defer=q.defer();
        var query=db.query('INSERT users SET ?',params,function(err,result){
            if(err){
                defer.reject(err);                
            }else{
                defer.resolve(result);
            }            
        });
        return defer.promise;   
    }
    return false;

}
//sign in
function getAdminByEmail(email){
    if(email){
        var defer=q.defer();
        var query=db.query('SELECT * FROM admins WHERE ?',{email:email},function(err,result){
            if(err){
                defer.reject(err) ;               

            }else{
                defer.resolve(result);
            }
        });
        return defer.promise;
    }


    return false;
}
//listphoto0

function getAllPhoto0(){
    var defer=q.defer();
    var query=db.query('SELECT * FROM photos WHERE status_photo=0', function(err,posts){
        if(err){
            defer.reject(err);            
        }else{
            defer.resolve(posts);
        }
    });
    return defer.promise;
}

function getAllPhoto1(){
    var defer=q.defer();
    var query=db.query('SELECT * FROM photos WHERE status_photo=1', function(err,posts){
        if(err){
            defer.reject(err);            
        }else{
            defer.resolve(posts);
        }
    });
    return defer.promise;
}

function getAllPhoto2(){
    var defer=q.defer();
    var query=db.query('SELECT * FROM photos WHERE status_photo=2', function(err,posts){
        if(err){
            defer.reject(err);            
        }else{
            defer.resolve(posts);
        }
    });
    return defer.promise;
}

function getAllPhotoandanh(){
    var defer=q.defer();
    var query=db.query('SELECT * FROM photos_any', function(err,posts){
        if(err){
            defer.reject(err);            
        }else{
            defer.resolve(posts);
        }
    });
    return defer.promise;
}






module.exports={
    getAllPosts:getAllPosts,
    getAllPhoto:getAllPhoto,
    getPostById:getPostById,
    updatePost:updatePost,
    //deletePost:deletePost,
    addPost:addPost,
    getAllDeletePosts:getAllDeletePosts,
    getAdminByEmail:getAdminByEmail,
    getAllPhoto0:getAllPhoto0,
    getAllPhoto1:getAllPhoto1,
    getAllPhoto2:getAllPhoto2,
    getAllPhotoandanh:getAllPhotoandanh
}


