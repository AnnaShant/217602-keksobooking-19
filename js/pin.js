'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var PinSizes = {
    WIDTH_PIN: 50,
    HEIGHT_PIN: 70
  };

  var map = document.querySelector('.map');
  window.map = map;
  var elementPin = map.querySelector('.map__pins');
  var similarPinTemplate = document.querySelector('#pin')
      .content;
  var mainPin = document.querySelector('.map__pin--main');

  // Функция отрисовки метки
  var pinRendering = function (arr) {
    var element = similarPinTemplate.cloneNode(true);

    element.querySelector('.map__pin').style.display = 'none';
    element.querySelector('.map__pin').style.left = arr.location.x - PinSizes.WIDTH_PIN / 2 + 'px';
    element.querySelector('.map__pin').style.top = arr.location.y - PinSizes.HEIGHT_PIN + 'px';
    element.querySelector('img').src = arr.author.avatar.src;
    element.querySelector('img').alt = arr.offer.title;

    return element;
  };

  window.pin = {
    // Функция создания меток
    renderPinList: function () {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < window.quarters.length; i++) {
        fragment.appendChild(pinRendering(window.quarters[i]));
      }

      elementPin.appendChild(fragment);
    },

    // Функция показа меток
    showPins: function () {
      var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < mapPins.length; i++) {
        mapPins[i].style.display = 'block';
      }
    },

    // Функция отображения координат
    getAddress: function () {
      var coordinateX = mainPin.offsetLeft;
      var coordinateY = mainPin.offsetTop;
      window.mainForm.querySelector('#address').value = coordinateX + ', ' + coordinateY;
    }
  };

  window.pin.renderPinList();

  var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

  // Открытие карточки при клике на метке
  mapPins.forEach(function (pin, index) {
    pin.addEventListener('click', function () {
      mapPins[index].classList.add('.map__pin--active');
      window.renderCards(window.quarters[index]);
    });
  });

  // Событие при клике основной метки
  mainPin.addEventListener('mousedown', function () {
    window.pin.showPins();
    window.form.getPopupOpen();
  });

  // Событие при нажатии Enter на основной метке
  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.pin.showPins();
      window.form.getPopupOpen();
    }
  });
})();
