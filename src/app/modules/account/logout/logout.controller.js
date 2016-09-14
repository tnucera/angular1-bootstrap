(function () {
    /* jshint validthis: true */
    'use strict';

    angular
        .module('app.account')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('app.account.logout', {
                    url: '/se-deconnecter',
                    views: {
                        'content@': {
                            controller: 'AccountLogoutController',
                            controllerAs: 'accountLogoutCtrl'
                        }
                    },
                    data: {
                        stateTitle: "Se déconnecter",
                        animate: "slideLeft"
                    }
                });
        }])
        .controller('AccountLogoutController', AccountLogoutController);

    function AccountLogoutController(accountService, toastr, $state) {
        var accountLogoutCtrl = this;

        accountService.clearData();
        toastr.info("Vous avez été déconnecté.");
        $state.go('app.home', {}, {reload: true});
    }

})();
