var ourApp = angular.module("ourApp");
    ourApp.controller('articleCtrl',function articleCtrl($http,$rootScope,$location,$scope,$state,$stateParams,navWel,ajaxService,_Cookie,_path){
        let vm = this
        console.log(vm)
        console.log($state.params)
        $scope.params = $state.params;
        //将字符串转成字符数据
        let praiseA = $state.params.praise? $state.params.praise.split(",") :null
        let collectA = $state.params.collect? $state.params.collect.split(",") :null
        $scope.params.praise = praiseA;
        $scope.params.collect = collectA;
        console.log($scope.params)//获取路由参数
        //获取文章分类

        var getACSuccess = function successCallback(res) {
            var  code = res.data.code;
            console.log(res)
            if(code==200) {
                var data = res.data
                $scope.articleList = data.data;
                $scope.articleCount = data.articleCount; 
                $scope.count = data.articleCount;
                $scope.all = Math.ceil(60/ 10);
                $scope.listSize = 10
                $scope.total = 123
            };  
        };
        // console.log($state.params)
        console.log($state)
        let getACErr = function successCallback(res) {
            let code = res.data.code;
            console.log(res)
        };
        //判断size&Num是否为null
        $scope.params.pageSize ? $scope.params.pageSize: $scope.params.pageSize = 10;
        $scope.params.pageNum ? $scope.params.pageNum: $scope.params.pageNum = 1;
        //数据请求
        let params = $scope.params
        ajaxService.getArtcileList(params).then(getACSuccess,getACErr);   
        
        //文章分类
        $scope.articleClass = JSON.parse(sessionStorage.getItem('articleClass'))
        // $scope.params.classify = $scope.articleClass[0].name
        $scope.params.classify ?  
        $scope.params.classify = $scope.params.classify :
        $scope.params.classify = $scope.articleClass[0].name 
        //搜索模块    
        $scope.search = function(title,author,status,classify,praise,collect,pageSize,pageNum) {
            // console.log(praise)
            let praiseA1,praiseA2,collectA1,collectA2;
            praise?praiseA1=praise[0]:praiseA1=null;
            praise?praiseA2=praise[1]:praiseA2=null;
            collect?collectA1=collect[0]:collectA1=null;
            collect?collectA2=collect[1]:collectA2=null;

            $state.go("backhome.articles",
                {
                    title: title,
                    author: author,
                    status: status,
                    classify: classify,
                    praise: [praiseA1,praiseA2],//这个地方换成数组
                    collect: [collectA1,collectA2],
                    pageSize: pageSize,
                    pageNum: pageNum
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
            $state.go('backhome.articleEd', {
                type:type,
                id: id
            })
        }

        //上下架
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
                        ajaxService.articleStatus(params,id).then(function(res){
                            //console.log(res)
                            // $scope.getList()
                            $state.go('backhome.article', {},{reload:true})
                        })
                    }
                }
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
                        ajaxService.deleteArticle(params,id).then(function(res){
                            //console.log(res)
                            // $scope.getList()
                        })
                    }
                }
            }) 
        }
 
        

        // //分页逻辑   
        // $scope.getList = function(pageSize) {
        //     $state.go("backhome.article",
        //     {
        //         pageNum: pageSize,
        //     },
        //     {
        //         reload:true
        //     }
        // )
        // };
        // $scope.curr = $state.params.pageNum;
        // $scope.count = 5;
        // function changeRange() {
        //     function getRange(curr, all, count) {
        //         var arr = [];
        //         //计算显示的页数
        //         curr = parseInt(curr);
        //         all = parseInt(all);
        //         count = parseInt(count);
        //         var from = curr - parseInt(count / 2);
        //         var to = curr + parseInt(count / 2) + (count % 2) - 1;
        //         //显示的页数容处理
        //         if (from <= 0) {
        //             from = 1;
        //             to = from + count - 1;
        //             if (to > all) {
        //                 to = all;
        //             };
        //         };
        //         if (to > all) {
        //             to = all;
        //             from = to - count + 1;
        //             if (from <= 0) {
        //                 from = 1;
        //             };
        //         };
        //         for (var i = from; i <= to; i++) {
        //             arr.push(i);
        //         };
        //         $scope.range = arr;
        //     };
        //     getRange($scope.curr, $scope.all, $scope.count);
        // };

        // //直接点击页数功能
        // $scope.clickPage = function () {
        //     $scope.curr = this.item;
        //     changeRange();
        //     $scope.getList($scope.curr);
        // };

        // // 分页按钮功能
        // $scope.changePage = function (type) {
        //     switch (type) {
        //         case '-1': //上一页
        //             if ($scope.curr > 1) {
        //                 --$scope.curr;
        //                 $scope.getList($scope.curr);
        //             };
        //             break;
        //         case '+1': //下一页
        //             if ($scope.curr < ($scope.all)) {
        //                 ++$scope.curr;
        //                 $scope.getList($scope.curr);
        //             };
        //             break;
        //         case 'first':
        //             $scope.curr = 1;
        //             changeRange();
        //             $scope.getList($scope.curr);
        //             break;
        //         case 'end':
        //             $scope.curr = $scope.all;
        //             changeRange();
        //             $scope.getList($scope.curr);
        //             break;
        //     };
        // };
        // //跳转页数功能
        // $scope.jump = function () {
        //     if ($scope.jumpPage <= $scope.all && $scope.jumpPage >= 1) {
        //         $scope.curr = $scope.jumpPage;
        //     };
        //     changeRange();
        //     $scope.getList($scope.curr);
        // };
        // //分页结束       
})