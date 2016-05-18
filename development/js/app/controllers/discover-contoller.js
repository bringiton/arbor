arbor.controller("discoverController", [ "$scope", "Linker",
    function ($scope, Linter) {
        $scope.branches_discover = [
            {title: '#Gucci',     slug: 'news'},
            {title: 'World News', slug: 'world-news'},
            {title: 'Music',      slug: 'music'},
            {title: 'Politics',   slug: 'politics'},
            {title: 'News',       slug: 'news'},
            {title: 'World News',  slug: 'news'},
        ];
    }
]);