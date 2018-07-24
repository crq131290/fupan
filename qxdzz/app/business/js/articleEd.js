var ourApp = angular.module("ourApp");
    ourApp.controller('articleEdCtrl',function articleEdCtrl($http,$rootScope,$location,$scope,$state,$stateParams,navWel,ajaxService,_Cookie,_path){
        //console.log("artEd加载完成")
        //console.log($stateParams)
        let userId = $stateParams.id;
        let type = $stateParams.type;

        //富文本编辑器配置
        let E = window.wangEditor
        let editor = new E("#explain");
         //onchange事件触发时间
        // editor.customConfig.onchangeTimeout = 1000; // 单位 ms
        //onchange事件         
        editor.customConfig.onchange = function (html) {
            console.log("富文本onchange")
            // 监控变化，同步更新到 textarea
            $text1.val(html)
            if(editor.txt.text()=='') {
                $scope.tboxShow = true;
            } else {
                $scope.tboxShow = false;
            }
            $scope.$apply() //必须加上       
        };
        //获焦事件onfocus //没触发//版本问题
        editor.customConfig.onfocus = function () {
            console.log("onfocus")
            // alert("onfocus")
        };
         //获焦事件onblur //版本问题
         editor.customConfig.onblur = function (html) {
            // html 即编辑器中的内容
            if(editor.txt.text()=='') {
                $scope.tboxShow = true;
            } else {
                $scope.tboxShow = false;
            }
            $scope.$apply() //必须加上   因为视图没更新
        }
        editor.customConfig.lang = {
            '设置标题': 'title',
            '正文': 'p',
            '链接文字': 'link text',
            '链接': 'link',
            '上传图片': 'upload image',
            '上传': 'upload',
            '创建': 'init'
            // 还可自定添加更多
        };
            // 关闭粘贴样式的过滤
        editor.customConfig.pasteFilterStyle = false;
            // 自定义处理粘贴的文本内容 //未生效
        editor.customConfig.pasteTextHandle = function (content) {
            // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
            console.log(content)
            return content + '<p>在粘贴内容后面追加一行</p>'
        };
        //菜单上插入图片按钮的回调
        editor.customConfig.linkImgCallback = function (url) {
            console.log(url) // url 即插入图片的地址
        };
        editor.customConfig.linkImgCheck = function (src) {
            console.log(src) // 图片的链接        
            return true // 返回 true 表示校验成功
            // return '验证失败' // 返回字符串，即校验失败的提示信息
        };
        editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片配置完就可以直接截图放进去了
        // 配置服务器端地址
        // editor.customConfig.uploadImgServer = '/upload'//服务器地址 //和Base64  2选一
        // 隐藏“网络图片”tab
        editor.customConfig.showLinkImg = false
        // 将图片大小限制为 3M
        editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024  
        // 限制一次最多上传 5 张图片
        editor.customConfig.uploadImgMaxLength = 5
        editor.customConfig.uploadImgParams = {
            // 如果版本 <=v3.1.0 ，属性值会自动进行 encode ，此处无需 encode
            // 如果版本 >=v3.1.1 ，属性值不会自动 encode ，如有需要自己手动 encode
            token: 'abcdef12345'
        }
        //如果还需要将参数拼接到 url 中，可再加上如下配置
        editor.customConfig.uploadImgParamsWithUrl = true
        //上传图片时，可自定义filename，即在使用formdata.append(name, file)添加图片文件时，自定义第一个参数。
        editor.customConfig.uploadFileName = 'yourFileName'
        //上传图片时刻自定义设置 header
        editor.customConfig.uploadImgHeaders = {
            'Accept': 'text/x-json'
        }
        // 将 timeout 时间改为 3s
        editor.customConfig.uploadImgTimeout = 3000
        //上传图片的错误提示默认使用alert弹出，你也可以自定义用户体验更好的提示方式
        editor.customConfig.customAlert = function (info) {
            // info 是需要提示的内容
            alert('自定义提示：' + info)
        }
        //如果想完全自己控制图片上传的过程，可以使用如下代码
        editor.customConfig.customUploadImg = function (files, insert) {
            // files 是 input 中选中的文件列表
            // insert 是获取图片 url 后，插入到编辑器的方法
        
            // 上传代码返回结果之后，将图片插入到编辑器中
            insert(imgUrl)
        }
        editor.customConfig.uploadImgHooks = {
            before: function (xhr, editor, files) {
            },
            success: function (xhr, editor, result) {
                // 图片上传并返回结果，图片插入成功之后触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                alert("图片上传成功！");
            },
            fail: function (xhr, editor, result) {
                // 图片上传并返回结果，但图片插入错误时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            },
            error: function (xhr, editor) {
                console.log("搞错啦")
                // 图片上传出错时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            },
            timeout: function (xhr, editor) {
                // 图片上传超时时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            }, 
            customInsert: function (insertImg, result, editor) {
                // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果        
                // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                var url = result.url
                insertImg(url)        
                // result 必须是一个 JSON 格式字符串！！！否则报错
            }
        }
        /**
         * 所有的配置需在编辑器创建之前完成
         */
        editor.create();
        console.log(editor)
        /**
         * 初始加载
         */
        $scope.load = function () {
            switch (type) {
                case '1':
                //console.log(1);        
                $scope.header = '查看';  
                $scope.disable = true;
                $scope.tipshow = false;
                $scope.tboxShow = false;
                $scope.checkBoxShow = false;
                editor.$textElem.attr('contenteditable', false)
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
                $scope.tipshow = false;
                $scope.tboxShow = false;
                $scope.checkBoxShow = true;
                break
            } 
        }()
        $scope.url = _path.postImg()
        $scope.show_msg = false;

        //加载数据
        function check() {
            var userId = parseInt($stateParams.id);
            //console.log(userId)            
            ajaxService.getArtcile(userId)
                .then(function (res) {
                    console.log(res)
                    var res = res.data.data
                    console.log(res)
                    $scope.title = res.title
                    $scope.digest = res.digest
                    $scope.author = res.author
                    $scope.collect = res.collect
                    $scope.praise = res.praise
                    // editor.txt.html($scope.article.content)//显示说明内容
                    $scope.coverPlanUrl = res.coverPlanUrl
                    $scope.coverPlanUrl = "http://img.zcool.cn/community/01d881579dc3620000018c1b430c4b.JPG@3000w_1l_2o_100sh.jpg"
                    $scope.imgUrl = $scope.coverPlanUrl
                    $scope.imgUrl  ? $scope.imgshow = true : $scope.imgshow = false;
                }
            )
        }

        
        //上线逻辑
        $scope.sendData =function() {
            bootbox.confirm({
                size: "small",
                message: ("你确定保存吗?") ,
                callback:function(result) {
                    if(result) {
                        let params = {
                            userName:"wangwu",
                            title: $scope.title,
                            classify: $scope.classify,
                            coverPlan: $scope.myimgUrl,
                            author: $scope.author,
                            digest: $scope.digest,
                            content: editor.txt.html()
                        };
                        if (userId !=-1 && type ==2) {
                            ajaxService.editArticle(params,userId).then(function (res){
                                if(res.data.code==200) {                
                                    bootbox.confirm({
                                        size: "small",
                                        message: ("编辑成功") ,
                                        callback:function() {                                            
                                            $state.go('backhome.article',{},{reload: true})                                
                                        }
                                    }) 
                                } else {
                                    alert("传说中的迷之错误")
                                };         
                            })
                        } else if(userId==-1 && type ==3){
                            // console.log(111111)
                            ajaxService.addArtcile(params).then(function(res){
                                if(res.data.code==200) {
                                    console.log(res)                
                                    bootbox.confirm({
                                        size: "small",
                                        message: ("新增成功") ,
                                        callback:function() {                                            
                                            $state.go('backhome.article',{},{reload: true})                                
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
                        $state.go('backhome.article',{},{reload: true});
                    }
                }
            })                 
        }    
    })