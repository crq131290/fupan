angular.module('ourApp')
    .factory('commonUtil',function($http,_path){
        var selfValue = {};
        return {
            valueStorage: function () {
                function set(key, value) {
                    return selfValue[key] = value;
                }
                function get(key) {
                    return selfValue[key];
                }
                return {
                    set: set,
                    get: get
                }
            }
        }   
    }
)