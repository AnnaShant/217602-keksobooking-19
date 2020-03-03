'use strict';

(function () {
  var PinData = {
    WIDTH_PIN: 50,
    HEIGHT_PIN: 70
  };

  var MAX_PINS = 5;
  var pins = [];

  var mapPinsElement = document.querySelector('.map__pins');
  var pinTemplateElement = document.querySelector('#pin').content;
  var pinElement = pinTemplateElement.querySelector('.map__pin');
  var filters = document.querySelector('.map__filters');

  var createElementPin = function (num) {
    var element = pinElement.cloneNode(true);

    element.querySelector('.map__pin').style.left = num.location.x - PinData.WIDTH_PIN / 2 + 'px';
    element.querySelector('.map__pin').style.top = num.location.y - PinData.HEIGHT_PIN + 'px';
    element.querySelector('img').src = num.author.avatar.src;
    element.querySelector('img').alt = num.offer.title;

    return element;
  };

  window.pin = {
    renderAd: function () {
      var fragment = document.createDocumentFragment();
      window.card();
      var onLoad = function (advertisments) {
        advertisments.forEach(function (pin, i) {
          if (i < MAX_PINS) {
            fragment.appendChild(createElementPin(pin));
          }
        });
        mapPinsElement.appendChild(fragment);
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

  // Отфильтровка меток
  var getFilteredPins = function () {
    var filteredPins = pins.filter(function (pin) {
      return window.filters.filterPins(pin);
    });
    return filteredPins;
  };

  // Обновление меток
  var updatePins = function () {
    window.pin.removePins();
    window.pin.renderPinList(getFilteredPins());
  };

  // Событие изменений фильтрации объявлений
  filters.addEventListener('change', function (evt) {
    if (evt.target.name !== 'features') {
      window.filters.HousingMap[evt.target.name](evt.target.value);
    }
    window.debounce(updatePins);
  });
})();
