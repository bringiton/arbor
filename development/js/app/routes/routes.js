routes.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'homeController as cntlr',
            templateUrl: './development/templates/pages/home.html'
        })
        .when('/pseudo-feed', {
            controller: 'feedController as cntlr',
            templateUrl: './development/templates/pages/pseudo-feed.html'
        })
        .when('/pseudo-feed/:feed', {
            controller: 'feedController as cntlr',
            templateUrl: './development/templates/pages/pseudo-feed.html'
        })
        .when('/discover', {
            controller: 'discoverController as cntlr',
            templateUrl: './development/templates/pages/discover.html'
        })
        .when('/settings', {
            controller: 'settingsController as cntlr',
            templateUrl: './development/templates/pages/settings.html'
        })
        .when('/leaf-pile', {
            controller: 'leafPileController as cntlr',
            templateUrl: './development/templates/pages/leaf-pile.html'
        })
        .when('/search', {
            controller: 'searchController as cntlr',
            templateUrl: './development/templates/pages/search.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});
