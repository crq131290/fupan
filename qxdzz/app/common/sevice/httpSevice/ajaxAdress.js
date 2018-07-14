angular.module('ourApp')
    .factory('_path',function(){
        return {
            //登录接口地址
            login:function() {
                return  'carrots-admin-ajax/admin/login'
            },
            //退出登录接口
            logout:function() {
                return 'carrots-admin-ajax/admin/logout'
            },
            //article管理部分
            //新增article
            addArticle:function() {
                return 'carrots-admin-ajax/a/u/article'
            },
            //编辑article
            //需要对应id
            editArticle:function(id) {
                return 'carrots-admin-ajax/a/u/article' + id
            },
            //修改上下线
            articleStatus:function() {
                return 'carrots-admin-ajax/a/u/article/status'
            },
            //删除article 
            // 需要对应id
            deleteArticle:function(id) {
                return 'carrots-admin-ajax/a/u/article/' + id
            },
            //获得单个article
            // 需要对应id
            oneArticle:function(id) {
                return 'carrots-admin-ajax/a/article/' + id
            },
            //按条件获得article列表
            searchArticle:function() {
                return 'carrots-admin-ajax/a/article/search'
            },
            //上传图片
            postImg:function() {
                return 'carrots-admin-ajax/a/u/img/task'
            }

        }
    })