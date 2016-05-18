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
        var feed    = params.branch || false;
        var path    = params.path || false;

        if (testRoutesForPath(path)) {
            path += feed ? "/" + feed : "";

            $location.path(path);
        }else{
            $window.location = path;
        }
    };
});