(function (app) {
    app.config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                    .state('root.albums', {
                        url: '/albums',
                        parent: 'root',
                        views: {
                            "container@": {
                                controller: 'AlbumsController',
                                templateUrl: 'albums/albums.tpl.html'
                            }
                        },
                        data: {
                            pageTitle: 'Heavyteca Albums'
                        }
                    });
        }]);

    app.controller('AlbumsController', ['$scope', '$log','$state','albumsService', function ($scope, $log,$state,albumsService) {
            $log.info('App:: Starting AlbumsController');

            var init = function () {
                $scope.model = {};
                $scope.model.pageTitle = $state.current.data.pageTitle;
                albumsService.getAlbums().then(function (data) {
                    console.log(data[0]);
                    $scope.model.data=data;
                });
            };
            init();
        }]);


}(angular.module("KRAngular.albums", [
    'ui.router',
    'albumsService'
])));