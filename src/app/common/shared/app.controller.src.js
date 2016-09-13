(function () {
    /* jshint validthis: true */
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('app', {
                    url: '',
                    views: {
                        'header': {
                            templateUrl: 'app/common/shared/header/header.html',
                            controller: 'HeaderController',
                            controllerAs: 'headerCtrl'
                        },
                        'content': {}
                    },
                    abstract: true
                });
        }])
        .controller('AppController', AppController);

    function AppController() {
    }

})();
