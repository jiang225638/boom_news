$(function() {
   let layer = layui.layer
   let form = layui.form

   form.verify({
      pwd: [ /^[\S]{6,12}$/,'密码必须是6-12位的非空字符串！'],

      samePwd:function(value) {
        if(value === $('[name=old_pwd]').val()) {
            return '新旧密码不能相同！'
        }
      },

      rePwd:function(value) {
        if(value !== $('[name=new_pwd]').val()) {
            return '两次新密码的输入不一致！'
        }
      },

   })


   $('.layui-form').on('submit',function(e) {
    e.preventDefault()

    $.ajax({
        method:'PATCH',
        url:'/my/updatepwd',
        data:form.val('pwdForm'),
        success(res) {
            // console.log(res);
            if(res.code !== 0) return layer.msg('更新用户信息失败')
            layer.msg('密码更新成功！')
            $('.layui-form')[0].reset()
        }
      })
  })
})