angular.module('ourApp')
    .factory('_path',function(){
        return {
            //登录接口地址
            login:function() {
                return  'carrots-admin-ajax/a/login'
            },
            //退出登录接口
            logout:function() {
                return 'carrots-admin-ajax/a/logout'
            },
            //获取分类列表
            getClassifyLists:function(classifyName) {
                return 'carrots-admin-ajax/a/classify/' + classifyName + 'classifyName '
            },
            //article管理部分
            //article获取分类 .
            getArticleClass:function() {
                return 'carrots-admin-ajax/a/article/classify'
            },
            //articleList获取 .
             getArticleList:function() {
                return 'carrots-admin-ajax/a/articles'
            },
             //获得单个article
             // 需要对应id  .
            getArticle: function(id) {
                return 'carrots-admin-ajax/a/article/' + id
            },
             //新增article .
            addArticle:function() {
                return 'carrots-admin-ajax/a/article'
            },
            //编辑article
            //需要对应id .
            editArticle:function(id) {
                return 'carrots-admin-ajax/a/article/' + id
            },
            //修改上下线 .
            articleStatus:function(id) {
                return 'carrots-admin-ajax/a/article/'+id+'/status'
            },
            //删除article .
            // 需要对应id
            deleteArticle:function(id) {
                return 'carrots-admin-ajax/a/article/' + id
            },           
     
            // //按条件获得article列表//暂无
            // searchArticle:function() {
            //     return 'carrots-admin-ajax/a/article/search'
            // },
            //上传图片//暂无
            postImg:function() {
                return 'carrots-admin-ajax/a/u/img/task'
            },
            /**
             * 视频模块
             */
            //video管理部分
            //video获取分类 .
            // getVideoClass:function() {
            //     return 'carrots-admin-ajax/a/article/classify'
            // },
            //videoList获取 .
            getVideoList:function() {
                return 'carrots-admin-ajax/a/videos'
            },
            //新增视频
            addOneVideo:function(){
                return 'carrots-admin-ajax/a/video'
            },
            //编辑视频
            editOneVideo:function(id){
                return 'carrots-admin-ajax/a/video/' + id
            },
            //获取单个视频
            getOneVideo:function(id) {
                return 'carrots-admin-ajax/a/video/' + id
            },
            //老师昵称删除 .
            addAuthor:function() {
                return 'carrots-admin-ajax/a/author'
            },
            //删除作者
            deleteAuthor:function() {
                return 'carrots-admin-ajax/a/author'
            },
            //获取用户列表
            getUserList:function() {
                return 'carrots-admin-ajax/a/users'
            },
            //获取用户列表
            getOneUser:function(id) {
                return 'carrots-admin-ajax/a/user/'+ id
            },
            //更改用户状态
            userStatus:function(id) {
                return 'carrots-admin-ajax/a/user/' + id + '/status'
            },
            //获取模块列表
            getModules:function(id) {
                return 'carrots-admin-ajax/a/modules'
            },
            //获取账户列表
            getAccounts:function(id) {
                return 'carrots-admin-ajax/a/accounts'
            },
            //获取单个账户  
            getOneAccount:function(id) {
                return 'carrots-admin-ajax/a/account/' + id
            },
            //编辑账户  
            editAccount:function(id) {
                return 'carrots-admin-ajax/a/account/' + id
            },
            //创建账户  
            addAccount:function() {
                return 'carrots-admin-ajax/a/account'
            },
            //删除账户
            deleteAccount:function(id) {
                return 'carrots-admin-ajax/a/account/' + id
            },
            //获取角色名称列表
            getrolenames:function() {
                return 'carrots-admin-ajax/a/rolenames'
            },   
            //获取角色列表
            getRoleList:function() {
                return 'carrots-admin-ajax/a/roles'
            },   
            //获取单个角色
            getOneRole:function(id) {
                return 'carrots-admin-ajax/a/role/' + id
            },   
            //添加角色
            addRole:function(id) {
                return 'carrots-admin-ajax/a/role'
            },   
            //编辑角色
            editRole:function(id) {
                return 'carrots-admin-ajax/a/role'
            },   
            //删除角色
            deleteRoleList:function(id) {
                return 'carrots-admin-ajax/a/role/' + id
            },  
            //修改密码
            modifyPassword:function() {
                return 'carrots-admin-ajax/a/account/password'
            },  
            //获取模块列表
            getModules:function() {
                return 'carrots-admin-ajax/a/modules'
            },  
            //获取单个模块
            getOneModule:function(id) {
                return 'carrots-admin-ajax/a/module/' + id
            },  
            //新增模块
            addModule:function(params) {
                return 'carrots-admin-ajax/a/module'
            },  
            //编辑模块
            editModule:function(params) {
                return 'carrots-admin-ajax/a/module'
            },  
            //删除模块列表
            deleteModule:function(id) {
                return 'carrots-admin-ajax/a/module/' + id
            },  
        }
    })