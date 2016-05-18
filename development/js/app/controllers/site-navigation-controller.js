arbor.controller("siteNavigationController", [ "$scope", "$routeParams", "$location", "Linker",
    function ($scope, $routeParams, $location, Linker) {
        $scope.menu_links = [
            {title: 'discover',  path: '/discover',  icon: 'users'},
            {title: 'search',    path: '/search',    icon: 'search'},
            {title: 'home',      path: '/',          icon: 'tree'},
            {title: 'leaf pile', path: '/leaf-pile', icon: 'leaf'},
            {title: 'settings',  path: '/settings',  icon: 'cog'},
        ];

        $scope.current = $location.path();
        $scope.$on('$locationChangeStart', function(event) {
            $scope.current = $location.path();
        });
    }
]);