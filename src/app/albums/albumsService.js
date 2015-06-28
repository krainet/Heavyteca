/* 
 * Api Test Módule
 */
angular.module('albumsService', [])
        .factory('albumsService', ['$resource', '$q', '$log','$filter',
            function ($resource, $q, $log,$filter) {
                return {
                    api: function (extra_route) {
                        if (!extra_route) {
                            extra_route = '';
                        }
                        return $resource('/assets/data/albums.json/', {}, {
                            query: {
                                timeout: 15000
                            },
                            save: {
                                timeout: 15000,
                                method: 'POST'
                            },
                            get: {
                                timeout: 15000,
                                method: 'GET',
                                isArray: true
                            }
                        });
                    },
                    getAlbums: function (id_album) {
                        //Service action with promise resolve (then)
                        var def = $q.defer();
                        this.api().get({}, {}, function (data) {
                            if(id_album){
                                var tmpData=$filter('filter')(data, {'id':parseInt(id_album)}, true);
                                data=tmpData;
                            }
                            def.resolve(data);
                        }, function (err) {
                            def.reject(err);
                        });
                        return def.promise;
                    },
                    testFunction: function () {
                        alert('testFunction');
                    }
                };
            }]);



