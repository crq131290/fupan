angular.module('ourApp')
    .factory('ajaxService',function($http,_path){
        return {
            //登录接口请求
            login:function(params) {
                return $http.post(_path.login(),params)
            },
            //退出接口请求
            logout:function() {
                return $http.get(_path.logout())
            },
            //获取分类列表
            getClassifyLists:function(classifyName) {
                return $http.get(_path.getClassifyLists(classifyName))
            },
            //article管理部分
            getArtcileClass:function(params) {
                return $http.get(_path.getArticleClass(),params)
            },
            //获取articleList
             getArtcileList:function(params) {
                return $http.post(_path.getArticleList(),params)
            },
            //查看article
            getArtcile:function(id) {
                return $http.get(_path.getArticle(id))
            },
            //新增article
            addArtcile:function(params) {
                return $http.post(_path.addArticle(),params)
            },
            //编辑article
            editArticle:function(params,id) {
                return $http.put(_path.editArticle(id),params)
            },
            //修改上下线
            articleStatus:function(params,id) {
                return $http.put(_path.articleStatus(id),params)
            },
            //删除article
            deleteArticle:function(params,id) {
                return $http.delete(_path.deleteArticle(id),params)
            },
            //获取单个article列表
            oneArticle:function(id,params) {
                return $http.get(_path.oneArticle(id),params)
            },
            // //按条件获取列表
            // searchArticle:function(params) {
            //     return $http({
            //         method:'GET',
            //         url:_path.searchArticle(),
            //         params:params
            //     })
            // },
            //上传图片
            postImg:function() {
                return $http({
                    method:'post',
                    url:_path.postImg(),
                    params:params,
                    headers:{
                        'Content-type':undefined
                    },
                    transformRequest:function (data) {
                        return data
                    }
                })
            },
            //video管理部分
            //video获取分类 .
            getVideoClass:function() {
                return 'carrots-admin-ajax/a/article/classify'
            },
            ///a/videos
            getVideoList:function(params) {
                return $http.post(_path.getVideoList(),params)
            }, 
            //新增视频
            addOneVideo:function(params){
                return $http.post(_path.addOneVideo(),params)
            },
            //编辑视频
            editOneVideo:function(params,id){
                return $http.put(_path.editOneVideo(id),params)
            },
            //获取单个视频 
            getOneVideo:function(id) {
                return $http.get(_path.getOneVideo(id))
            },
            //老师昵称删除 .
            addAuthor:function(params) {
                return $http({
                    method:'POST',
                    url:_path.addAuthor(),
                    params:params
                })                
            },
            //老师昵称删除 .
            deleteAuthor:function(params) {
                return $http({
                    method:'DELETE',
                    url:_path.deleteAuthor(),
                    data:params
                })                
            },           
            //获取用户列表
            getUserList:function(params) {
                return $http.post(_path.getUserList(),params)
            },
            //获取用户列表
            getOneUser:function(params,id) {
                return $http.get(_path.getOneUser(id),params)
            },
            //更改用户状态
            userStatus:function(params,id) {
                return $http.put(_path.userStatus(id),params)
            },
            //获取模块列表
            getModules:function(params) {
                return $http.post(_path.getModules(),params)
            },
            //获取账户列表
            getAccounts:function(params) {
                return $http.post(_path.getAccounts(),params)
            },
            //获取单个账户  
            getOneAccount:function(id) {
                return $http.get(_path.getOneAccount(id))
            },
            //编辑账户  
            editAccount:function(params,id) {
                return $http.put(_path.editAccount(id),params)
            },
            //创建账户  
            addAccount:function(params) {
                return $http.post(_path.addAccount(),params)
            },
            //删除账户
            deleteAccount:function(params,id) {
                return $http.delete(_path.deleteAccount(id),params)
            },
            //获取角色名称列表
            getrolenames:function() {
                return $http.get(_path.getrolenames())
            },    
            //获取角色列表
            getRoleList:function(params) {
                return $http.post(_path.getRoleList(),params)
            },   
            //获取单个角色
            getOneRole:function(id) {
                return $http.get(_path.getOneRole(id))
            },  
            //添加角色
            addRole:function(params) {
                return $http.post(_path.addRole(),params)
            },   
            //编辑角色
            editRole:function(params,id) {
                return $http.put(_path.editRole(id),params)
            },   
            //删除角色
            deleteRoleList:function(params,id) {
                return $http.delete(_path.deleteRoleList(id),params)
            },
            //修改密码
            modifyPassword:function(params) {
                return $http.put(_path.modifyPassword(),params)
            }, 
            //获取模块列表
            getModules:function(params) {
                return $http.post(_path.getModules(),params)
            }, 
            //获取单个模块
            getOneModule:function(id) {
                return $http.get(_path.getOneModule(id))
            },  
            //新增模块
            addModule:function(params) {
                return $http.post(_path.addModule(params))
            },  
            //编辑模块
            editModule:function(params) {
                return $http.put(_path.editModule(params))
            },  
            //删除模块列表
            deleteModule:function(params,id) {
                return $http.delete(_path.deleteModule(id),params)
            },   
        }
    })



    
    // putMemberActive: function (params) {
    //     return $http({
    //         url: _path.memberActive(),
    //         method: "put",
    //         headers: {'Content-Type': 'application/json;charset=UTF-8'},
    //         data: JSON.stringify(params),
    //         transformRequest: function (data, headersGetter) {
    //             return data;
    //         }
    //     });
    // },