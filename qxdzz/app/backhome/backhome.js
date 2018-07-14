var ourApp = angular.module("ourApp");
ourApp.controller("backstageNav",function($rootScope,$scope,$state,$stateParams,navMenu,ajaxService,_Cookie) {
    /**
     * 登录状态
     */
    //(_Cookie.getCookie('accountLogin')=='true') ? 
    //console.log("管理员上线"):
    //(bootbox.alert("请先登录", function(){$state.go('login')}));
    //账号 console.log($stateParams)

    $scope.accountName = $stateParams.account
  
    //
    //导航栏渲染     
    $scope.menu = navMenu;
    $scope.list_show= function(id) {     
        $scope.menuId = id;
        sessionStorage.setItem('nav',id);     
    };

    $scope.active = function(id) {        
        $scope.itemId = id;
        sessionStorage.setItem('navChild',id)
    };
    
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