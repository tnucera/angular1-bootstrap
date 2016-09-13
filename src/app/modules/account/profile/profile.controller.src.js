(function () {
    /* jshint validthis: true */
    'use strict';

    angular
        .module('app.account')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('app.account.profile', {
                    url: '',
                    views: {
                        'content@': {
                            templateUrl: 'app/modules/account/profile/profile.html',
                            controller: 'AccountProfileController',
                            controllerAs: 'accountProfileCtrl'
                        }
                    },
                    data: {
                        stateTitle: "Profil",
                        animate: "slideLeft"
                    }
                });
        }])
        .controller('AccountProfileController', AccountProfileController);

    function AccountProfileController(accountService) {
        var accountProfileCtrl = this;

        accountProfileCtrl.accountService = accountService;
    }

})();
