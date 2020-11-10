//show photo chưa kiểm duyệt status_photo = 2
exports.photo_2 = function(req, res){
 
   var sql="SELECT * FROM `photos` WHERE `status_photo` = 2";          
   db.query(sql, function(err, result){  
      res.render('Admin1/listPhotoWait',{data:result});
   });
};

 //show photo đã kiểm duyệt status_photo = 1
exports.photo_1 = function(req, res){
 
   var sql="SELECT * FROM `photos` WHERE `status_photo` = 1";          
   db.query(sql, function(err, result){  
      res.render('Admin1/listPHOTO',{data:result});
   });
};

//show photo đã xóa status_photo = 0
exports.photo_0 = function(req, res){

   var sql="SELECT * FROM `photos` WHERE `status_photo` = 0";          
   db.query(sql, function(err, result){  
      res.render('Admin1/listPHOTODelete',{data:result});
   });
};

//xóa ảnh
exports.xoa_photo = function(req, res){

   var sql="UPDATE photos SET status_photo = replace(status_photo, '1', '0') WHERE `id`='" + id + "'";          
   db.query(sql, function(err, result){  
      res.render('Admin1/listPHOTO/:id',{data:result});
   });
   return;
};