function validateForm()
{
    // Bước 1: Lấy giá trị của username và password
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
 
    // Bước 2: Kiểm tra dữ liệu hợp lệ hay không
    if (username == ''){
        alert('Bạn chưa nhập tên đăng nhập');
    }
    else if (password == '')
    {
        alert('Bạn chưa nhập mật khẩu');
    }
    else{
        alert('Dữ liệu hợp lệ, ta có thể chấp nhận submit form');
        return true;
    }
 
    return false;
}