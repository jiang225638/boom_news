$(function() {
    let form = layui.form
    let layer = layui.layer
    form.verify({
          nickname: function (value) {
              if(value.length > 6) {
                return '昵称必须是1-6位的非空字符';
              }
          }
    })

  
    // 获取用户相关信息
    const initUserInfo = () => {
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success(res) {
                // console.log(res);
                if(res.code !== 0) return layer.msg('用户信息获取失败！')
                form.val('userForm',res.data)
            }
            
        })
    }

    initUserInfo()

    $('#btnReset').on('click',function(e){
         e.preventDefault()
         initUserInfo()
    })
     
    $('.layui-form').on('submit',function(e) {
        e.preventDefault()

        $.ajax({
            method:'PUT',
            url:'/my/userinfo',
            data:form.val('userForm'),
            success(res) {
                // console.log(res);
                if(res.code !== 0) return layer.msg('获取用户信息失败')
                window.parent.getUserInfo()
            }
        })
    })
})