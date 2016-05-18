arbor.controller("feedController", [ "$rootScope", "$scope", "$routeParams", "Linker",
    function ($rootScope, $scope, $routeParams, Linker) {
        var feed = $routeParams.feed;

        $scope.branches = ["news", "politics", "food", "world-news", "new-york-times"];

        if($scope.branches.indexOf(feed) == 0){
            $scope.branch = feed;
        } else {
            $rootScope.gotoRoute({path: '/'});
        }

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
            $scope.feed = [];

            var aggregate = data['data']['twitter'].concat(data.data.instagram);

            aggregate.map(function(index, elem) {
                index[Object.keys(index)].map(function(index, elem) {
                    index.create_date_edited = (index['create_date'].match(/ /) == null) ? Number.parseInt(index['create_date']) : Date.parse(index['create_date']);
                    $scope.feed = $scope['feed'].concat(index);
                })
            })

            $scope['feed'].sort(function(index, index_1) {
                return index['create_date_edited'] > index_1['create_date_edited']
            });

            $scope.$digest();
            console.log($scope.feed)
        })
        .fail(function()   {})
        .always(function() {});
    }
]);
