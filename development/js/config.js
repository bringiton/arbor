var directives = angular.module('directives', []);
var services   = angular.module('services',   []);
var filters    = angular.module('filters',    []);
var routes     = angular.module('routes',     []);
var arbor = angular.module('arborApp', ['ngRoute', 'directives', 'services', 'filters', 'routes']);

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

services.service('Linker', function($location, $route, $filter, $window){
    var testRoutesForPath = function(path){
        for (var index in $route.routes) {
            if (typeof $route.routes[index].regexp != "undefined" && $route.routes[index].regexp.test(path)) {
                return true;
            }
        }
        return false;
    };

    this.gotoRoute = function(params){
        var slug    = params.slug    || false;
        var path    = params.path    || false;
        var section = params.section || false;

        if (testRoutesForPath(path)) {
            $location.path(path);
        }else{
            $window.location = path;
        }
    };
});

directives.directive('siteNavigation', function(){
    return {
        retrict: 'E',
        templateUrl: './development/templates/shared/site-navigation.html',
        controller: 'siteNavigationController'
    };
});