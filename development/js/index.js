arbor.run(['$rootScope', 'Linker',
    function($rootScope, Linker) {
        $rootScope.gotoRoute = function(params){
            return Linker.gotoRoute(params);
        };
    }
]);

arbor.controller("homePageController", [ "$scope", "Linker",
    function ($scope, Linker) {
        $scope.branches_page1 = [
            {
                title: 'News'
            },
            {
                title: 'Politics'
            },
            {
                title: 'Music'
            },
            {
                title: 'Food'
            },
            {
                title: 'World News'
            }
        ];
    }
]);

arbor.controller("pseudoPageController", [ "$scope", "Linker",
    function ($scope, Linker) {}
]);