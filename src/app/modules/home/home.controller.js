(function () {
    /* jshint validthis: true */
    'use strict';

    angular
        .module('app.home', [])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('app.home', {
                    url: '/accueil',
                    views: {
                        'content@': {
                            templateUrl: 'app/modules/home/home.html',
                            controller: 'HomeController',
                            controllerAs: 'homeCtrl'
                        }
                    },
                    data: {
                        stateTitle: "Bienvenue",
                        animate: "slideTop"
                    }
                });
        }])
        .controller('HomeController', HomeController);

    function HomeController() {
        var homeCtrl = this;
    }

})();
