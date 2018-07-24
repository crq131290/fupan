angular.module('ourApp')
    .filter('status', function () {
        return function (status) {
            switch (status) {
                case true:
                    return '上线';
                case false:
                    return '下线';
            };
        }
    })
    .filter('btnStatus', function () {
        return function (btnStatus) {
            switch (btnStatus) {
                case true:
                    return '下线';
                case false:
                    return '上线';
            };
        }
    })
    .filter('uStatus', function () {
        return function (userStatus) {
            switch (userStatus) {
                case true:
                    return '正常';
                case false:
                    return '冻结';
            };
        }
    })
    .filter('ubStatus', function () {
        return function (userStatus) {
            switch (userStatus) {
                case true:
                    return '冻结';
                case false:
                    return '正常';
            };
        }
    })