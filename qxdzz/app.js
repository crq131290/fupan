//后台路由
var ourApp = angular.module("ourApp",["ui.router","ngMessages","oc.lazyLoad","angularFileUpload"]);
ourApp.config(function ($stateProvider,$locationProvider,$urlRouterProvider, $controllerProvider,$httpProvider,_CookieProvider) {
    //懒加载函数
    var _lazyLoad = function(loaded) {
        return function($ocLazyLoad) {
            return $ocLazyLoad.load(loaded,{
                serie: true //打开平行加载文件功能
            });
        };
    };    

    $urlRouterProvider.when("","/login");
    $stateProvider 

    //登录页
    /**
     * 程荣强
     * 登录页与欢迎页
     */
    .state("login",{
        url: "/login",
        templateUrl: "app/login/login.html",
        controller: "loginCtrl",
        resolve: {  //懒加载文件
            loadMyFile: _lazyLoad(['app/login/login.js'])
        }  
    })
    .state("backhome",{
        url: "/backhome?account",
        templateUrl: "app/backhome/backhome.html",
        controller: "backstageNav",
         resolve: {  //懒加载文件
            loadMyFile: _lazyLoad(['app/backhome/backhome.css','app/backhome/backhome.js'])
        }  
    })
    .state("backhome.welcome",{
        url: "/welcome",
        templateUrl: "app/welcome/welcome.html"
    })

    //业务管理/文章/视频/论坛/树洞2

    .state("backhome.article",{
        url: "/article",
        templateUrl: "app/business/html/article.html"
    })
    .state("backhome.vedio",{
        url: "/vedio",
        templateUrl: "app/business/html/vedio.html"
    })
    .state("backhome.forum",{
        url: "/forum",
        templateUrl: "app/business/html/forum.html"
    })
    .state("backhome.treeHole",{
        url: "/treeHole",
        templateUrl: "app/business/html/treeHole.html"
    })

    //内容管理/banner/公告/科目2

    .state("backhome.banner",{
        url: "/banner",
        templateUrl: "app/content/html/banner.html"
    })
    .state("backhome.pubNotice",{
        url: "/pubNotice",
        templateUrl: "app/content/html/pubNotice.html"
    })
    .state("backhome.subject",{
        url: "/subject",
        templateUrl: "app/content/html/subject.html"
    })

    //用户管理/用户列表2

    .state("backhome.user",{
        url: "/user",
        templateUrl: "app/user/user.html"
    })

    //后台管理/账户/角色/修改/模块2

    .state("backhome.account",{
        url: "/account",
        templateUrl: "app/backstage/html/account.html"
    })
    .state("backhome.role",{
        url: "/role",
        templateUrl: "app/backstage/html/role.html"
    })
    .state("backhome.modify",{
        url: "/modify",
        templateUrl: "app/backstage/html/modify.html"
    })
    .state("backhome.module",{
        url: "module",
        templateUrl: "app/backstage/html/module.html"
    })
    //拦截器
    $httpProvider.interceptors.push(function ($rootScope, $q,$location,$state) {
        return {
            request: function(config) {       
                return config;
            },
            requestError: function() {
                return $q.reject(err);
            },
            responseError: function(rejection) {
                return $q.reject(rejection);
            },
            reponse: function(response) {                
                if(response.data.code == '未登录') {                   
                    if (accountLogin == 'true') {
                        //更改用户登录状态
                        _Cookie.setCookie('accountLogin','false');
                    } else {
                        return
                    }
                    } else {
                        return response;
                    };
                }
            };
    }); 
});
ourApp.config(function httpConfig($httpProvider) {
     // Use application/json Content-Type
     //设置请求头
     // $httpProvider.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8';
     // $httpProvider.defaults.headers.patch['Content-Type'] = 'application/json;charset=utf-8';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
        
})