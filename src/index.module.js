(function () {
    /* jshint validthis: true */
    'use strict';

    angular
        .module('app', [
            'ui.router',                // ui.router en premier
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

})();
