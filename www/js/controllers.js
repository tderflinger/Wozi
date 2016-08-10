angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('VocsCtrl', function($scope, Vocs) {
    $scope.vocs = Vocs.all();
    $scope.cats = Vocs.cats();

    $scope.selectedCat = function(voc, catId) {
        console.log("selectedCAT: " + voc + " CAT: " + catId);
        console.log("EQULS?" + (voc == catId));
        return (voc == catId);
    };

    $scope.remove = function(voc) {
        Vocs.remove(voc);
    };

    $scope.add = function(voc, selectme) {
        if (voc.id === 999) {
            console.log("Selected Id: " + selectme.id);
            voc.cat = selectme.id;

            Vocs.insert(voc);
        } else {
            console.log("Selected Id: " + selectme.id);
            voc.cat = selectme.id;

            Vocs.save(voc);
        }

        $scope.vocs = Vocs.all();
        $scope.voc = { id: 999, source: "", dest: "", cat: voc.cat };
    };
})

.controller('VocDetailCtrl', function($scope, $stateParams, Vocs) {
    $scope.cats = Vocs.cats();

    $scope.voc = Vocs.get($stateParams.chatId);
    $scope.selected = $scope.cats[$scope.voc.cat];
})

.controller('LearnCtrl', ['$scope', 'Vocs', function($scope, Vocs) {
    var vocs = Vocs.all();
    var randomNumber = Math.floor(Math.random() * vocs.length);

    $scope.learnVoc = vocs[randomNumber].source;
    $scope.side = true;
    $scope.learn = { cat: 0 };

    $scope.vocs = Vocs.all();
    $scope.catVoc = [];

    self = this;

    $scope.next = function() {
        var count = 0;
        $scope.catVoc = [];

        for (var a = 0; a < $scope.vocs.length; a++) {
            console.log("Vocs:" + $scope.vocs[a].source + ": " + $scope.vocs[a].cat);
            if ($scope.vocs[a].cat == $scope.learn.cat) {
                $scope.catVoc.push($scope.vocs[a]);
            }
        }

        $scope.randomNumber = Math.floor(Math.random() * $scope.catVoc.length);
        $scope.learnVoc = $scope.catVoc[$scope.randomNumber].source;
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