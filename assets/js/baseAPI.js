$.ajaxPrefilter((option)=>{
      option.url = 'http://big-event-vue-api-t.itheima.net' + option.url
       
      const format2json = (val)=>{
        let obj = {}
        val.split("&").forEach(item=>{
            let kv = item.split("=")
            // 需要对value值进行一次解码操作
            obj[kv[0]] = decodeURIComponent(kv[1])
        })
        return  JSON.stringify(obj)
      }

    //   统一为所有符合要求的接口判断是否需要token
    
    // indexOf startsWith endsWith includes 包含，包括的意思
    if(option.url.includes('/my/')) {
         option.headers = {
            Authorization:localStorage.getItem('token') || ''
         }
    }
    
     option.data = option.data && format2json(option.data)
     option.contentType = "application/json"
    //  option.success()  

    // 判断是否登录，如果没登录就强制跳转并清空token
     option.error = function(err) {
        // console.log(res);
       if( err.responseJSON?.code === 1 &&
           err.responseJSON?.message === "身份认证失败！") {
          localStorage.clear()
          location.href = '/login.html'
        }
      
     }
}) 