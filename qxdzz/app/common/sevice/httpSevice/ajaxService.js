angular.module('ourApp')
    .factory('ajaxService',function($http,_path){
        return {
            //登录接口请求
            login:function(params) {
                return $http.post(_path.login(),params)
            },
            //退出接口请求
            logout:function(params) {
                return $http.post(_path.logout(),params)
            },
            //article管理部分
            //新增article
            addArtcile:function(params) {
                return $http.post(_path.addArtcile(),params)
            },
            //编辑article
            editArticle:function(params,id) {
                return $http.put(_put.editArticle(id),params)
            },
            //修改上下线
            articleStatus:function(params) {
                return $http.put(_put.articleStatus(),params)
            },
            //删除article
            deleteArticle:function(id,params) {
                return $http.delete(_path.deleteArticle(id),params)
            },
            //获取单个article列表
            oneArticle:function(id,params) {
                return $http.get(_path.oneArticle(id),params)
            },
            //按条件获取列表
            searchArticle:function(params) {
                return $http({
                    method:'GET',
                    url:_path.searchArticle(),
                    params:params
                })
            },
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
            }
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