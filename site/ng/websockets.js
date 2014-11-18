DELETE THIS
I DO NOT CARE ABOUT SENDING DIRECT WS CON TO THIS 

angular.module('app')
.run(function ($rootScope) {
  var url = 'ws://localhost:3000'
  var connection = new WebSocket(url)

  connection.onopen = function () {
    console.log('WebSocket connected')
  }

  connection.onmessage = function (e) {
    var payload = JSON.parse(e.data)
    $rootScope.$broadcast('ws:' + payload.topic, payload.data)
  }
});
