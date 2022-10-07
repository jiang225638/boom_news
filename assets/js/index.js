$(function() {
    // renderAvatar()
    getUserInfo()

     $("#logOut").on("click",()=>{
        layer.confirm('确定退出登录', {icon: 3, title:'提示'}, function(index){
            //do something
              location.href = '/login.html'
              localStorage.removeItem("token")
             
            layer.close(index);
          });   
            
        
     })
})


let layer = layui.layer

function getUserInfo() {
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res) {
                // console.log(res);
                if(res.code !== 0 ) return layer.msg(res.message)
                renderAvatar(res.data)
            },
           
        })
}

const renderAvatar = ({user_pic,username,nickname}) => {
         const  name = nickname || username
         if(user_pic) {
            $(".text-avatar").hide()
            $(".layui-nav-img").attr('src',user_pic).show()
         }else {
            $(".layui-nav-img").hide()
            $(".text-avatar").html(name[0].toUpperCase()).show()
         }
         $(".welcome").html(`欢迎&nbsp;&nbsp;${name}`)
}