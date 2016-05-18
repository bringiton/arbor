arbor.controller("searchController", [ "$scope", "Linker",
    function ($scope, Linker) {
        $scope.searchResults = [
            {title: "test", mediums: ["facebook", "twitter", "instagram"]},
            {title: "test", mediums: ["facebook", "twitter", "instagram"]},
            {title: "test", mediums: ["facebook", "twitter", "instagram"]},
            {title: "test", mediums: ["facebook", "twitter", "instagram"]},
        ];
    }
]);
