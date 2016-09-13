(function () {
    /* jshint validthis: true */
    'use strict';

    angular
        .module('app.select')
        .factory('selectService', selectService);

    function selectService(Restangular) {
        ////// variables

        var data = {
            albums: []
        };
        var model = {
            album: null
        };

        ////// public methods

        return {
            getData: getData,
            getModel: getModel,
            findAlbums: findAlbums
        };

        function getData() {
            return data;
        }

        function getModel() {
            return model;
        }

        function findAlbums(search) {
            if (search) {
                Restangular.one('/v1/search').get({
                    type: 'album',
                    query: search,
                    offset: 0,
                    limit: 20
                }).then(function (response) {
                    data.albums = response.data.albums.items;
                });
            }
        }

        ////// private methods
    }

})();
