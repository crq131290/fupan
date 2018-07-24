var ourApp = angular.module("ourApp");
    ourApp.controller('videoCtrl',function videoCtrl($http,$rootScope,$location,$scope,$state,$stateParams,navWel,ajaxService,_Cookie,_path){
        let vm = this
        console.log(this)
        $scope.params = $state.params;

        //将字符串转成字符数据
        let praise = $state.params.praise? $state.params.praise.split(",") :null
        let collect = $state.params.collect? $state.params.collect.split(",") :null
        $scope.params.praise = praise;
        $scope.params.collect = collect;

        //判断size&Num是否为null
        $scope.params.pageSize ? $scope.params.pageSize: $scope.params.pageSize = 10;
        $scope.params.pageNum ? $scope.params.pageNum: $scope.params.pageNum = 1;
        let params = $scope.params
        console.log(params)
        ajaxService.getVideoList(params).then(function(res) {
            console.log(res.data.data.videoDtoList)
            $scope.videoLists = res.data.data
            $scope.total  = 50;
        })

        //视频分类
        $scope.videoClass = JSON.parse(sessionStorage.getItem('videoClass'))
        // $scope.params.classify = $scope.videoClass[0].name
        $scope.params.classify ?  
        $scope.params.classify = $scope.params.classify :
        $scope.params.classify = $scope.videoClass[0].name 
        //年纪分类
        $scope.gradeClass = JSON.parse(sessionStorage.getItem('gradeClass'))
        // $scope.params.grade = $scope.gradeClass[0].name
        $scope.params.grade ?  
        $scope.params.grade = $scope.params.classify :
        $scope.params.grade = $scope.gradeClass[0].name 
        //科目分类
        $scope.subjectClass = JSON.parse(sessionStorage.getItem('subjectClass'))
        // $scope.params.subject = $scope.subjectClass[0].name
        $scope.params.subject ?  
        $scope.params.subject = $scope.params.classify :
        $scope.params.subject = $scope.subjectClass[0].name 

        

        //编辑//新增//查看
        $scope.compile = function (type,id) {
            console.log(type)
            console.log(id)
            $state.go('backhome.videoEd', {
                type:type,
                id: id
            })
        }
        //搜索模块
        $scope.search = function(title,classify,grade,subject,praise,collect,author,status,pageSize,pageNum) {
            //转成数组
            let praiseA1,praiseA2,collectA1,collectA2;
            praise?praiseA1=praise[0]:praiseA1=null
            praise?praiseA2=praise[1]:praiseA2=null
            collect?collectA1=collect[0]:collectA1=null
            collect?collectA2=collect[1]:collectA2=null


            $state.go("backhome.video",
                {
                    title:title,
                    classify:classify,
                    grade:grade,
                    subject:subject,
                    praise: [praiseA1,praiseA2],//这个地方换成数组
                    collect: [collectA1,collectA2],
                    author:author,
                    status:status,
                    pageSize:pageSize,
                    pageNum:pageNum
                },
                {
                    reload:true
                }
            )
        }
        $scope.changeState = function(id) {
            let that = this
            let status = that.item.status;
            // console.log(status)
            bootbox.confirm({
                size: "small",
                message: (status==true) ? ("确定要下线此项？") : ("确定要上线此项？"),
                callback:function(result) {
                    if(result) {
                        let params = {
                            id : id,
                            status: status
                        }
                        //视频上下架请求服务
                        ajaxService.articleStatus(params,id).then(function(res){
                            //console.log(res)
                            $state.go('backhome.video', {},{reload:true})
                        })
                    }
                }
            })          
        };
        //删除
        // $scope.delete = function (id){
        //     let that = this
        //     bootbox.confirm({
        //         size: "small",
        //         message: "确定要删除此项？",
        //         callback:function(result) {
        //             if(result) {
        //                 let params = {
        //                     id : id
        //                 }
        //                 ajaxService.deleteArticle(params,id).then(function(res){
        //                     //console.log(res)
        //                     $scope.getList()
        //                 })
        //             }
        //         }
        //     }) 
        // }      
    })