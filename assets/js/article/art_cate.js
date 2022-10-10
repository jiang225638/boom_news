$(function() {
    layer = layui.layer
    form = layui.form
    loadCateList()
    function loadCateList() {
        $.ajax({
            method:'GET',
            url:'/my/cate/list',
            success(res) {
            //   console.log(res);
                if(res.code !== 0 ) return layer.msg('获取文章列表失败！')
                let htmlStr = template('tpl-cate', res)
                $('tbody').empty().html(htmlStr)
            }
        })
    }

    
    let indexAdd = undefined
    $('#btnAddCate').on('click',function() {
        indexAdd = layer.open({
            type:1,
            title: '添加分类名称',
            area: ['500px', '300px'],
            content: $('#dialog-addCate').html()
          });  
    })

    // 表单提交判断修改和添加
    let isEdit = false   // 用来记录当前状态
    $('body').on('submit','#addForm',function(e){
        e.preventDefault()
           
        if(isEdit) {
            let id = $(this).attr('data-id')
        //   console.log('修改');
             $.ajax({
                 method:'PUT',
                 url:'/my/cate/info',
                 data:$(this).serialize(),
                 // data:form.val('addFormFilter'),
                 success(res) {
                     // console.log(res);
                     if(res.code !== 0) return layer.msg(res.message)
                     layer.msg(res.message)
                     loadCateList()
                 }
             })
        }else {
            $.ajax({
            method:'POST',
            url:'/my/cate/add',
            data:$(this).serialize(),
            // data:form.val('addFormFilter'),
            success(res) {
                // console.log(res);
                if(res.code !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                loadCateList()
            }
          })
        //   console.log('添加');
        }
        isEdit = false
        layer.close(indexAdd)
        
    })
    
    
    // 点击修改
    $('tbody').on('click','#btn-edit',function( ) {
        isEdit = true

        // console.log($('#btn-edit').attr('data-id'));
        indexAdd = layer.open({
            type:1,
            title: '修改分类名称',
            area: ['500px', '300px'],
            content: $('#dialog-addCate').html()
          }); 
         
          let id = $(this).attr('data-id')
          $.ajax({
            method:'GET',
            url:`/my/cate/info?id=` + id,
            success(res) {
                // console.log(res);
                if(res.code !== 0) return layer.msg(res.message)
                form.val('addFormFilter',res.data)
            }
          })

      })
    
      $('tbody').on('click','#btn-del',function() {
        // console.log(id);
        
        let id =  parseInt($(this).attr('data-id'))
        layer.confirm('确定删除？', {icon: 3, title:'提示'}, function(index){
            //do something
              $.ajax({
                method:'DELETE',
                url:`/my/cate/del?id=` + id,
                success(res) {
                     if(res.code !== 0 ) return layer.msg(res.message)
                     layer.msg(res.message)
                     loadCateList()
                }
              })
            layer.close(index);
          });
      })
})





