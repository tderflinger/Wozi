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
        $scope.cats = Vocs.cats();

        $scope.selectedCat = function(voc, catId) {
            console.log("selectedCAT: "+voc+" CAT: "+catId);
            console.log("EQULS?"+(voc==catId));
            return (voc == catId);
        }

        $scope.remove = function(voc) {
            Vocs.remove(voc);
        };

        $scope.add = function(voc, selectme) {
            console.log("inside ADD" + voc.source);

            if (voc.id === 999) {
                console.log("Selected Id: "+selectme.id);
                voc.cat = selectme.id;
                
                Vocs.insert(voc);
            } else {
                console.log("Selected Id: "+selectme.id);
                voc.cat = selectme.id;
                
                Vocs.save(voc);
            }

            $scope.vocs = Vocs.all();
            $scope.voc = { id: 999, source: "", dest: "", cat: voc.cat };
        };

    })
    .controller('ChatDetailCtrl', function($scope, $stateParams, Vocs) {
        $scope.cats = Vocs.cats();
        
        $scope.voc = Vocs.get($stateParams.chatId);
        $scope.selected = $scope.cats[$scope.voc.cat];
    })

.controller('LearnCtrl',  ['$scope', 'Vocs', function($scope, Vocs) {
    console.log("inside LearnCtrl");

    var vocs = Vocs.all();
    var randomNumber = Math.floor(Math.random() * vocs.length);

    $scope.learnVoc = vocs[randomNumber].source;
    $scope.side = true;
    $scope.learn = {cat: 0};

    $scope.vocs = Vocs.all();
    $scope.catVoc = [];

    self = this;

    $scope.next = function() {
        console.log("Learncat: "+$scope.learn.cat);
        var count = 0;
        $scope.catVoc = [];

        for (var a=0; a < $scope.vocs.length; a++) {
            console.log("Vocs:"+$scope.vocs[a].source+": "+$scope.vocs[a].cat);
            if ($scope.vocs[a].cat == $scope.learn.cat) {
                console.log("SAME CAT: "+$scope.vocs[a].source);
                $scope.catVoc.push($scope.vocs[a]);
            }
        }

        $scope.randomNumber = Math.floor(Math.random() * $scope.catVoc.length);
        $scope.learnVoc = $scope.catVoc[$scope.randomNumber].source;    

        console.log("NEXT: "+$scope.learnVoc);

        $scope.side = true;
    };

    $scope.turn = function() {
        if ($scope.side) {
            $scope.learnVoc = $scope.catVoc[$scope.randomNumber].dest;
        } else {
            $scope.learnVoc = $scope.catVoc[$scope.randomNumber].source;
        }
        $scope.side = !$scope.side;
    };
}]);