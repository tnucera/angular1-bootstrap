(function () {
    /* jshint validthis: true */
    'use strict';

    function SelectController(selectService) {
        var selectCtrl = this;
        selectCtrl.service = selectService;
    }

    angular
        .module('app.select', [])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('app.select', {
                    url: '/select',
                    views: {
                        'content@': {
                            templateUrl: 'app/modules/select/select.html',
                            controller: 'SelectController',
                            controllerAs: 'selectCtrl'
                        }
                    },
                    data: {
                        stateTitle: "Select",
                        animate: "slideTop"
                    }
                });
        }])
        .controller('SelectController', SelectController);

})();
