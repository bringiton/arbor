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

arbor.controller("siteNavigationController", [ "$scope", "Linker",
    function ($scope, Linker) {
        $scope.menu_links = [
            {title: 'discover', icon: 'users'},
            {title: 'search', icon: 'search'},
            {title: 'home', icon: 'tree'},
            {title: 'settings', icon: 'cog'},
            {title: 'leaf pile', icon: 'leaf'}
        ];
    }
]);
