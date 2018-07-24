var ourApp = angular.module("ourApp");
ourApp.controller("backstageNav",function($rootScope,$scope,$state,$stateParams,navWel,ajaxService,_Cookie) {
    /**
     * 登录状态
     */
    //(_Cookie.getCookie('accountLogin')=='true') ? 
    //console.log("管理员上线"):
    //(bootbox.alert("请先登录", function(){$state.go('login')}));
    //账号 console.log($stateParams)
    
    /**
     * 获取模块列表
     */
    $scope.accountName = $stateParams.account
    let fmodules = [];
    console.log(navWel)
    
    ajaxService.getModules().then(function(res){
        let code,data;
            code = res.data.code;
            data = res.data.data
        if(code==200){
            console.log(data)
            let n=0;
            for(i of data) {
                if(i.parentId==0) {
                    fmodules[n]=i
                    n++
                }
            }
            // console.log(fmodules)
            for(j of fmodules ) {
            // 声明子模块
                j.sub=[]
                for(i of data) {
                    if(i.parentId==j.id) {
                        j.sub.push(i)
                    }
                }
                // j.sub.sort(compare('index')) //升序
            }
            fmodules.unshift(navWel) ;
            // fmodules.sort(compare('index')) //升序
            console.log(fmodules)
            $scope.menu = fmodules
        }
    })

    
    /**
     * 升序函数
     */
    // function compare(prop) {
    //     return function(a,b) {
    //         var v1 = a[prop];
    //         var v2 = b[prop];
    //         return v1-v2
    //     }
    // }

    //导航栏渲染     
    // $scope.menu = navMenu;
    $scope.list_show= function(id) {     
        $scope.menuId = id;
        sessionStorage.setItem('nav',id);     
    };

    $scope.active = function(id) {        
        $scope.itemId = id;
  
        sessionStorage.setItem('navChild',id)
    };
    
        //文章分类判断是否有缓存
        if(!sessionStorage.getItem('articleClass')) {
            ajaxService.getClassifyLists('article').then(function(res){
                let code = res.data.code
                if(code==200) {
                    // articleClass = res.data.data
                    let articleClass = [ 
                        {name:'全部'},
                        {name:'科学'},
                        {name:'制造'},
                        {name:'生物'},
                    ]
                    sessionStorage.setItem('articleClass',JSON.stringify(articleClass));

                }
            })
        } 
        //视频分类判断是否有缓存
        if(!sessionStorage.getItem('videoClass')) {
            ajaxService.getClassifyLists('video').then(function(res){
                let code = res.data.code
                if(code==200) {
                    // let videoClass = res.data.data
                    let videoClass = [ 
                        {name:'全部'},
                        {name:'科学'},
                        {name:'制造'},
                        {name:'生物'},
                    ]
                    sessionStorage.setItem('videoClass',JSON.stringify(videoClass));
                }
            })
        } 
        //年级分类判断是否有缓存
        if(!sessionStorage.getItem('gradeClass')) {
            ajaxService.getClassifyLists('grade').then(function(res){
                let code = res.data.code
                if(code==200) {
                    // let gradeClass = res.data.data
                    let gradeClass = [ 
                        {name:'全部'},
                        {name:'科学'},
                        {name:'制造'},
                        {name:'生物'},
                    ]
                    sessionStorage.setItem('gradeClass',JSON.stringify(gradeClass));
                }
            })
        }
        //科目分类判断是否有缓存
        if(!sessionStorage.getItem('subjectClass')) {
            ajaxService.getClassifyLists('subject').then(function(res){
                let code = res.data.code
                if(code==200) {
                    // let subjectClass = res.data.data
                    let subjectClass = [ 
                        {name:'全部'},
                        {name:'科学'},
                        {name:'制造'},
                        {name:'生物'},
                    ]
                    sessionStorage.setItem('subjectClass',JSON.stringify(subjectClass));
                }
            })
        }

        // 角色名称列表
        if(!sessionStorage.getItem('rolenames')) {
            ajaxService.getrolenames().then(function(res){
                let code = res.data.code
                if(code==200) {
                    console.log(res)
                    let rolenames = res.data.data
                    rolenames.unshift('全部')
                    sessionStorage.setItem('rolenames',JSON.stringify(rolenames));
                }
            })
        }

    //登出
    let logoutSuccess = function successCallback(res) {
        let code = res.data.code;
        console.log(res)
        if(code==200) {
            $state.go('login') ;
            _Cookie.setCookie('accountLogin','true',-1000*1000);
            // sessionStorage.accountLogin = false;
            // sessionStorage.removeItem('account');
        }
    };
    let logoutErr = function successCallback(res) {
        let code = res.data.code;
        console.log(res)
    };
    $scope.logout = function() {
        let params = {
            name: $scope.accountName 
        }
        ajaxService.logout(params).then(logoutSuccess,logoutErr)
    }
})