(function () {
    /* jshint validthis: true */
    'use strict';

    angular
        .module('app.account')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('app.account', {
                    url: '/mon-compte',
                    views: {
                        'content@': {
                            controller: 'AccountController',
                            controllerAs: 'accountCtrl'
                        }
                    },
                    abstract: true
                });
        }])
        .controller('AccountController', AccountController);

    function AccountController() {
        var accountCtrl = this;
    }

})();
