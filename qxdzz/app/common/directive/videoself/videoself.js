angular.module('ourApp')
    .directive('myVideo',function($timeout) {
        return {
            restrict: "AE",
            scope: {
                videoUrl:"=",
                disable:"@"
            },
            transclude: true,
            templateUrl: 'app/common/directive/videoself/videoself.html' ,
            controller:function($scope) {  
                console.log($scope.disable) 
                //let videoSrc = "app/test/test.mp4"; 
                $scope.show_V = false;          
                let player = videojs('#my-player',
                {
                    autoplay:false,
                    controls:true,
                    loop : false,
                    muted : false,
                    // poster: "http://vjs.zencdn.net/v/oceans.png",//封面
                    preload:'auto'                      
                },
                function () {
                    let that = this;
                    that.volume(0.5);
                    that.on('pause',function() {
                        console.log("暂停中")
                    })
                    that.on('keydown',function(e) {
                        console.log("按下了键盘")
                        console.log(e.keyCode)
                        if(e.keyCode==39) {
                            if(that.currentTime() <=(that.duration()-3)) {
                                let time = that.currentTime() + 3;  
                                that.currentTime(time)                
                            } else {
                                let time = that.duration();
                                that.currentTime(time)
                            }
                        } else if(e.keyCode==37) {
                            if(that.currentTime() >=3) {
                                let time = that.currentTime() - 3;    
                                that.currentTime(time)               
                            } else {
                                let time = 0;
                                that.currentTime(time)
                            }
                        }
                    })
                });
                $scope.preview_Video = function() {
                    //console.log(player.src) 双向绑定src                     
                   var reg = new RegExp("(http\:\/\/|https\:\/\/){0,1}([a-zA-Z0-9\.\/])+(\.mp4)$")
                   if($scope.videoUrl==undefined) {
                       alert("请先输入视频地址")
                    } else {
                        if(reg.test($scope.videoUrl)) {                        
                            $timeout(function() {
                                player.src($scope.videoUrl);
                            },100 )              
                            $scope.video_show = true;
                            //console.log(player.duration())  
                        } else {
                            alert("视频地址格式错误")
                            $scope.video_show = false; 
                        }
                    }
                }
            }
        }
    })
