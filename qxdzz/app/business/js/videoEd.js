var ourApp = angular.module("ourApp");
    ourApp.controller('videoEdCtrl',function videoEdCtrl($http,$rootScope,$location,$scope,$state,$stateParams,navWel,ajaxService,_Cookie,_path){
        console.log("videoEdCtrl加载完成")
        console.log($stateParams)
        let userId = $stateParams.id;
        let type = $stateParams.type;
        $scope.cardSub = true; 
        $scope.load = function () {
            switch (type) {
                case '1':
                //console.log(1);        
                $scope.header = '查看';  
                $scope.disable = true;
                $scope.tipshow = false;
                $scope.tboxShow = false;
                $scope.checkBoxShow = false;
                check()
                break
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
                $scope.tipshow = true;
                $scope.tboxShow = true;
                $scope.checkBoxShow = true;
                break
            } 
            console.log($scope.header)
        }()
        $scope.url = _path.postImg()
        $scope.show_msg = false;
        //富文本配置
        editor = new wangEditor("#explain");
        editor.create();
        //加载数据
        function check() {
            var userId = parseInt($stateParams.id);
            //console.log(userId);
            ajaxService.getOneVideo(14)
                .then(function (res) {
                    var res = res.data.data;
                    console.log(res);
                    $scope.grade = res.grade;
                    $scope.subject = res.subject;
                    $scope.author = res.author;
                    // $scope.authorImgUrl = res.authorImgUrl;
                    $scope.authorImgUrl = "http://img.zcool.cn/community/01d881579dc3620000018c1b430c4b.JPG@3000w_1l_2o_100sh.jpg"
                    $scope.title = res.title;
                    $scope.classify = res.classify;
                    $scope.digest = res.digest;
                    $scope.videoUrl = res.videoUrl;
                    editor.txt.html(res.content);//显示说明内容
                    $scope.videoUrl = "http://img.zcool.cn/community/01d881579dc3620000018c1b430c4b.JPG@3000w_1l_2o_100sh.jpg"
                    $scope.videoUrl = "app/test/test.mp4"
                    // $scope.imgUrl = $scope.coverPlanUrl;
                    // $scope.imgUrl  ? $scope.imgshow = true : $scope.imgshow = false;
                }
            )
        }        
        //视频分类logic  
        $scope.changeClass = function () {
            if($scope.classify =='1') {
                $scope.banerSub = false;
                $scope.cardSub = true 
            } else if($scope.classify =='2') {
                $scope.tipshow = true ;
                $scope.banerSub = true ;
                $scope.cardSub = false ;
            }
        }         
        //上线逻辑
        $scope.sendData =function() {
            bootbox.confirm({
                size: "small",
                message: ("你确定保存吗?") ,
                callback:function(result) {
                    if(result) {
                        let params = {
                            // userName:"wangwu",
                            grade: $scope.grade,
                            subject: $scope.subject,
                            author: $scope.author,
                            authorImgUrl: $scope.authorImgUrl,
                            title: $scope.title,
                            classify: $scope.classify,
                            coverPlanUrl: $scope.coverPlanUrl,
                            classify: $scope.classify,
                            digest: $scope.digest,
                            videoUrl: $scope.videoUrl,
                            content: editor.txt.html()                           
                        };
                        if (userId !=-1 && type ==2) {
                            ajaxService.editOneVideo(params,userId).then(function (res){
                                if(res.data.code==200) {   
                                    console.log(res)             
                                    bootbox.confirm({
                                        size: "small",
                                        message: ("编辑成功") ,
                                        callback: function() {                                            
                                            $state.go('backhome.video',{},{reload: true})                                
                                        }
                                    }) 
                                } else {
                                    alert("传说中的迷之错误")
                                };         
                            })
                        } else if(userId==-1 && type ==3){
                            // console.log(111111)
                            ajaxService.addOneVideo(params).then(function(res){
                                if(res.data.code==200) {
                                    console.log(res)                
                                    bootbox.confirm({
                                        size: "small",
                                        message: ("新增成功") ,
                                        callback:function() {                                            
                                            $state.go('backhome.video',{},{reload: true})                                
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
                        $state.go('backhome.video',{},{reload: true});
                    }
                }
            })                 
        }
        //添加老师昵称
        $scope.modal_Click = function(boolean) {
            // console.log($scope.myid)
            // boolean==true?console.log("点击了确定"):console.log("点击了取消")
            var params = {
                "userName":"wangwu",
                authorName : $scope.authorName,
                headImg: $scope.myimgUrl//上传图片的url
            }
            if(boolean) {
                ajaxService.addAuthor(params).then(function(res) {
                    console.log(res)
                    if(res.data.code==200) {
                        console.log(res);
                        $state.go('backhome.videoEd',
                        {
                            type:type,
                            id: userId
                        },
                        {
                            reload:true
                        })
                    };
                                     
                })
            }
        }
        //删除老师昵称
        $scope.delete = function (authorName){
            console.log(authorName)
            let that = this
            bootbox.confirm({
                size: "small",
                message: "确定要删除此项？",
                callback:function(result) {
                    if(result) {
                        var params = {
                            "userName":"wangwu",
                            authorName : ""
                        }
                        ajaxService.deleteAuthor(params).then(function(res){
                            if(res.data.code==200) {
                                console.log(res);
                                $state.go('backhome.videoEd',
                                {
                                    type:type,
                                    id: userId
                                },
                                {
                                    reload:true
                                })
                            }
                        })                        
                    }
                }
            }) 
        }
        //富文本验证
        window.onclick = function() {            
            if(editor.txt.text()=='') {
                $scope.tboxShow = true;
            } else {
                $scope.tboxShow = false;
            }
            $scope.$apply()
        }        
        
    })