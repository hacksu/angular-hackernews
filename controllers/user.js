angular
  .module('khe')
  .controller('UserCtrl', ['UserFactory', function (UserFactory) {

    var self = this;
    var userFactory = new UserFactory();
    self.me = userFactory.get();

    self.login = function () {
      userFactory.save({
        username: self.username,
        password: self.password
      });
      self.me = userFactory.get();
    };

    self.register = function () {
      userFactory.register({
        username: self.username,
        password: self.password
      }, function () {
        self.me = userFactory.get();
      });
    };

    self.logout = function () {
      userFactory.remove();
      self.me = null;
    };

  }]);