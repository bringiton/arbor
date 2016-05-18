arbor.run(['$rootScope', 'Linker',
    function($rootScope, Linker) {
        $rootScope.gotoRoute = function(params){
            return Linker.gotoRoute(params);
        };

        $(".branch, .leaf").draggable();
    }
]);
