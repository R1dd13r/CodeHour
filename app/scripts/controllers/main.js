'use strict';

/**
 * @ngdoc function
 * @name codeHourApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the codeHourApp
 */
angular.module('codeHourApp')
  .controller('MainCtrl', ['$http', '$scope', function($http, $scope) {
    $http.get('https://jsonp.afeld.me/?url=http://codeforces.com/api/contest.list?gym=false')
      .success(function(data) {
        var res = data.result;
        var result = res.filter(function(obj) {
          if (obj.relativeTimeSeconds < 0)
            return true;
          else
            return false;
        });
        $scope.cfcontests = result;
      })
      .error(function(err) {
        alert(err);
      });

    var date = new Date();
    var isoDate = date.toISOString();
    isoDate = isoDate.substring(0, isoDate.length - 1);
    var url = 'http://api.topcoder.com/v2/data/srm/schedule?registrationStartTimeAfter=' + isoDate + '-0400';
    $http.get(url)
      .success(function(data) {
        var tcdata = data.data;
        var dif = 4 * 60 * 60 * 1000;
        tcdata.forEach(function(element, index, array) {
          var dateCon = element.codingStartTime;
          dateCon = dateCon.substring(0, dateCon.length - 5);
          var date = new Date(dateCon) / 1000;
          date = Math.round(date * 1000);
          element.codingStartTime = date + dif;
        });
        $scope.tccontests = data.data;
      })
      .error(function(err) {
        //                 alert(err);
      });


  }]);
