arbor.run(['$rootScope', 'Linker',
    function($rootScope, Linker) {
        $rootScope.gotoRoute = function(params){
            return Linker.gotoRoute(params);
        };
    }
]);

arbor.controller("homeController", [ "$scope", "Linker",
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
            },
            {
                title: 'New York Times'
            }
        ];
    }
]);

arbor.controller("feedController", [ "$scope", "Linker",
    function ($scope, Linker) {}
]);

arbor.controller("discoverController", [ "$scope", "Linker",
    function ($scope, Linker) {}
]);

arbor.controller("settingsController", [ "$scope", "Linker",
    function ($scope, Linker) {}
]);

arbor.controller("leafPileController", [ "$scope", "Linker",
    function ($scope, Linker) {}
]);

arbor.controller("searchController", [ "$scope", "Linker",
    function ($scope, Linker) {}
]);

arbor.controller("siteNavigationController", [ "$scope", "Linker",
    function ($scope, Linker) {
        $scope.menu_links = [
            {title: 'discover',  path: '/discover',  icon: 'users'},
            {title: 'search',    path: '/search',    icon: 'search'},
            {title: 'home',      path: '/',          icon: 'tree'},
            {title: 'settings',  path: '/settings',  icon: 'cog'},
            {title: 'leaf pile', path: '/leaf-pile', icon: 'leaf'}
        ];
    }
]);
