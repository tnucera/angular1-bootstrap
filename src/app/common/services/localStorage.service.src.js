(function () {
    /* jshint validthis: true */
    'use strict';

    angular
        .module('app')
        .factory('localStorage', localStorage);

    function localStorage($window) {
        ////// variables


        ////// public methods

        return {
            set: set,
            get: get,
            remove: remove,
            clear: clear
        };

        /**
         * Saisi en local storage le couple clé/valeur, supporte la notion de TTL
         *
         * @param {string} key
         * @param {*} value
         * @param {number} [ttl] nombre de millisecondes
         */
        function set(key, value, ttl) {
            var data = {
                expiresAt: new Date().getTime() + ttl,
                value: value
            };

            $window.localStorage.setItem(key, JSON.stringify(data));
        }

        /**
         * Récupère en local storage la valeur de la clé voulue, supporte la notion de TTL
         *
         * @param {string} key
         */
        function get(key) {
            var data = JSON.parse($window.localStorage[key] || null, function (key, value) {
                // Transformation des chaines contenant une date ISO 8601 en objet Date
                // https://www.w3.org/TR/NOTE-datetime
                if (typeof value === 'string') {
                    var regexDateExec = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{3}))?(Z|[\+-]\d{2}(?::\d{2})?)$/.exec(value);
                    if (regexDateExec) {
                        return new Date(value);
                    }
                }

                return value;
            });

            if (data !== null) {
                if (data.expiresAt !== null && data.expiresAt < new Date().getTime()) {
                    remove(key);
                } else {
                    return data.value;
                }
            }

            return null;
        }

        /**
         * Supprime la clé voulue et sa valeur en local storage
         *
         * @param {string} key
         */
        function remove(key) {
            $window.localStorage.removeItem(key);
        }

        /**
         * Supprime toutes les données en local storage
         */
        function clear() {
            $window.localStorage.clear();
        }

        ////// private methods
    }

})();
