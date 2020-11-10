//su kien update,delete user

//url:base_url -> chi huong router thoi nha
function Post(){
    function blindEvent(){
        $(".post_edit").click(function(e){
            var params={
                id:$(".id").val(),
                username:$(".username").val(),
                email:$(".email").val(),
                pass:$(".pass").val(),
                status_user:$(".status_user").val(),
                point_user:$(".point_user").val()
            };
            var base_url=location.protocol+"//"+document.domain+":"+location.port;
            $.ajax({
                url:base_url+"/admin/user",
                type:"PUT",
                data:params,
                dataType:"json",
                success: function(res){
                    if(res && res.status_code == 200 ){
                        location.replace('/admin/listuser');                      
                    }
                }
            });
        });
        // su kien delete

        /*$(".post_delete").click(function(e){
            var post_id=$(this).attr("post_id");
            var base_url=location.protocol+"//"+document.domain+":"+location.port;

            $.ajax({
                url:base_url+"/admin/user/delete",
                type:"DELETE",
                data:{id: post_id},
                dataType:"json",
                success: function(res){
                    if(res && res.status_code == 200 ){
                        location.reload();
                    }
                }
            });

        })   */ 
        
    }
    blindEvent();    
}

$(document).ready(function(){
    new Post();
})