(function (app) {
    app.config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                    .state('root.generos', {
                        url: '/generos',
                        parent: 'root',
                        views: {
                            "container@": {
                                controller: 'GenerosController',
                                templateUrl: 'generos/generos.tpl.html'
                            }
                        },
                        data: {
                            pageTitle: 'Heavyteca Géneros'
                        }
                    });
        }]);

    app.controller('GenerosController', ['$scope', '$log','$state','generosService', function ($scope, $log,$state,generosService) {
            $log.info('App:: Starting GenerosController');

            var init = function () {
                $scope.model = {};
                $scope.model.pageTitle = $state.current.data.pageTitle;
                generosService.getGeneros().then(function (data) {
                    console.log(data);
                    $scope.model.data=data;
                });
            };

            $scope.gotoAlbum = function(id_album){
                $state.go('root.albums',{'id_album':parseInt(id_album)});
            };

            init();
        }]);

}(angular.module("KRAngular.generos", [
    'ui.router',
    'generosService'
])));