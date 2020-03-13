'use strict';

(function () {
  var PinSizes = {
    WIDTH_PIN: 50,
    HEIGHT_PIN: 70
  };

  // Максимальное количество меток
  var MAX_PINS = 5;

  var similarPinTemplate = document.querySelector('#pin')
      .content;

  // Функция отрисовки метки
  var pinRendering = function (arr) {
    var element = similarPinTemplate.cloneNode(true);

    element.querySelector('.map__pin').style.left = arr.location.x - PinSizes.WIDTH_PIN / 2 + 'px';
    element.querySelector('.map__pin').style.top = arr.location.y - PinSizes.HEIGHT_PIN + 'px';
    element.querySelector('img').src = arr.author.avatar;
    element.querySelector('img').alt = arr.offer.title;

    return element;
  };

  // Функция открытия карточки при нажатии по метке на карте
  var createPinsListeners = function (arr) {
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    mapPins.forEach(function (pin, index) {
      pin.addEventListener('click', function () {
        mapPins[index].classList.add('.map__pin--active');
        window.card.renderCards(arr[index]);
      });
    });
  };

  window.pin = {
    createPinsListeners: createPinsListeners,
    // Функция создания меток на карте
    renderPinList: function () {
      var map = document.querySelector('.map');
      window.map = map;
      var elementPin = map.querySelector('.map__pins');
      var fragment = document.createDocumentFragment();

      var onLoad = function (arr) {
        arr.forEach(function (pin, i) {
          if (i < MAX_PINS) {
            fragment.appendChild(pinRendering(pin));
          }
        });
        elementPin.appendChild(fragment);
        window.pin.createPinsListeners(arr);
      };
      window.backend.load(onLoad);
    },

    // Удаление меток
    removePins: function () {
      var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      mapPins.forEach(function (pin) {
        pin.remove();
      });
    }
  };

})();
