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
        url: "/backhome/:account",
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

    .state("backhome.articles",{
        params: {
            title: null,
            author: null,
            status: null,
            classify: null,
            praise: null,
            collect: null,
            pageSize: null,
            pageNum: null
        },
        url: "/articles/:title/:author/:status/:classify/:praise/:collect/:pageSize/:pageNum",
        templateUrl: "app/business/html/article.html",
         controller:"articleCtrl",
        resolve: {  //懒加载文件
            loadMyFile: _lazyLoad(['app/business/js/article.js'])
        }  
    })
    .state("backhome.articleEd",{
        url: "/articleEd/:type/:id",
        templateUrl: "app/business/html/articleEd.html",
        controller:"articleEdCtrl",
        resolve: {  //懒加载文件
            loadMyFile: _lazyLoad(['app/business/js/articleEd.js'])
        }  
    })
    .state("backhome.videos",{
        params: {
            title: null,
            classify: null,
            grade: null,
            subject: null,
            praise: null,
            collect: null,
            author: null,
            status: null,
            pageSize: null,
            pageNum: null
        },
        url: "/videos/:title/:classify/:grade/:subject/:praise/:collect/:author/:status/:pageSize/:pageNum",
        templateUrl: "app/business/html/video.html",
        controller:"videoCtrl",
        resolve: {  //懒加载文件
            loadMyFile: _lazyLoad(['app/business/js/video.js','app/common/directive/videoself/videoself.css','app/common/directive/videoself/videoself.js'])
        }  
    })
    .state("backhome.videoEd",{
        url: "/videoEd/:type/:id",
        templateUrl: "app/business/html/videoEd.html",
        controller:"videoEdCtrl",
        resolve: {  //懒加载文件
            loadMyFile: _lazyLoad(['app/business/js/videoEd.js','app/common/directive/videoself/videoself.css','app/common/directive/videoself/videoself.js'])
        }  
    })
    .state("backhome.forum",{
        url: "/forum",
        templateUrl: "app/business/html/forum.html"
    })
    .state("backhome.forumC",{
        url: "/forumC",
        templateUrl: "app/business/html/forumC.html"
    })
    .state("backhome.treeHole",{
        url: "/treeHole",
        templateUrl: "app/business/html/treeHole.html"
    })
    .state("backhome.treeHoleC",{
        url: "/treeHoleC",
        templateUrl: "app/business/html/treeHoleC.html"
    })

    //内容管理/banner/公告/科目2

    .state("backhome.banner",{
        url: "/banner",
        templateUrl: "app/content/html/banner.html"
    })
    .state("backhome.bannerEd",{
        url: "/bannerEd",
        templateUrl: "app/content/html/bannerEd.html"
    })
    .state("backhome.pubNotice",{
        url: "/pubNotice",
        templateUrl: "app/content/html/pubNotice.html"
    })
    .state("backhome.pubNoticeEd",{
        url: "/pubNoticeEd",
        templateUrl: "app/content/html/pubNoticeEd.html"
    })
    .state("backhome.subject",{
        url: "/subject",
        templateUrl: "app/content/html/subject.html"
    })
    .state("backhome.subjectEd",{
        url: "/subjectEd",
        templateUrl: "app/content/html/subjectEd.html"
    })

    //用户管理/用户列表2
    .state("backhome.users",{
        params: {
            id: null,
            nickName: null,
            email: null,
            phone: null,
            bean: null,
            grade: null,
            status: null,
            prefecture:null,
            pageSize: null,
            pageNum: null
        },
        url: "/users/:id/:nickName/:email/:phone/:bean/:grade/:status/:prefecture/:pageSize/:pageNum",
        templateUrl: "app/user/html/user.html",
        controller:"userCtrl",
        resolve: {  //懒加载文件
            loadMyFile: _lazyLoad(['app/user/js/user.js'])
        }
    })
    .state("backhome.userC",{
        url: "/userC/:id",
        templateUrl: "app/user/html/userC.html",
        controller:"userCCtrl",
        resolve: {  //懒加载文件
            loadMyFile: _lazyLoad(['app/user/js/userC.js'])
        }
    })


    //后台管理/账户/角色/修改/模块2

    .state("backhome.account",{
        params: {
            username: null,
            roleName: null,
            pageSize: null,
            pageNum: null
        },
        url: "/account/:username/:roleName/:pageSize/:pageNum",
        templateUrl: "app/backstage/html/account.html",
        controller:"accountCtrl",
        resolve: {  //懒加载文件
            loadMyFile: _lazyLoad(['app/backstage/js/account.js'])
        }
    })
    .state("backhome.accountEd",{
        url: "/accountEd/:type/:id",
        templateUrl: "app/backstage/html/accountEd.html",
        controller:"accountEdCtrl",
        resolve: {  //懒加载文件
            loadMyFile: _lazyLoad(['app/backstage/js/accountEd.js'])
        }
    })
    .state("backhome.role",{
        params: {
            roleName: null,
            pageSize: null,
            pageNum: null
        },
        url: "/role/:roleName/:pageSize/:pageNum",
        templateUrl: "app/backstage/html/role.html",
        controller:"roleCtrl",
        resolve: {  //懒加载文件
            loadMyFile: _lazyLoad(['app/backstage/js/role.js'])
        }
    })
    .state("backhome.roleEd",{
        url: "/roleEd/:type/:id",
        templateUrl: "app/backstage/html/roleEd.html",
        controller:"roleEdCtrl",
        resolve: {  //懒加载文件
            loadMyFile: _lazyLoad(['app/backstage/js/roleEd.js'])
        }
    })
    .state("backhome.password",{
        url: "/pwd",
        templateUrl: "app/backstage/html/pwd.html",
        controller:"pwdCtrl",
        resolve: {  //懒加载文件
            loadMyFile: _lazyLoad(['app/backstage/js/pwd.js'])
        }
    })
    .state("backhome.module",{
        params: {
            moduleName: null,
            pageSize: null,
            pageNum: null
        },
        url: "/module/:moduleName/:pageSize/:pageNum",
        templateUrl: "app/backstage/html/module.html",
        controller:"moduleCtrl",
        resolve: {  //懒加载文件
            loadMyFile: _lazyLoad(['app/backstage/js/module.js'])
        }
    })
    .state("backhome.moduleEd",{
        url: "/moduleEd/:type/:id",
        templateUrl: "app/backstage/html/moduleEd.html",
        controller:"moduleEdCtrl",
        resolve: {  //懒加载文件
            loadMyFile: _lazyLoad(['app/backstage/js/moduleEd.js'])
        }
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
// ourApp.run(function ($rootScope, $templateCache, $modal, $cookies, $state, $location, managerService, roleService) {
//     //默认分页参数
//     $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {


//         if (toParams.page != undefined) {
//             toParams.page = toParams.page || 1;
//         }
//         if (toParams.size != undefined) {
//             toParams.size = toParams.size || 10;
//         }
//     });
// })