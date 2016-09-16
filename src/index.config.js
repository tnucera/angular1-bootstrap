(function () {
    /* jshint validthis: true */
    'use strict';

    angular
        .module('app')
        .config(config);

    function config($urlRouterProvider, RestangularProvider, toastrConfig, blockUIConfig, ngDialogProvider, uiSelectConfig) {
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
    }

})();
