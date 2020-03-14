'use strict';
(function () {
  var PinSizes = {
    WIDTH_PIN: 50,
    HEIGHT_PIN: 70
  };

  var MAX_PINS = 5;
  var KEYCODE_ENTER = 13;
  var KEYCODE_ESC = 27;

  var pinTemplateElement = document.querySelector('#pin').content;
  var pinElement = pinTemplateElement.querySelector('.map__pin');

  // Создание меток на карте
  var createElementPin = function (arr) {
    var fragment = document.createDocumentFragment();
    var elements = [];

    for (var j = 0; j < arr.length; j++) {
      var element = pinElement.cloneNode(true);
      element.classList.add('pin-open-card');
      var imgElement = element.querySelector('img');

      element.setAttribute('data-id', arr[j].id);
      element.style.left = arr[j].location.x - PinSizes.WIDTH_PIN / 2 + 'px';
      element.style.top = arr[j].location.y - PinSizes.HEIGHT_PIN + 'px';
      imgElement.src = arr[j].author.avatar;
      imgElement.alt = arr[j].offer.title;

      if (arr.length > MAX_PINS) {
        if (elements.length < MAX_PINS) {
          elements.push(element);
        }
      } else {
        elements.push(element);
      }
    }
    elements.forEach(function (item) {
      fragment.appendChild(item);
    });

    return fragment;
  };

  // Открытие/закрытие карточки метки
  var controlPinMap = function () {
    var mapCard = document.querySelector('.map__card');
    var pinElements = document.querySelectorAll('.pin-open-card');
    var data = window.dataLoad.dataLoad;

    var onOpenCardClick = function (i, item) {
      Array.from(pinElements).forEach(function (element) {
        element.classList.remove('map__pin--active');
      });

      window.card.createElementCard(data, i);
      item.classList.add('map__pin--active');
      mapCard.classList.remove('hidden');
      mapCard.querySelector('.popup__close').addEventListener('click', function () {
        onCloseCardClick(item);
      });

      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === KEYCODE_ESC) {
          onCloseCardClick(item);
        }
      });
    };

    var onCloseCardClick = function (item) {
      item.classList.remove('map__pin--active');
      document.removeEventListener('keydown', onCloseCardClick);
      mapCard.classList.add('hidden');
    };

    Array.from(pinElements).forEach(function (item) {
      item.addEventListener('click', function () {
        onOpenCardClick(item.getAttribute('data-id'), item);
        document.addEventListener('keydown', function (evt) {
          if (evt.keyCode === KEYCODE_ESC) {
            onCloseCardClick(item);
          }
        });
      });

      item.addEventListener('keydown', function (evt) {
        if (evt.keyCode === KEYCODE_ENTER) {
          onOpenCardClick(item.getAttribute('data-id'), item);
        }
      });
    });

  };

  window.pin = {
    controlPinMap: controlPinMap,
    createElementPin: createElementPin
  };
})();
