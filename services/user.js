angular
  .module('khe')
  .factory('UserFactory', ['$http', function ($http) {

    var UserFactory = function () {

      var self = this;

      self.save = function (user) {
        localStorage.setItem('user', angular.toJson(user));
      };

      self.get = function () {
        return angular.fromJson(localStorage.getItem('user'));
      };

      self.remove = function () {
        localStorage.removeItem('user');
      };

      self.register = function (user, callback) {
        var req = {
          method: 'POST',
          url: 'http://104.236.35.212/users/register',
          data: $.param({
            username: user.username,
            password: user.password
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        };
        $http(req)
          .success(function (data) {
            self.save(user);
            callback();
          })
          .error(function (data) {
            console.log(data);
          });
      };

      self.authorize = function (req) {
        var encoded = base64Encode(self.get().username+':'+self.get().password);
        var ext = {
          headers: {
            'Authorization': 'Basic ' + encoded,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        };
        angular.extend(req, ext);
        return req;
      };

    };

    return UserFactory;

  }]);

function base64Encode(data) {
  //  discuss at: http://phpjs.org/functions/base64_encode/
  // original by: Tyler Akins (http://rumkin.com)
  // improved by: Bayron Guevara
  // improved by: Thunder.m
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: RafaÅ‚ Kukawski (http://kukawski.pl)
  // bugfixed by: Pellentesque Malesuada
  var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
    ac = 0,
    enc = '',
    tmp_arr = [];
  if (!data) {
    return data;
  }
  data = unescape(encodeURIComponent(data));
  do {
    o1 = data.charCodeAt(i++);
    o2 = data.charCodeAt(i++);
    o3 = data.charCodeAt(i++);
    bits = o1 << 16 | o2 << 8 | o3;
    h1 = bits >> 18 & 0x3f;
    h2 = bits >> 12 & 0x3f;
    h3 = bits >> 6 & 0x3f;
    h4 = bits & 0x3f;
    tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  } while (i < data.length);
  enc = tmp_arr.join('');
  var r = data.length % 3;
  return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
}