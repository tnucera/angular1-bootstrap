(function () {
    /* jshint validthis: true */
    'use strict';

    angular
        .module('app.account')
        .factory('accountService', accountService);

    function accountService(Restangular, localStorage) {
        ///////////////////////////////////
        // Variables
        ///////////////////////////////////

        var user = null;
        var localStorageKey = 'account';

        ///////////////////////////////////
        // Public methods
        ///////////////////////////////////

        return {
            getUser: getUser,
            initData: initData,
            clearData: clearData
        };

        function getUser() {
            return user;
        }

        function initData() {
            if (!initDataFromLocalStorage()) {
                Restangular.one('/v1/users/tuggareutangranser').get().then(function (response) {
                    user = Restangular.stripRestangular(response.data);
                    localStorage.set(localStorageKey, {
                        user: user
                    });
                });
            }
        }

        function clearData() {
            user = null;
            removeDataInLocalStorage();
        }

        ///////////////////////////////////
        // Private methods
        ///////////////////////////////////

        function initDataFromLocalStorage() {
            var localStorageData = localStorage.get(localStorageKey);
            if (localStorageData) {
                user = localStorageData.user;

                return true;
            }

            return false;
        }

        function removeDataInLocalStorage() {
            localStorage.remove(localStorageKey);
        }
    }

})();
