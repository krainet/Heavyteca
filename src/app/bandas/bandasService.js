/* 
 * Api Test Módule
 */
angular.module('bandasService', [])
        .factory('bandasService', ['$resource', '$q', '$log','$filter',
            function ($resource, $q, $log,$filter) {
                return {
                    api: function (extra_route) {
                        if (!extra_route) {
                            extra_route = '';
                        }
                        return $resource('/assets/data/bands.json/', {}, {
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
                    getBandas: function (id_banda) {
                        //Service action with promise resolve (then)
                        var def = $q.defer();
                        this.api().get({}, {}, function (data) {
                            $log.warn('Api::data:: ');
                            $log.warn(data);
                            if(id_banda){
                                var tmpData=$filter('filter')(data, {'name':id_banda}, true);
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



