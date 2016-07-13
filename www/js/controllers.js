angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('VocsCtrl', function($scope, Vocs) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});
        
        
        $scope.vocs = Vocs.all();
        $scope.remove = function(voc) {
            Vocs.remove(voc);
        };

        $scope.add = function(voc) {
            console.log("inside ADD" + voc.source);

            if (voc.id === 999) {
                Vocs.insert(voc);
            } else {
                Vocs.save(voc);
            }

            $scope.vocs = Vocs.all();
            $scope.voc = { id: 999, source: "", dest: "" };
        };


        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

            console.log("State changed: ", toState);

            $window.location.reload(true);
            //if ($location.path() == "/vocs") {
                //$scope.refreshItems();
            //}

        });
    })
    .controller('ChatDetailCtrl', function($scope, $stateParams, Vocs) {
        $scope.voc = Vocs.get($stateParams.chatId);
    })

.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
});