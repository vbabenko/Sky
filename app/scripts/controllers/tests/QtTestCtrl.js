App.controller('QtTestCtrl', ['$scope', '$timeout', 'PreSetFactory', function($scope, $timeout, PreSetFactory) {

    $scope.mainVideoSources = [
        'Please, select a value',
        'VideoSource1',
        'VideoSource2',
        'VideoSource3'
    ];

    $scope.pipVideoSources = [
        'Please, select a value',
        'pipVideoSource1',
        'pipVideoSource2',
        'pipVideoSource3'
    ];

    $scope.fpsValues = ['Please, select a value', 1, 2, 30, 60];

    $scope.drm = false;
    $scope.display720 = false;
    $scope.dvbDesc = false;


    $scope.qtTestData = {
            'sliders'   : {
                'recordsValue'      : 0,
                'transcoderValue'   : 0,
                'recordingsValue'   : 0,
                'testOptions': {
                    min: 5,
                    max: 100,
                    step: 2.2,
                    value: 7,
                    rangeValue : [2,20]
                }
            },
            'mainVideo' : $scope.mainVideoSources[0],
            'pipVideo'  : $scope.pipVideoSources[0],
            'fps'       : $scope.fpsValues[0],
            'drm'       : false,
            'display720': false,
            'dvbDesc'   : false
    };

    $scope.qtTestDataBuffer = {};
    /*
     * Create duplicate/clone of the test object for further updating
     */
    $scope.qtTestDataBuffer = PreSetFactory.mergeObjects({}, $scope.qtTestData);
    /*
     * function allows find @key in the object and assign the @val
     */
    $scope.getSelectedData = PreSetFactory.updateValueByKey;

    $scope.saveTestConfiguration = function(testData, testName) {
        if ($scope.saveTestMarker) {
            localStorage[testName] = angular.toJson(testData);
        }
    };

    $scope.activateTestConfig = function(testName) {
        $scope.qtTestData = angular.fromJson(localStorage[testName]);
    };
    // Update model in the scope of Angular
    $timeout($scope.saveTestConfiguration);

    // for test needs
    $scope.showObj = function(obj) {
        console.log(obj);
    };

}]);