(function (app) {
    app.config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                    .state('root.bandas', {
                        url: '/bandas/:id_banda',
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

    app.controller('BandasController', ['$scope', '$log','$state','bandasService','$stateParams',
        function ($scope, $log,$state,bandasService,$stateParams) {
            $log.info('App:: Starting BandasController');
            console.log($stateParams);
            var init = function () {
                $scope.model = {};
                $scope.model.pageTitle = $state.current.data.pageTitle;
                bandasService.getBandas($stateParams.id_banda).then(function (data) {
                    console.log(data[0]);
                    $scope.model.data=data;
                });

            };
            init();
        }]);

    app.directive("tableElementBanda", ['$state', function ($state) {
        return {
            restrict: "AE",
            templateUrl: "bandas/tableElementBanda.tpl.html",
            replace: true,
            scope: {
                model: "=",
                onEdit:'&'
            },
            link: function( scope ) {
                scope.gotoAlbum = function(id_album){
                    $state.go('root.albums',{'id_album':parseInt(id_album)});
                };
            }
        };

    }]);

}(angular.module("KRAngular.bandas", [
    'ui.router',
    'bandasService'
])));