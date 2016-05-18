arbor.controller("leafPileController", [ "$scope", "Linker",
    function ($scope, Linker) {
        $scope.branches_example1 = [
            {title: 'News'},
            {title: 'Politics'},
            {title: 'Music'},
            {title: 'Food'},
            {title: 'World News'},
            {title: 'New York Times'},
        ];

        $scope.leaves = [
            {title: 'New York Times',     icon: 'twitter'},
            {title: 'Humans of New York', icon: 'instagram'},
            {title: 'Startup Bus',        icon: 'twitter'},
            {title: 'New York Times',     icon: 'facebook'},
            {title: 'Huggington Post',    icon: 'twitter'},
            {title: 'Startup Bus',        icon: 'instagram'},
            {title: 'Humans of New York', icon: 'facebook'}
        ];
    }
]);