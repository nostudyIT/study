$(function() {
    getInformation();
    let layer = layui.layer;

    function getInformation() {
        $.ajax({
            type: 'GET',
            url: "/my/userinfo",
            success: function(res) {
                if (res.status !== 0) return layui.layer.msg('获取用户信息失败！');
                userImage(res.data)
            },
            // complete: function(res) {
            //     if (res.responseJSON.status === 1 || res.responseJSON.message === '身份认证失败！') {
            //         localStorage.removeItem('token')
            //         location.href = '/login.html'
            //     }
            // }
        })
    }

    function userImage(data) {
        var name = data.nickname || data.username;
        $('.welcome').html(`欢迎 &nbsp;${name}`);
        if (data.user_pic !== null) {
            $('.layui-nav-img').prop('src', data.user_pic).show();
            $('.txt').hide();
        } else {
            $('.txt').html(name[0].toUpperCase()).show();
            $('.layui-nav-img').hide();
        }

    }

    $('#out').on('click', function() {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });

    })
})