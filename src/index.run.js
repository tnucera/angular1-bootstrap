(function () {
    /* jshint validthis: true */
    'use strict';

    angular
        .module('app')
        .run(run);

    function run($rootScope, $state, accountService) {
        $rootScope.$on('$stateChangeSuccess', function () {
            // scroll to top in the new page
            window.scrollTo(0, 0);
            // define new page title
            $rootScope.stateTitle = $state.current.data.stateTitle;
        });

        accountService.initData();
    }

})();
