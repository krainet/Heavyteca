(function (app) {
    app.config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('root.albums', {
                    url: '/albums/:id_album',
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

    app.controller('AlbumsController', ['$scope', '$log','$state','albumsService','$modal','$stateParams','globalService',
        function ($scope, $log,$state,albumsService,$modal,$stateParams,globalService) {
            $log.info('App:: Starting AlbumsController');
            var init = function () {
                $scope.model = {};
                $scope.model.pageTitle = $state.current.data.pageTitle;
                albumsService.getAlbums($stateParams.id_album).then(function (data) {
                    $scope.model.data=data;
                });
            };

            $scope.saveFavorite = function(id_album){
                var misFav=[];
                misFav=globalService.getData('favoritos');
                if(!misFav){
                    misFav=[];
                    misFav.push(id_album);
                }else{
                    if(misFav.indexOf(id_album)==-1){
                        misFav.push(id_album);
                    }

                }

                globalService.saveData('favoritos',misFav);
            };

            $scope.isFavorite = function(id_album){
                var misFav=[];
                misFav=globalService.getData('favoritos');
                if(!misFav){
                    return false;
                }else{
                    if(misFav.indexOf(id_album)!=-1){
                        return true;
                    }
                }
                return false;
            };

            $scope.deleteFavorite = function(id_album){
                var misFav=[];
                misFav=globalService.getData('favoritos');
                if(!misFav){
                    //no hacer nada
                }else{
                    var index = misFav.indexOf(id_album);
                    if(index!=-1) {
                        misFav.splice(index, 1);
                    }

                }
                globalService.saveData('favoritos',misFav);
            };

            init();
        }]);


    app.controller('ModalInstanceCtrl',['$scope','$modalInstance','items', function ($scope, $modalInstance, items) {
        $scope.items = ['item1', 'item2', 'item3'];
        $scope.items = items;
        $scope.selected = {
            item: $scope.items[0]
        };


        $scope.ok = function () {
            $modalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);

    app.directive("tableElement",['$compile','$modal','$log','$state','globalService', function($compile,$modal,$log,$state,globalService) {

        return {
            restrict: "AE",
            templateUrl: "albums/tableElement.tpl.html",
            replace: true,
            scope: {
                model: "=",
                onEdit:'&'
            },
            link: function( scope ) {
                scope.openModal = function (size,data) {
                    var modalInstance = $modal.open({
                        animation: true,
                        templateUrl: 'albums/modalinfo.tpl.html',
                        controller: 'ModalInstanceCtrl',
                        size: size,
                        data: data,
                        resolve: {
                            items: function () {
                                return data;
                            }
                        }
                    });

                    modalInstance.result.then(function (selectedItem) {
                        scope.selected = selectedItem;
                    }, function () {
                        $log.info('Modal dismissed at: ' + new Date());
                    });
                };

                scope.goToBand = function(id_banda){
                    $state.go('root.bandas',{'id_banda':id_banda});
                };

                scope.saveFavorite = function(id_album){
                    var misFav=[];
                    misFav=globalService.getData('favoritos');
                    if(!misFav){
                        misFav=[];
                        misFav.push(id_album);
                    }else{
                        if(misFav.indexOf(id_album)==-1){
                            misFav.push(id_album);
                        }

                    }

                    globalService.saveData('favoritos',misFav);
                };

                scope.isFavorite = function(id_album){
                    var misFav=[];
                    misFav=globalService.getData('favoritos');
                    if(!misFav){
                        return false;
                    }else{
                        if(misFav.indexOf(id_album)!=-1){
                            return true;
                        }
                    }
                    return false;
                };

                scope.deleteFavorite = function(id_album){
                    var misFav=[];
                    misFav=globalService.getData('favoritos');
                    if(!misFav){
                        //no hacer nada
                    }else{
                        var index = misFav.indexOf(id_album);
                        if(index!=-1) {
                            misFav.splice(index, 1);
                        }

                    }
                    globalService.saveData('favoritos',misFav);
                };





            }
        };

    }]);



}(angular.module("KRAngular.albums", [
    'ui.router',
    'ui.bootstrap',
    'albumsService'
])));