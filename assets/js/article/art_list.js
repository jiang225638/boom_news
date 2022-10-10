$(function() {
    layer = layui.layer
    form = layui.form
    laypage = layui.laypage
    template.defaults.imports.formatDate = function(date) {
        let dt = new Date(date)
        let Y = (dt.getFullYear() + '').padStart(2,'0')
        let M = (dt.getMonth() + 1 + '').padStart(2,'0')
        let D = (dt.getDate() + '').padStart(2,'0')

        let hh = (dt.getHours() + '').padStart(2,'0')
        let mm = (dt.getMinutes() + '').padStart(2,'0')
        let ss = (dt.getSeconds() + '').padStart(2,'0')
        return `${Y}-${M}-${D} ${hh}:${mm}:${ss}`
    }

   let  p = {
       pagenum: 1,
       pagesize: 3,
       cate_id: '',
       state: '',
    }

    // 渲染列表
    getArtList ()
    function getArtList (){
        $.ajax({
            method:'GET',
            url:`/my/article/list?pagenum=${p.pagenum}&pagesize=${p.pagesize}&cate_id=${p.cate_id}&state=${p.state}`,
            success(res) {
            //    console.log(res);
               if(res.code !== 0) return layer.msg(res.message)
               let htmlStr = template('tpl-table',res)
               $('tbody').empty().append(htmlStr)
               renderPager(res.total)
            }
        }) 
    }

    // 所有分类
    loadCateList()
    function loadCateList() {
        $.ajax({
            method:'GET',
            url:'/my/cate/list',
            success(res) {
            //   console.log(res);
                if(res.code !== 0 ) return layer.msg('获取文章列表失败！')
                let htmlStr = template('tpl-form', res)
                $('[name=cate_id]').empty().html(htmlStr)
                form.render()
            }
        })
    }
//    筛选按钮
    $('#form-sub').on('submit',function(e) {
          e.preventDefault()
         let cate_id = $('[name=cate_id]').val()
         p.cate_id = cate_id
         let state = $('[name=state]').val()
         p.state = state
         getArtList ()
        //  loadCateList() 
    })
    
    function renderPager(total){
        laypage.render({
            elem:document.getElementById("pageWrapper"),
            count:total,
            limit:p.pagesize,
            curr:p.pagenum,
            layout:['count','limit','prev', 'page', 'next','skip'],
            limits:[3,6,9,12],

            jump: function(obj, first){
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj,first); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.curr,obj.limit); //得到每页显示的条数
                p.pagenum = obj.curr
                p.pagesize = obj.limit
                //首次不执行
                if(!first){
                  //do something
                getArtList ()

                }
              }
        })
    }
       
    //  删除
    $('tbody').on('click','.btnDel',function() {
        let id = $(this).attr("abc")
        let len = $('.btnDel').length
        // console.log(len);
        layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(index){
            // console.log($(this).attr("data-id"));
            // console.log(id);
            $.ajax({
               method:'DELETE',
               url:`/my/article/info?id=${id}`,
               success(res) {
                //    console.log(res);
                   if(res.code !== 0 ) return layer.msg(res.message)
                   layer.msg(res.message)
                   if(len === 1) {
                      p.pagenum = p.pagenum === 1 ? 1 : p.pagenum - 1
                   }
                   getArtList ()
               }
   
            })
            layer.close(index);
          });

        
    })




})