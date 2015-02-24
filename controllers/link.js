angular
  .module('khe')
  .controller('LinkCtrl', ['LinkFactory', function (LinkFactory) {

    var self = this;
    var linkFactory = new LinkFactory();

    self.links = [];

    function get() {
      linkFactory.list(function (links) {
        self.links = links;
      });
    }
    get();

    self.new = {};
    self.create = function () {
      linkFactory.create({
        title: self.new.title,
        url: self.new.url
      }, function () {
        self.new = {};
        get();
      });
    };

    self.vote = function (link) {
      linkFactory.vote(link.id, function () {
        get();
      });
    };

  }]);