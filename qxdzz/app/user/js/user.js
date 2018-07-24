var ourApp = angular.module("ourApp");
    ourApp.controller('userCtrl',function userCtrl($http,$rootScope,$location,$scope,$state,$stateParams,navWel,ajaxService,_Cookie,_path){
        
        let vm = this
        console.log(this)
        $scope.params = $state.params;

        // //将字符串转成字符数据
        let bean = $state.params.bean? $state.params.bean.split(",") :null
        $scope.params.bean = bean;
        console.log($scope.params.bean)


        //判断size&Num是否为null
        $scope.params.pageSize ? $scope.params.pageSize: $scope.params.pageSize = 10;
        $scope.params.pageNum ? $scope.params.pageNum: $scope.params.pageNum = 1;
        let params = $scope.params
        console.log(params)
        ajaxService.getUserList(params).then(function(res) {
            let  code;
            code = res.data.code;
            data = res.data.data;
            console.log(res)
            if(code==200) {
                $scope.userList = data
                // $scope.count = data.articleCount;
                // $scope.total = Math.ceil(60/ 10);
                $scope.total = 123
            }; 
        });
        
        //搜索模块    
        $scope.search = function(nickName,grade,phone,status,bean) {
            let beanU1,beanU2;
            bean?beanU1=bean[0]:beanU1=null
            bean?beanU2=bean[1]:beanU2=null
            $state.go("backhome.user",
                {
                    nickName:nickName,
                    grade:grade,
                    phone:phone,
                    status:status,
                    bean:[beanU1,beanU2]
                },
                {
                    reload:true
                }
            )
        }; 
        //编辑//新增//查看
        $scope.compile = function (id) {
            console.log(id)
            $state.go('backhome.userC', {
                id: id
            })
        }             
        
        //账户冻结
        $scope.changeState = function(id) {
            let that = this
            let status = that.item.status;
            // console.log(status)
            bootbox.confirm({
                size: "small",
                message: (status==true) ? ("确定要冻结此项？") : ("确定要解冻此项？"),
                callback:function(result) {
                    if(result) {
                        let params = {
                            // id : id,
                            status: status
                        }
                        ajaxService.userStatus(params,id).then(function(res){
                            $state.go('backhome.user', {},{reload:true})
                        })
                    }
                }
            })          
        }
    })

