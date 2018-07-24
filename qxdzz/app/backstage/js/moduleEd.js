var ourApp = angular.module("ourApp");
    ourApp.controller('moduleEdCtrl',function articleEdCtrl($http,$rootScope,$location,$scope,$state,$stateParams,navWel,ajaxService,_Cookie,_path){
        console.log('moduleEdCtrl已上线')
         //console.log("artEd加载完成")
        //console.log($stateParams)
        let moduleId = $stateParams.id;
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
            var moduleId = parseInt($stateParams.id);
            //console.log(moduleId)            
            ajaxService.getOneModule(moduleId)
                .then(function (res) {
                    console.log(res) 
                    let code,data;
                    code = res.data.code;
                    data = res.data.data;
                    if(code==200) {
                        $scope.moduleInfo = data
                    }
                }
            )
        }
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
                            // id: moduleId==-1 ? null : moduleId,
                            name: $scope.moduleInfo.name,
                            parentId: $scope.moduleInfo.parentId,
                            moduleUrl: $scope.moduleInfo.moduleUrl,
                        };
                        console.log(params)
                        if (moduleId !=-1 && type ==2) {
                            console.log(params)
                            ajaxService.editModule(params).then(function (res){
                                if(res.data.code==200) {                
                                    bootbox.alert({
                                        size: "small",
                                        message: ("编辑成功") ,
                                        callback: function() {                                            
                                            $state.go('backhome.module',{},{reload: true})                                
                                        }
                                    }) 
                                } else {
                                    alert("你吓到我了")
                                };         
                            })
                        } else if(moduleId==-1 && type ==3){
                            // console.log(111111)
                            ajaxService.addModule(params).then(function(res){
                                if(res.data.code==200) {
                                    console.log(res)                
                                    bootbox.alert({
                                        size: "small",
                                        message: ("新增模块成功"),
                                        callback: function() {                                            
                                            $state.go('backhome.module',{},{reload: true})                                
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
                callback: function(result) {
                    if(result) {
                        $state.go('backhome.module',{},{reload: true});
                    }
                }
            })                 
        }      
    })