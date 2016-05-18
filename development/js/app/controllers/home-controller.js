arbor.controller("homeController", [ "$scope", "Linker",
    function ($scope, Linker) {
        $scope.branches_page1 = [
            {
                title: 'Startup Bus',
                slug: 'news'
            },
            {
                title: 'Politics',
                slug: 'politics'
            },
            {
                title: 'Music',
                slug: 'music'
            },
            {
                title: 'Food',
                slug: 'food'
            },
            {
                title: 'Sports',
                slug: 'world-news'
            },
            {
                title: 'New York Times',
                slug: 'new-york-times'
            }
        ];
    }
]);