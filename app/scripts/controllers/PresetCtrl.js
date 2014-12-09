App.controller('PresetCtrl', ['$scope', '$state', 'PreSetFactory', '$interval','$q', function($scope, $state, PreSetFactory, $interval, $q) {
     var promisePreSet = PreSetFactory.getPreSet();
     promisePreSet.then(function(result) {
        $scope.preSetOptions = PreSetFactory.insertPlaceholder(result.data.presets); // TBD.. need to be simplified
        $scope.preSetOption = $scope.preSetOptions[0];
     });

    $scope.promiseTest = function(preSetName) {
        if (preSetName == $scope.preSetOptions[0]) return;
        (function() {
            PreSetFactory.getTests(preSetName).then(function (result) {
                $scope.testOptions = PreSetFactory.insertPlaceholder(result.data.tests); // TBD.. need to be simplified
                $scope.testOption = $scope.testOptions[0];
            });
        })();
    };


    $scope.saveTestMarker = false;

    $scope.defineTests = function(elem) {
        //TBD.. load appropriate test to 'testOptions' based on selected ng-option
    };
    $scope.testActivated = false;
    $scope.testsLoaded = true;
    /*
     * the function takes agruments from test and shows the progress of test (default mode is w/o server side)
     * It based on 'testLength' (min) that selected within the test and update status
     * every 1 min (minimun step of test). Or 'getTestProgress' function will update the progress of test if server will support it.
      */
    $scope.testProgress = function(testLength, rangeMin, rangeMax) {
        var stop;
        $scope.testActivated = true;
        $scope.testLength = testLength || 60;
        $scope.rangeMin = rangeMin || 0;
        $scope.rangeMax = rangeMax || 100;
        $scope.currentValue = 0;
        $scope.animationStep = Math.ceil(100/$scope.testLength);

        stop = $interval(function() {
            if ($scope.currentValue < $scope.rangeMax) {
                $scope.currentValue += $scope.animationStep;
            } else {
                $scope.currentValue = $scope.rangeMax;
                $interval.cancel(stop);
                $scope.testActivated = false;
                $state.go('testOptions.testResult');
            }
        }, 1000);
    };

    //TBD... get progress of test that has been run
    $scope.getTestProgress = function() {

    };

    // Redirect to appropriate URL that based on selected value from the drop menu
    $scope.changeTestState = function(obj) {
        if (obj == $scope.testOptions[0] ) {
            $state.go('main');
        } else {
            $state.go('testOptions',{ name: obj });
        }
    }

}]);
