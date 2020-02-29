'use strict';

(function () {
  var URL = {
    UP: 'https://js.dump.academy/keksobooking/data',
    DOWN: 'https://js.dump.academy/keksobooking'
  };

  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    return xhr;
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = window.load(onLoad, onError);

      xhr.open('GET', URL.DOWN);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = window.load(onLoad, onError);

      xhr.open('POST', URL.UP);
      xhr.send(data);
    }
  };
})();
