$(function() {
    $('#zc').on('click', function() {
        $(".form-dl").hide();
        $('.form-zc').show();
    });
    $('#dl').on('click', function() {
        $(".form-zc").hide();
        $('.form-dl').show();
    })

    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        pwd: function(value) {
            var pwd = $('.form-zc [name=password]').val()
            if (pwd !== value) return "两次密码不一样"
        }
    });
    $('#form_zc').on('submit', function(e) {
        e.preventDefault();
        var data = {
            username: $('#form_zc [name=username]').val(),
            password: $('#form_zc [name=password]').val()
        }
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: data,
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message);
                console.log(res);
                layer.msg('注册成功，请登录！');
                $('#dl').click();
            }
        })
    })
    $('#form_dl').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) return layer.msg('登录失败');
                layer.msg('登录成功')
                localStorage.setItem('token', res.token);
                location.href = '/index.html'

            }
        })
    })
})