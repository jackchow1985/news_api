var newsApp = angular.module('newsApp', []);

newsApp.controller('NewsListController',
  function ($scope, $http) {
    $scope.letterLimit = 30;
    $scope.loadData = function(chnId, listTarget) {
      $scope[listTarget] = []
      $scope["loaded" + chnId] = false;
      $http.get('/getNews?chnId=' + chnId).success(function(data) {
        $scope[listTarget] = data.result;
        $scope["loaded" + chnId] =true;
      });
    }
    $scope.loadData(0, "newsList0"); // 外汇
    $scope.loadData(1, "newsList1"); // 期货

    $scope.reload = function(chnId) {
      $scope.loadData(chnId, "newsList" + chnId); // 外汇
    }
    $scope.hideImg = function(chnId) {
      $scope["hideImg" + chnId] = !$scope["hideImg" + chnId]; // 外汇
    }
  });
