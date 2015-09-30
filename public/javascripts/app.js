var newsApp = angular.module('newsApp', ['angularMoment']);
newsApp.run(function(amMoment) {
    amMoment.changeLocale('zh-cn');
});
newsApp.controller('NewsListController',
  function ($scope, $http) {
    $scope.letterLimit = 30;
    $scope.loadData = function(chnId, listTarget) {
      $scope[listTarget] = [];
      $scope["loaded" + chnId] = false;
      $http.get('/getNews?chnId=' + chnId).success(function(data) {
        for(var i = 0 ; i < data.result.length; i ++) {
          if(data.result[i].images && data.result[i].images.length > 0)
            data.result[i].images[0] = data.result[i].images[0].replace("&type=webp_270x190", '')
        }
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
    // $scope.fixImage = function(obj){
    //   return $scope.addText.replace("{0}", obj).replace("&type=webp_270x190", '')
    // };
  });
