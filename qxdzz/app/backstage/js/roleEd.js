var ourApp = angular.module("ourApp");
    ourApp.controller('roleEdCtrl',function articleEdCtrl($http,$rootScope,$location,$scope,$state,$stateParams,navWel,ajaxService,_Cookie,_path,roleArry){
        console.log("roleEdCtrl上线")
        //console.log($stateParams)
        let userId = $stateParams.id;
        let type = $stateParams.type;
        console.log(roleArry)
        $scope.load = function () {
            switch (type) {
                case '2':
                //console.log(2);
                $scope.header = '编辑';
                $scope.disable = false;
                $scope.tipshow = false;
                check() ;
                break
                case '3':
                //console.log(3);
                $scope.header = '新增';
                $scope.disable = false;
                $scope.tipshow = false;
                $scope.roleInfo = {
                    moduleIds:roleArry
                }
                break
            } 
        }()

        function check() {
            var userId = parseInt($stateParams.id);
            //console.log(userId)            
            ajaxService.getOneRole(userId)
                .then(function (res) {
                    console.log(res) 
                    let code,data;
                    code = res.data.code;
                    data = res.data.data;
                    if(code==200) {
                        $scope.roleInfo = data;
                    }
                }
            )
        }                   
        //上线逻辑
        $scope.sendData =function() {
            let moduleIds = [];
            let n = 0;
            for(let i of $scope.roleInfo.moduleIds) {
                if(i!==false) {
                    moduleIds.push(i);
                    n++
                }
            }
            bootbox.confirm({
                size: "small",
                message: ("你确定保存吗?") ,
                callback:function(result) {
                    if(result) {
                        let params = {
                            roleName:$scope.roleInfo.name,
                            permissions: moduleIds,
                        };
                        console.log(params)
                        if (userId !=-1 && type ==2) {
                            params.id=userId
                            console.log(params)
                            ajaxService.editRole(params,userId).then(function (res){
                                if(res.data.code==200) {                
                                    bootbox.alert({
                                        size: "small",
                                        message: ("编辑成功") ,
                                        callback:function() {                                            
                                            $state.go('backhome.role',{},{reload: true})                                
                                        }
                                    }) 
                                } else {
                                    alert("传说中的迷之错误")
                                };         
                            })
                        } else if(userId==-1 && type ==3){
                            // console.log(111111)
                            ajaxService.addRole(params).then(function(res){
                                if(res.data.code==200) {
                                    console.log(res)                
                                    bootbox.alert({
                                        size: "small",
                                        message: ("新增成功") ,
                                        callback:function() {                                            
                                            $state.go('backhome.role',{},{reload: true})                                
                                        }
                                    }) 
                                } else {
                                    alert("传说中的迷之错误")
                                }; 
                            })
                        }
                    }
                }
            })
        }
        //取消逻辑
        $scope.cancle = function() {
            bootbox.confirm({
                size: "small",
                message: ("你确定取消吗?") ,
                callback:function(result) {
                    if(result) {
                        $state.go('backhome.role',{},{reload: true});
                    }
                }
            })                 
        }  

    })
