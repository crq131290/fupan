/**
 * Created by likui on 2016/6/26.
 */

angular.module('ourApp')
    .directive('pagination', function ($state, commonUtil) {
        return {
            restrict: 'EA',
            templateUrl: 'app/common/directive/pagination/pagination.html',
            replace: true,
            scope: {
                total: '@',
                size: '@',
                pageName: '@',
                info: '=',
                reload: '@',
                changePage: '&',
                page: '=?'
            },
            link: function (scope, element, attrs) {
                //当前页
                var activePage;
                if (!scope.reload) {
                    if (scope.pageName == "dpage") { //技能文档
                        activePage = parseInt($state.params.dpage);
                    } else if (scope.pageName == "vpage") { //技能视频
                        activePage = parseInt($state.params.vpage);
                    }
                    else if (scope.pageName == "cpage") { //日报评论
                        activePage = parseInt($state.params.cpage);
                    }
                    else {  //其他
                        activePage = parseInt($state.params.pageNum);
                    }

                    if (isNaN(activePage) == true) {
                        activePage = 1;
                    } else {
                        activePage = parseInt(activePage);
                    }
                    //page
                    scope.pageName = scope.pageName || "page";
                    //size
                    scope.size = scope.size || $state.params.size ? scope.size || parseInt($state.params.size) : 10;

                    //总页数
                    var totalPage = Math.ceil(parseInt(scope.total) / scope.size);
                    scope.activePage = activePage;
                    scope.totalPage = totalPage;
                    scope.isHaveNextPage = isHaveNextPage;
                    scope.isHavePrePage = isHavePrePage;
                    scope.pageList = getPageList();
                    scope.isDisabled = isDisabled;
                    scope.isActive = isActive;
                    //是否有下一页
                    function isHaveNextPage() {
                        if (activePage === totalPage) {
                            return false;
                        }
                        return true;
                    }
                    //是否有上一页
                    function isHavePrePage() {
                        if (activePage !== 1) {
                            return true;
                        }
                        return false;
                    }
                    //获得pageList
                    function getPageList() {
                        var pageList = [];
                        var notNum = false;
                        //...在两边
                        if (isHavePreDot() && isHaveNextDot()) {
                            for (var i = 0; i < 5; i++) {
                                pageList.push(activePage + i);
                            }
                            pageList.unshift("...");
                            pageList.push("...");
                        }

                        //...在前面
                        if (isHavePreDot() && !isHaveNextDot()) {
                            for (var i = totalPage - 4; i <= totalPage; i++) {
                                pageList.push(i);
                            }
                            pageList.unshift("...");
                            notNum = true;
                        }
                        //...在后面
                        if (!isHavePreDot() && isHaveNextDot()) {

                            if (totalPage > 5) {
                                for (var i = 0; i < 5; i++) {
                                    pageList.push(activePage + i);
                                }
                            } else {
                                for (var i = 1; i < totalPage; i++) {
                                    pageList.push(i);
                                }
                            }
                            pageList.push("...");
                        }
                        //没有...
                        if (!isHavePreDot() && !isHaveNextDot()) {
                            for (var i = 1; i <= totalPage; i++) {
                                pageList.push(i);
                            }
                        }
                        return pageList;
                    }
                    //是否有前面的 ...
                    function isHavePreDot() {
                        if (activePage - 1 > 4) {
                            return true;
                        }
                        return false;
                    }

                    //是否有后面的 ...
                    function isHaveNextDot() {
                        if (activePage < totalPage - 4) {
                            return true;
                        }
                        return false;
                    }

                    // Number(page) === activePage ||
                    function isDisabled(page) {
                        if (page === '...' || Number(page) > totalPage) {
                            return true;
                        }
                        return false;
                    }

                    function isActive(page) {
                        if (page === activePage) {
                            return true;
                        }
                        return false;
                    }


                    scope.changeInput = function () {
                        scope.jumpPage = +scope.jumpPage.replace(/[^0-9]/g, '');
                        if (scope.jumpPage > totalPage) {
                            scope.jumpPage = totalPage;
                        }
                    };

                    scope.changeSize = function () {
                        scope.size = scope.size.replace(/[^0-9]/g, '');
                        if (parseInt(scope.size) === 0) {
                            scope.size = 10;
                        }
                    };
                    // 回车跳转页面
                    scope.enterGoPage = function (e) {
                        var keycode = window.event ? e.keyCode : e.which;
                        if (keycode == 13) {
                            scope.goPage(+scope.jumpPage);
                        }
                    };
                    //跳页
                    scope.goPage = function (page) {
                        if (isDisabled(page)) return;
                        if (page == undefined || page == 0) {
                            return
                        }
                        scope.activePage = activePage = page;
                        console.log(activePage)
                        $state.go($state.current, {pageNum: page || 1, size: scope.size}, {reload: true});
                        // commonUtil.valueStorage().set('page', page);
                        // scope.changePage();
                        // if (scope.pageName == "dpage") { //技能文档
                        //     $state.go($state.current, {pageNum: page || 1, size: scope.size}, {reload: true});
                        // } else if (scope.pageName == "vpage") { //技能视频
                        //     $state.go($state.current, {vpage: page || 1, size: scope.size}, {reload: true});
                        // } else if (scope.pageName == "cpage") { //日报评论
                        //     //不刷新评论翻页
                        //     scope.info.getComment(page);
                        //     scope.info.toComment();
                        //     // 其他使用指令的时候，会刷新页面，而这儿需要不刷新执行翻页，需要手动刷新部分数据
                        //     var totalPage = Math.ceil(parseInt(scope.total) / scope.size);
                        //     scope.activePage = activePage = page;
                        //     scope.totalPage = totalPage;
                        //     scope.pageList = getPageList();
                        // } else if ($state.current.name === "skill.school.myCard") {  //卡券列表分页只刷新卡券部分，不刷新整個界面
                        //     $state.go($state.current, {page: page || 1, size: scope.size}, {notify: false});
                        //     commonUtil.valueStorage().set('page', page);
                        //     scope.changePage();
                        // } else {  //其他
                        //     $state.go($state.current, {page: page || 1, size: scope.size}, {reload: true});
                        // }
                    };
                } else {
                    activePage = parseInt($state.params.pageNum);
                    if (isNaN(activePage) == true) {
                        activePage = 1;
                    } else {
                        activePage = parseInt(activePage);
                    }
                    //page
                    scope.pageName = scope.pageName || "page";
                    //size
                    scope.size = scope.size || $state.params.size ? scope.size || parseInt($state.params.size) : 10;


                    //总页数
                    var totalPage = Math.ceil(parseInt(scope.total) / scope.size);
                    scope.totalPage = totalPage;
                    scope.activePage = activePage;
                    scope.isHaveNextPage = isHaveNextPage;
                    scope.isHavePrePage = isHavePrePage;
                    scope.pageList = getPageList();
                    scope.isDisabled = isDisabled;
                    scope.isActive = isActive;
                    scope.jumpPage = 1;//默认

                    //是否有下一页
                    function isHaveNextPage() {
                        if (activePage === totalPage) {
                            return false;
                        }
                        return true;
                    }

                    //是否有上一页
                    function isHavePrePage() {
                        if (activePage !== 1) {
                            return true;
                        }
                        return false;
                    }

                    //获得pageList
                    function getPageList() {
                        var pageList = [];
                        var notNum = false;
                        //...在两边
                        if (isHavePreDot() && isHaveNextDot()) {
                            for (var i = 0; i < 5; i++) {
                                pageList.push(activePage + i);
                            }
                            pageList.unshift("...");
                            pageList.push("...");
                        }

                        //...在前面
                        if (isHavePreDot() && !isHaveNextDot()) {
                            for (var i = totalPage - 4; i <= totalPage; i++) {
                                pageList.push(i);
                            }
                            pageList.unshift("...");
                            notNum = true;
                        }
                        //...在后面
                        if (!isHavePreDot() && isHaveNextDot()) {
                            if (totalPage > 5) {
                                for (var i = 0; i < 5; i++) {
                                    pageList.push(activePage + i);
                                }
                            } else {
                                for (var i = 1; i < totalPage; i++) {
                                    pageList.push(i);
                                }
                            }
                            pageList.push("...");
                        }
                        //没有...
                        if (!isHavePreDot() && !isHaveNextDot()) {
                            for (var i = 1; i <= totalPage; i++) {
                                pageList.push(i);
                            }
                        }
                        return pageList;
                    }

                    //是否有前面的 ...
                    function isHavePreDot() {
                        //优化页数少...
                        if (activePage - 1 > 2 && totalPage < 10) {
                            return true;
                        }
                        if (activePage - 1 > 4) {
                            return true;
                        }
                        return false;
                    }

                    //是否有后面的 ...
                    function isHaveNextDot() {
                        if (activePage < totalPage - 4) {
                            return true;
                        }
                        return false;
                    }

                    // Number(page) === activePage ||
                    function isDisabled(page) {
                        if (page === '...' || Number(page) > totalPage) {
                            return true;
                        }
                        return false;
                    }

                    function isActive(page) {
                        if (page === activePage) {
                            return true;
                        }
                        return false;
                    }


                    scope.changeInput = function () {
                        scope.jumpPage = scope.jumpPage.replace(/[^0-9]/g, '');
                        if (scope.jumpPage > totalPage) {
                            scope.jumpPage = totalPage;
                        }
                    };

                    scope.changeSize = function () {
                        scope.size = scope.size.replace(/[^0-9]/g, '');
                        if (parseInt(scope.size) === 0) {
                            scope.size = 10;
                        }
                    };
                    // 回车跳转页面
                    scope.enterGoPage = function (e) {
                        var keycode = window.event ? e.keyCode : e.which;
                        if (keycode == 13) {
                            scope.goPage(scope.jumpPage);
                        }
                    };
                    //跳页
                    scope.goPage = function (page) {
                        if (page == 0) {
                            page = 1;
                        }
                        scope.activePage = scope.jumpPage = activePage = page * 1;
                        console.log(activePage);
                        scope.pageList = getPageList();
                        commonUtil.valueStorage().set('page', page);
                        scope.changePage();
                    };
                }
                


            }

        }


    });