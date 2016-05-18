var directives = angular.module('directives', []);
var services   = angular.module('services',   []);
var filters    = angular.module('filters',    []);
var routes     = angular.module('routes',     []);
var arbor = angular.module('arborApp', ['ngRoute', 'ngAnimate', 'directives', 'services', 'filters', 'routes']);