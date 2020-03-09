'use strict';

(function () {
  var PinSizes = {
    WIDTH_PIN: 50,
    HEIGHT_PIN: 70
  };

  var similarPinTemplate = document.querySelector('#pin')
      .content;

  // Функция отрисовки метки
  var pinRendering = function (arr) {
    var element = similarPinTemplate.cloneNode(true);

    element.querySelector('.map__pin').style.left = arr.location.x - PinSizes.WIDTH_PIN / 2 + 'px';
    element.querySelector('.map__pin').style.top = arr.location.y - PinSizes.HEIGHT_PIN + 'px';
    element.querySelector('img').src = arr.author.avatar.src;
    element.querySelector('img').alt = arr.offer.title;

    return element;
  };

  window.pin = {
    // Функция создания меток на карте (по длине массива advertisments)
    renderPinList: function () {
      // Элемент куда будут вставлены метки
      var map = document.querySelector('.map');
      window.map = map;
      var elementPin = map.querySelector('.map__pins');
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < window.quarters.length; i++) {
        fragment.appendChild(pinRendering(window.quarters[i]));
      }

      elementPin.appendChild(fragment);
    },

    // Функция открытия карточки при нажатии по метке на карте
    createPinsListeners: function () {
      var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

      mapPins.forEach(function (pin, index) {
        pin.addEventListener('click', function () {
          mapPins[index].classList.add('.map__pin--active');
          window.card.renderCards(window.quarters[index]);
        });
      });
    }
  };
})();
