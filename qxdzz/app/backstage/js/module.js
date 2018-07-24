var ourApp = angular.module("ourApp");
    ourApp.controller('moduleCtrl',function accountCtrl($http,$rootScope,$location,$scope,$state,$stateParams,navWel,ajaxService,_Cookie,_path){
        let vm = this
        console.log(vm)
        console.log($state.params)
        $scope.params = $state.params;
        
        //判断size&Num是否为null
        $scope.params.pageSize ? $scope.params.pageSize: $scope.params.pageSize = 10;
        $scope.params.pageNum ? $scope.params.pageNum: $scope.params.pageNum = 1;

        let getACSuccess = function successCallback(res) {
            var  code = res.data.code;
            console.log(res)
            $scope.modulesList = [];
            if(code==200) {
                for(i of res.data.data) {
                    if(i.parentId!=0) {
                        $scope.modulesList.push(i)  
                    }
                }
                console.log( $scope.modulesList);
                $scope.total =Math.ceil($scope.modulesList.length/$scope.params.pageSize);
            };     
        };
        let getACErr = function successCallback(res) {
            let code = res.data.code;
            console.log(res);
        };
        
        //数据请求
        let params = $scope.params;
        ajaxService.getModules(params).then(getACSuccess,getACErr);
        // console.log($stateParams)
        //搜索模块    
        $scope.search = function(moduleName) {
            $state.go("backhome.module",
                {
                    moduleName: moduleName,
                },
                {
                    reload:true
                }
            )
        };
        
        //编辑//新增//查看
        $scope.compile = function (type,id) {
            console.log(type)
            console.log(id)
            $state.go('backhome.moduleEd', {
                type:type,
                id: id
            })
        }




        //删除
        $scope.delete = function (id){
            let that = this
            bootbox.confirm({
                size: "small",
                message: "确定要删除此项？",
                callback:function(result) {
                    if(result) {
                        let params = {
                            id : id
                        }
                        ajaxService.deleteModule(params,id).then(function(res){
                            console.log(res)
                            console.log("删除模块成功")
                            // $scope.getList()
                        })
                    }
                }
            }) 
        }
    })