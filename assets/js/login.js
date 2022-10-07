$(function () {

     $('#reg-btn').on("click", function () {
          $('.login').show()
          $('.register').hide()
     })

     $('#login-btn').on("click", function () {
          $('.login').hide()
          $('.register').show()
     })

     let form = layui.form
     let layer = layui.layer
     form.verify({
          pwd: [
               /^[\S]{6,12}$/
               , '密码必须6到12位，且不能出现空格'
          ],
          repwd: function (value) {
               if ($("#password").val() !== value) return '两次密码不一致，请重新输入！'
          }
     })

     // const formmate2json = (value)=>{
     //     let obj = {}
     //     value.split("&").forEach(el => {
     //          let ele = el.split("=")
     //          obj[ele[0]] = ele[1]
     //     });
     //     return JSON.stringify(obj)
     // }
     // let asx = 'uname=zs&age=20&hobby=basketball'
     // console.log(formmate2json(asx))

     // 注册
     $("#reg_form").on('submit', function (e) {
          e.preventDefault()
          let regStr = $(this).serialize()
          // console.log($(".register [name=username]").val());
          $.ajax({
               method: "POST",
               url: `/api/reg`,
               data: regStr,
               success: function (res) {
                    // console.log(res);
                    if(res.code !== 0) return layer.msg(res.message)
                    $("#reg-btn").click()
                    layer.msg("注册成功，请登录！")
               }
          })
     })

     $("#login_form").on('submit', function (e) {
          e.preventDefault()
          let regStr = $(this).serialize()
          // console.log($(".register [name=username]").val()); 
          $.ajax({
               method: "POST",
               url: `/api/login`,
               data: regStr,
               success: function (res) {
                    // console.log(res)
                    if(res.code !== 0) return layer.msg(res.message)
                    layer.msg("登录成功！")
                    localStorage.setItem('token',res.token)
                    location.href = '/index.html'
               }
          })
     })
    
})