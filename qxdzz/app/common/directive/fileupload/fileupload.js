 // angular-file-upload插件法
 var ourApp = angular.module("ourApp");
 ourApp.directive("uploadFile", function(FileUploader) {
    return {
      restrict: "E",
      templateUrl: "app/common/directive/fileupload/fileupload.html",
      replace: "true",
      // 独立作用域,这里面的是双向绑定外面的数据的
      scope: {
        imgUrl: "=",
        url:"=",
        imgshow:"=",
        myimgUrl:"=",
        tipshow:"=",
        disable:"=",
        total:"@"
      },
      controller: function($scope) {
        $scope.uploader = new FileUploader({
          //实例化必须在caontroller中进行
          url: $scope.url,
          // formData:{xxx:1111},
          // headers:{xxx:1111},
          queueLimit: 1 //最大上传文件数量
        });      
      },

      link: function(scope) {
        console.log(scope.total)
        console.log(scope.url)//agax地址
        scope.imgtip = "请上传图片"
        scope.clearItem = function() {
          scope.uploader.clearQueue();
        };
        scope.removeImg = function(i) {
          scope.imgshow = false;
          scope.tipshow = true;
        };
        scope.uploader.onSuccessItem = function(item, response) {
          //上传成功返回地址,这时候需要把图片地址放到scope.myimgUrl中,传递到外面去
          scope.myimgUrl = response.data.url;
          console.log(response.data.url);
          //配图是否显示*          
        };
        scope.getUrl = function(files) {
          scope.fileList = files;
          if (files.length > scope.uploader.queueLimit) {
            scope.now = false;
            alert("最多同时上传1个文件"); 
            // scope.uploader.remove()          
          } else {
            // 清空队列              
            scope.uploader.clearQueue();      
            console.log(scope.uploader)     
            scope.now = true;
            scope.imgUrl = window.URL.createObjectURL(scope.fileList[0]);//考虑性能用后清除
          }
        };
        scope.click=function() {
          scope.myimgUrl = 111
          scope.imgshow = true
          scope.tipshow = false;
        }
        scope.uploader.onCancelItem = function(fileItem, response) {
          console.log(fileItem);
        };
      }
    };
  });
