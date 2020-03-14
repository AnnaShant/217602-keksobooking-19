'use strict';
(function () {
  var Url = {
    DOWNLOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking'
  };

  var CODE_SUCCESS = 200;

  var mapElement = document.querySelector('.map');

  var xhrSetup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === CODE_SUCCESS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        window.backend.loadError();
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    return xhr;
  };

  var fragment = document.createDocumentFragment();
  var loadError = function () {
    var errorBlock = document.querySelector('#error').content.querySelector('.error');
    errorBlock.cloneNode(true);
    var errorButton = errorBlock.querySelector('.error__button');

    var onErrorClose = function () {
      errorBlock.parentNode.removeChild(errorBlock);
      document.removeEventListener('click', onErrorClose);
    };

    errorButton.addEventListener('click', onErrorClose);
    document.addEventListener('click', onErrorClose);

    errorBlock.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.backend.escCode) {
        onErrorClose();
      }
    });

    fragment.appendChild(errorBlock);
    mapElement.appendChild(fragment);
  };

  window.backend = {
    save: function (data, onLoad, onError) {
      var xhr = xhrSetup(onLoad, onError);

      xhr.open('POST', Url.UPLOAD);
      xhr.send(data);
    },

    load: function (onLoad, onError) {
      var xhr = xhrSetup(onLoad, onError);

      xhr.open('GET', Url.DOWNLOAD);
      xhr.send();
    },

    loadError: loadError,

    escCode: 27
  };
})();
