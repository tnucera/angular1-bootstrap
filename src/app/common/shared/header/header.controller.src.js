(function () {
    /* jshint validthis: true */
    'use strict';

    angular
        .module('app')
        .controller('HeaderController', HeaderController);

    function HeaderController(accountService) {
        var headerCtrl = this;
        headerCtrl.accountService = accountService;
    }

})();
