(function () {
    /* jshint validthis: true */
    'use strict';

    angular
        .module('app')
        .factory('_', _);

    function _($window) {
        return $window._;
    }

})();
