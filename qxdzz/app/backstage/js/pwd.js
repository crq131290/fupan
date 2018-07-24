angular.module("ourApp");
    ourApp.controller('pwdCtrl',function accountCtrl($http,$rootScope,$location,$scope,$state,$stateParams,navWel,ajaxService,_Cookie,_path){
        console.log("密码模块上线")
        let vm = this;
        console.log(vm);
        // console.log($state.params);
        // $scope.params = $state.params;
        $scope.show_msg = false;
                //上线逻辑
                $scope.sendData =function() {
                    bootbox.confirm({
                        size: "small",
                        message: ("你确定保存吗?") ,
                        callback:function(result) {
                            if(result) {
                                userId =3;
                                let params = {
                                    // userName:"wangwu",
                                    id: userId==-1 ? null : userId,//获取用户id
                                    // name: $scope.accountInfo.name,
                                    passWord: $scope.pw1,
                                    oldPassword: $scope.pw3,
                                };
                                // console.log(params)
                                ajaxService.modifyPassword(params).then(function (res){
                                    if(res.data.code==200) {
                                        // console.log(res)                
                                        bootbox.confirm({
                                            size: "small",
                                            message: ("跟改密码成功") ,
                                            callback:function() {                                            
                                                $state.go('backhome.welcome',{},{reload: true})                                
                                            }
                                        }) 
                                    } else {
                                        alert("传说中的迷之错误")
                                    };         
                                }
                            ) 
                        }
                    }
                }
            )
        }    
    });
    ourApp.directive('compare',function(){     
        var o = {};
        o.strict = "AE";
        o.scope = {
            orgText: '=compare'
        };
        o.require= 'ngModel';
        o.link =function(sco,ele,att,con) {
            con.$validators.compare =function(value) {
                return value ==sco.orgText;
            }
            sco.$watch('orgText',function(){
                con.$validate();
            })
        }
        return o        
    })