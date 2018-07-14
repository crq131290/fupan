var ourApp = angular.module("ourApp");
    ourApp.controller('loginCtrl',function($rootScope,$scope,$state,$timeout,_Cookie,ajaxService){
        // 'use strict'
        /**
         * 程荣强
         * @param {object} response 判断服务数据
         */
        $scope.message = "登录";
        $scope.show_msg = false;
        $scope.status =true
        
        let loginSuccess = function(res) {
            console.log(res);
            let navData = res.data;
            $scope.code = res.data.code;
            switch($scope.code){
                case 200 : {
                    console.log("请求数据成功")
                    //需要判断用户权限
                    //是否需要分级？？？？
                    //(res.data.super?)
                    //sessionStorage.setItem('superAccount','true'):
                    //sessionStorage.setItem('superAccount','false');

                    sessionStorage.setItem('accountLogin','true');
                    _Cookie.setCookie('accountLogin','true',1000*1000);                    
                    $state.go('backhome.welcome',
                    {                           
                        account:$scope.name
                    });
                    //sessionStorage.setItem('menu',JSON.stringify(navData));//服务器上的列表                   
                };
                break ;
                //验证用户名
                case -5003: {
                    $scope.message = '用户不存在';
                    $scope.status = true;
                    $timeout(function(){    
                        $scope.status = false;
                        $scope.message = '登录';
                    },3000)
                };
                break;
                //验证密码格式
                case -1 : {
                    $scope.message = '密码格式错误';
                    $scope.status = true;
                    $timeout(function(){    
                        $scope.status = false;
                        $scope.message = '登录';
                    },3000)
                };
                break;
                //验证密码
                case -5004: {
                    $scope.message = '密码不存在';
                    $scope.status = true;
                    $timeout(function(){    
                        $scope.status = false;
                        $scope.message = '登录';
                    },3000)
                };
                break;
            }
        };
        let loginErr = function(res) {
            console.error(res)
        };

        $scope.keydown = function(e) {
            ($scope.pwd==null || $scope.name==null)?
            $scope.status =true : $scope.status =false;                     
            (e.keyCode==13 && $scope.name!=null) ? $scope.login():'';
        }
        /**
         * 调用ajaxService
         */
        $scope.login = function() {
            let  params = {
                name: $scope.name,
                pwd: $scope.pwd
            }
            ajaxService.login(params).then(loginSuccess,loginErr)
        }     
    })  
