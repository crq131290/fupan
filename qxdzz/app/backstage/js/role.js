var ourApp = angular.module("ourApp");
    ourApp.controller('roleCtrl',function accountCtrl($http,$rootScope,$location,$scope,$state,$stateParams,navWel,ajaxService,_Cookie,_path){
        let vm = this;
        console.log(vm);
        console.log($state.params);
        $scope.params = $state.params;
        console.log($scope.params)
        
        //判断size&Num是否为null
        $scope.params.pageSize ? $scope.params.pageSize: $scope.params.pageSize = 10;
        $scope.params.pageNum ? $scope.params.pageNum: $scope.params.pageNum = 1;

        let getACSuccess = function successCallback(res) {
            var  code = res.data.code;
            console.log(res)
            if(code==200) {
                $scope.roleLists = res.data.data;
                console.log( $scope.roleLists);
                $scope.total = 123;
            };     
        };
        let getACErr = function successCallback(res) {
            let code = res.data.code;
            console.log(res);
        };
        
        
        //数据请求
        let params = $scope.params;
        ajaxService.getRoleList(params).then(getACSuccess,getACErr);   
       

        //角色名列表
        $scope.roleNames = JSON.parse(sessionStorage.getItem('rolenames'))
        $scope.params.roleName ?  
        $scope.params.roleName = $scope.params.roleName :
        $scope.params.roleName = $scope.roleNames[0]
        //搜索模块    
        $scope.search = function(roleName) {
            console.log($scope.params)
            $state.go("backhome.role",
                {
                    roleName: roleName,
                    // pageSize: pageSize,
                    // pageNum: pageNum
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
            $state.go('backhome.roleEd', {
                type:type,
                id: id
            })
        }

         //删除账号
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
                        ajaxService.deleteRoleList(params,id).then(function(res){
                            console.log('删除角色成功')
                        })
                    }
                }
            }) 
        }
    })