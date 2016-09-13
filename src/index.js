(function () {
    /* jshint validthis: true */
    'use strict';

    /*
     * Charte stylistique Angular 1.x
     ** https://github.com/johnpapa/angular-styleguide/blob/master/a1/i18n/fr-FR.md
     *
     */

    // Declare app level module which depends on filters, and services
    angular
        .module('app', [
            'ui.router',                // ordre des modules primodial : si state utilisé dan un module, il doit être indiqué avant ces modules
            'ngResource',               //
            'ngSanitize',
            'ngAnimate',                // ui.bootstrap dependency
            'ngTouch',                  // ui.bootstrap dependency
            'angular-loading-bar',      // angular-loading-bar
            'restangular',              // REST Services
            'ngDialog',                 // gestion POP IN / modal
            'toastr',                   // https://github.com/Foxandxss/angular-toastr
            'angular.vertilize',        // set element to same size
            'blockUI',                  // block user interaction on AJAX requests
            'ui.bootstrap',             // bootstrap
            'ui.select',
            'sticky',                   // directive to make elements stick when scrolling down
            'xeditable',                // Edit-in-place
            'angularFileUpload',        // file upload
            'angularMoment',            // moment
            'ngMessages',
            'angular.filter',           //
            'app.account',
            'app.home',
            'app.select'
        ]);

    angular
        .module('app')
        .config(function ($urlRouterProvider, RestangularProvider, toastrConfig, blockUIConfig, ngDialogProvider, uiSelectConfig) {
            // Ici nous ne chargerons pas toutes les routes seulement le default
            $urlRouterProvider.otherwise('/accueil');

            /* Restangular Configuration */
            RestangularProvider.setBaseUrl('https://api.spotify.com');
            RestangularProvider.setFullResponse(true);

            /* Toastr Configuration */
            angular.merge(toastrConfig, {
                allowHtml: true,
                autoDismiss: false,
                closeButton: true,
                closeHtml: '<button>&times;</button>',
                containerId: 'toast-container',
                showDuration: 300,
                hideDuration: 1000,
                extendedTimeOut: 3000,
                iconClasses: {
                    error: 'toast-error',
                    info: 'toast-info',
                    success: 'toast-success',
                    warning: 'toast-warning'
                },
                maxOpened: 0,
                messageClass: 'toast-message',
                newestOnTop: true,
                onHidden: null,
                onShown: null,
                positionClass: 'toast-top-right',
                preventDuplicates: false,
                preventOpenDuplicates: false,
                progressBar: false,
                target: '#app-messages',
                timeOut: 5000,
                titleClass: 'toast-title',
                toastClass: 'toast',
                showEasing: 'swing',
                hideEasing: 'linear',
                showMethod: 'show',
                hideMethod: 'fadeOut'
            });

            /* BlockUI Configuration */
            blockUIConfig.message = "Chargement...";

            /* ngDialog (modal / POP IN) Configuration */
            ngDialogProvider.setDefaults({
                className: 'ngdialog-theme-flat',
                showClose: true,
                closeByDocument: true,
                closeByEscape: true
            });

            /* UI select configuration */
            uiSelectConfig.theme = 'bootstrap';
            uiSelectConfig.closeOnSelect = 'true';
        })
        .run(function ($rootScope, $state, accountService) {
            $rootScope.$on('$stateChangeSuccess', function () {
                // scroll to top in the new page
                window.scrollTo(0, 0);
                // define new page title
                $rootScope.stateTitle = $state.current.data.stateTitle;
            });

            accountService.initData();
        });

})();
