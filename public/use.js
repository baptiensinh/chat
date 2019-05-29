var socket=io();

socket.on("serverSendUser",function(data){
    $("#username").html(data);
})
socket.on("list-user",function(data){
    $('#namechat').html("");
    data.forEach(function(i){
        $('#namechat').append('<li class="active"><div class="d-flex bd-highlight"><div class="img_cont"><img src="" class="rounded-circle user_img"><span class="online_icon"></span></div><div class="user_info"><span>'+i+' is online</span></div></div></li>');
    })
    });
$(document).ready(function(){
 
$("#btnSend").click(function(){
    socket.emit("SendText", $("#textchat").val());
});
$("#namechat").click(function(){
    socket.emit("SendNamechat", $("Maryam").val());
});
});