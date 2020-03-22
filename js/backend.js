'use strict';

(function () {
  var Url = {
    DOWNLOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking'
  };

  var CODE_SUCCESS = 200;

  var save = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === CODE_SUCCESS) {
        onSuccess();
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open('POST', Url.UPLOAD);
    xhr.send(data);
  };

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === CODE_SUCCESS) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.open('GET', Url.DOWNLOAD);
    xhr.send();
  };

  // Окно ошибки
  var onError = function (message) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorBlock = errorTemplate.cloneNode(true);
    errorBlock.querySelector('.error__message').textContent = message;
    var errorButton = errorBlock.querySelector('.error__button');
    document.querySelector('main').appendChild(errorBlock);

    errorButton.addEventListener('click', removeError);
    document.addEventListener('click', removeError);
    document.addEventListener('keydown', onErrorEsc);

    window.map.inactivateMap();
  };

  var removeError = function () {
    document.querySelector('.error').remove();
    document.removeEventListener('click', removeError);
    document.removeEventListener('keydown', onErrorEsc);
  };

  var onErrorEsc = function (evt) {
    if (evt.keyCode === window.backend.ESC_KEYCODE) {
      removeError();
    }
  };

  window.backend = {
    ENTER_KEYCODE: 13,
    ESC_KEYCODE: 27,
    save: save,
    load: load,
    onError: onError
  };
})();
