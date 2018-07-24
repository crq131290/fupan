var ourApp = angular.module("ourApp");
    ourApp.controller('userCCtrl',function userCtrl($http,$rootScope,$location,$scope,$state,$stateParams,navWel,ajaxService,_Cookie,_path){
        let E = window.wangEditor;
        let editor = new E("#explain");
        editor.create();
        console.log(editor);
        editor.$textElem.attr('contenteditable', false)
        function check() {
            var userId = parseInt($stateParams.id);
            //console.log(userId)            
            ajaxService.getArtcile(userId)
                .then(function (res) {
                    console.log(res)
                    let data = res.data.data
                    console.log(data)
                    $scope.nickName = data.nickName
                    $scope.id = data.id
                    $scope.phone = data.phone
                    $scope.grade = data.grade
                    $scope.prefecture = data.prefecture
                    $scope.bean = data.bean
                    $scope.headImg = data.headImg
                    $scope.headImg = "http://img.zcool.cn/community/01d881579dc3620000018c1b430c4b.JPG@3000w_1l_2o_100sh.jpg"
                }
            )
        }
        check()

        $scope.goBackUser=function(){
            $state.go('backhome.user', {},{reload:true})
        }
    })