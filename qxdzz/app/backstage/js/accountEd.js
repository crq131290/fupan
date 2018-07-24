var ourApp = angular.module("ourApp");
    ourApp.controller('accountEdCtrl',function articleEdCtrl($http,$rootScope,$location,$scope,$state,$stateParams,navWel,ajaxService,_Cookie,_path){
        //console.log("artEd加载完成")
        //console.log($stateParams)
        let userId = $stateParams.id;
        let type = $stateParams.type;

        // //富文本编辑器配置
        // let E = window.wangEditor
        // let editor = new E("#explain");
        // /**
        //  * 所有的配置需在编辑器创建之前完成
        //  */
        // editor.create();
        // console.log(editor)
        $scope.load = function () {
            switch (type) {
                case '2':
                //console.log(2);
                $scope.header = '编辑';
                $scope.disable = false;
                $scope.tipshow = false;
                $scope.tboxShow = false;
                $scope.checkBoxShow = true;
                check() ;
                break
                case '3':
                //console.log(3);
                $scope.header = '新增';
                $scope.disable = false;
                $scope.tipshow = false;
                $scope.tboxShow = false;
                $scope.checkBoxShow = true;
                break
            } 
        }()

        function check() {
            var userId = parseInt($stateParams.id);
            //console.log(userId)            
            ajaxService.getOneAccount(userId)
                .then(function (res) {
                    console.log(res) 
                    let code,data;
                    code = res.data.code;
                    data = res.data.data;
                    if(code==200) {
                        $scope.accountInfo = data
                    }
                }
            )
        }
        // $scope.url = _path.postImg()
        $scope.show_msg = false;

                
        //上线逻辑
        $scope.sendData =function() {
            bootbox.confirm({
                size: "small",
                message: ("你确定保存吗?") ,
                callback:function(result) {
                    if(result) {
                        let params = {
                            // userName:"wangwu",
                            // id: userId==-1 ? null : userId,
                            name: $scope.accountInfo.name,
                            passWord: $scope.accountInfo.passWord,
                            roleName: $scope.accountInfo.roleName,
                        };
                        console.log(params)
                        if (userId !=-1 && type ==2) {
                            params.id=userId
                            console.log(params)
                            ajaxService.editAccount(params,userId).then(function (res){
                                if(res.data.code==200) {                
                                    bootbox.confirm({
                                        size: "small",
                                        message: ("编辑成功") ,
                                        callback:function() {                                            
                                            $state.go('backhome.account',{},{reload: true})                                
                                        }
                                    }) 
                                } else {
                                    alert("传说中的迷之错误")
                                };         
                            })
                        } else if(userId==-1 && type ==3){
                            // console.log(111111)
                            ajaxService.addAccount(params).then(function(res){
                                if(res.data.code==200) {
                                    console.log(res)                
                                    bootbox.confirm({
                                        size: "small",
                                        message: ("新增成功") ,
                                        callback:function() {                                            
                                            $state.go('backhome.account',{},{reload: true})                                
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
                        $state.go('backhome.account',{},{reload: true});
                    }
                }
            })                 
        }  

    })



