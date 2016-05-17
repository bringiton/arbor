arbor.run(['$rootScope', 'Linker',
    function($rootScope, Linker) {
        $rootScope.gotoRoute = function(params){
            return Linker.gotoRoute(params);
        };

        $(".branch--pile, .leaf--pile").draggable();
    }
]);

arbor.controller("homeController", [ "$scope", "Linker",
    function ($scope, Linker) {
        $scope.branches_page1 = [
            {
                title: 'Arbor',
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

arbor.controller("feedController", [ "$rootScope", "$scope", "$routeParams", "Linker",
    function ($rootScope, $scope, $routeParams, Linker) {
        var feed = $routeParams.feed;

        $scope.branches = ["news", "politics", "food", "world-news", "new-york-times"];

        if($scope.branches.indexOf(feed) == 0){
            $scope.branch = feed;
        } else {
            $rootScope.gotoRoute({path: '/'});
        }

        $scope.branch_and_leaves = {
            slug: 'news',
            leaves: [
                // {
                //     publisher: 'New York Times',
                //     source: 'Twitter',
                //     copy: 'Breaking news, Startup Bus just left Cincinatti!'
                // },
                // {
                //     publisher: 'New York Times',
                //     source: 'Facebook',
                //     copy: 'Checking Facebook often? Consider your options ...'
                // },
                // {
                //     publisher: 'New York Times',
                //     source: 'Instagram',
                //     image: '../../assets/images/new-york-times__instagram-image.jpg'
                // },
                // {
                //     publisher: 'New York Times',
                //     source: 'Twitter',
                //     copy: 'Breaking news, Startup Bus just left Cincinatti!'
                // }
            ]
        };

        $.ajax({
            url: 'https://arborapp.herokuapp.com/retrieve/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(
                {
                    "users": [
                        {"name": "sriram09","source": "twitter"},
                        {"name": "srirams09","source": "instagram"},
                        {"name": "saltorcivia","source": "twitter"},
                    ]
                }
            )
        })
        .done(function(data) {
            var salsTwitter   = data.data[0];
            var ramsTwitter   = data.data[1];
            var ramsInstagram = data.data[2].data;

            for(var i = 0; i < ramsTwitter.length; i++) {
                $scope.branch_and_leaves['leaves'][i] = {}
                $scope.branch_and_leaves['leaves'][i]['copy'] = ramsTwitter[i].text;
                $scope.branch_and_leaves['leaves'][i]['name'] = ramsTwitter[i].user.name;
                $scope.branch_and_leaves['leaves'][i]['source'] = "twitter";
            }

            for(var i = 0; i < ramsInstagram.length; i++) {
                $scope.branch_and_leaves['leaves'][ramsTwitter.length + 1] = {}
                $scope.branch_and_leaves['leaves'][ramsTwitter.length + 1]['image'] = ramsInstagram[i].link;
                $scope.branch_and_leaves['leaves'][ramsTwitter.length + 1]['source'] = "instagram";
            }
// Just in a rush, don't crucify me for doing it this way
            for(var i = 0; i < salsTwitter; i++) {
                $scope.branch_and_leaves['leaves'][ramsTwitter.length + ramsInstagram.length + i] = {}
                $scope.branch_and_leaves['leaves'][ramsTwitter.length + ramsInstagram.length + i]['copy'] = salsTwitter[i].text;
                $scope.branch_and_leaves['leaves'][ramsTwitter.length + ramsInstagram.length + i]['name'] = salsTwitter[i].user.name;
                $scope.branch_and_leaves['leaves'][ramsTwitter.length + ramsInstagram.length + i]['source'] = "twitter";
            }

            $scope.$digest();
        })
        .fail(function()   {})
        .always(function() {});
    }
]);

arbor.controller("settingsController", [ "$scope", "$rootScope", "Linker",
    function ($scope, $rootScope, Linker) {}
]);

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

arbor.controller("searchController", [ "$scope", "Linker",
    function ($scope, Linker) {
        $scope.searchResults = [
            {title: 'Humans of New York', icon: 'instagram'},
            {title: 'Ars Technica', icon: 'reddit'},
            {title: 'New York Times',     icon: 'twitter'},
            {title: 'Gucci', icon: 'instagram'},
            {title: 'Discovery Channel', icon: 'facebook'},
            {title: 'Gucci', icon: 'instagram'},
            {title: 'Humans of New York', icon: 'instagram'},
            {title: 'Tech Chrunch', icon: 'snapchat-ghost'},
            {title: 'Discovery Channel', icon: 'facebook'},
            {title: 'Huffington Post',    icon: 'facebook'},
            {title: 'Tech Chrunch', icon: 'snapchat-ghost'},
            {title: 'Discovery Channel', icon: 'facebook'},
            {title: 'Humans of New York', icon: 'instagram'},
            {title: 'Gucci', icon: 'instagram'},
            {title: 'Humans of New York', icon: 'instagram'},
            {title: 'Tech Chrunch', icon: 'snapchat-ghost'},
            {title: 'Tech Chrunch', icon: 'snapchat-ghost'},
            {title: 'Huffington Post',    icon: 'facebook'},
            {title: 'Ars Technica', icon: 'reddit'},
            {title: 'Gucci', icon: 'instagram'},
            {title: 'New York Times',     icon: 'twitter'},
            {title: 'Ars Technica', icon: 'reddit'},
            {title: 'New York Times',     icon: 'twitter'},
            {title: 'New York Times',     icon: 'twitter'},
            {title: 'Huffington Post',    icon: 'facebook'},
            {title: 'Ars Technica', icon: 'reddit'},
            {title: 'Huffington Post',    icon: 'facebook'},
            {title: 'Discovery Channel', icon: 'facebook'},
        ];
    }
]);

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
