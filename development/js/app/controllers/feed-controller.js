arbor.controller("feedController", [ "$rootScope", "$scope", "$routeParams", "Linker",
    function ($rootScope, $scope, $routeParams, Linker) {
        var feed = $routeParams.feed;

        $scope.branches = ["news", "politics", "food", "world-news", "new-york-times"];

        if($scope.branches.indexOf(feed) == 0){
            $scope.branch = feed;
        } else {
            $rootScope.gotoRoute({path: '/'});
        }

        function updateFeed() {
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
                console.log(data)
                var aggregate = data['data']['twitter'].concat(data.data.instagram);

                aggregate.map(function(index, elem) {
                    index[Object.keys(index)].map(function(index, elem) {
                        index.create_date_edited = (index['create_date'].match(/ /) == null)
                            ? Number.parseInt(index['create_date']) : Date.parse(index['create_date']);

                        index.create_date_edited = (index.create_date_edited.toString().length > 10)
                            ? index.create_date_edited.toString().substr(0, 10) : index.create_date_edited

                        $scope.feed = $scope['feed'].concat(index);
                    })
                })

                $scope.feed = $scope['feed'].sort(function(index, index_1) {
                    return index['create_date'] < index_1['create_date']
                    console.log()
                });

                $scope.$digest();

                $scope['feed'].map(function(index, elem) {
                    // console.log(index)
                })
            })
            .fail(function()   {})
            .always(function() {});
        }

        updateFeed();
        console.log("called")

        setTimeout(function(){
            console.log("recall");
            updateFeed();
        }, 4000);
    }
]);
