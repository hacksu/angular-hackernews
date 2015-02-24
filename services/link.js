angular
  .module('khe')
  .factory('LinkFactory', ['$http', 'UserFactory', function ($http, UserFactory) {

    var LinkFactory = function () {

      var self = this;
      var userFactory = new UserFactory();

      self.list = function (callback/*links*/) {
        var req = {
          method: 'GET',
          url: 'http://104.236.35.212/links'
        };
        $http(req)
          .success(function (data) {
            callback(data.links);
          })
          .error(function (data) {
            console.log(data);
          });
      };

      self.create = function (link, callback) {
        var req = userFactory.authorize({
          method: 'POST',
          url: 'http://104.236.35.212/links/create',
          data: $.param(link)
        });
        $http(req)
          .success(function (data) {
            callback();
          })
          .error(function (data) {
            console.log(data);
          });
      };

      self.vote = function (id, callback) {
        var req = userFactory.authorize({
          method: 'POST',
          url: 'http://104.236.35.212/links/vote',
          data: $.param({
            link_id: id
          })
        });
        $http(req)
          .success(function (data) {
            callback();
          })
          .error(function (data) {
            console.log(data);
          });
      };

    };

    return LinkFactory;

  }]);