(function() {
  'use strict';
  angular
    .module('ShineApp', [])
    .controller('MainController', MainController);

    function MainController($http) {

      // Using 'this' within my $http callback
      // will no longer references the controller
      // So we have to save the reference outside
      // of the callback
      var controller = this;
      
      // $http request could take a while and the page would have loaded already.
      // I'm initialise our controller.songs to an empty array
      // so we don’t get errors on the page.
      controller.songs = [];

      this.searchArtist = function(query){
        var url = 'https://itunes.apple.com/search?term=' + query.artist;

        // TODO: Implement error checks
        controller.errors = null;

        $http.jsonp(url, {
          params: {
            'callback': 'JSON_CALLBACK'
          }
        }).success(function(data){
          controller.songs = data.results;
          console.log('yay! delicious api data');
          console.log(data);
        });
      };
    }
})();
