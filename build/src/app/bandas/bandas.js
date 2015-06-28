(function (app) {
    app.config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                    .state('root.bandas', {
                        url: '/bandas',
                        parent: 'root',
                        views: {
                            "container@": {
                                controller: 'BandasController',
                                templateUrl: 'bandas/bandas.tpl.html'
                            }
                        },
                        data: {
                            pageTitle: 'Heavyteca Bandas'
                        }
                    });
        }]);

    app.controller('BandasController', ['$scope', '$log','$state','bandasService', function ($scope, $log,$state,bandasService) {
            $log.info('App:: Starting BandasController');

            var init = function () {
                $scope.model = {};
                $scope.model.pageTitle = $state.current.data.pageTitle;
                bandasService.getBandas().then(function (data) {
                    console.log(data[0]);
                    $scope.model.data=data;
                });

            };
            init();
        }]);

}(angular.module("KRAngular.bandas", [
    'ui.router',
    'bandasService'
])));