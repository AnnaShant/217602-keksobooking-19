'use strict';

(function () {

  var isPageActive = false;

  var MainPinSize = {
    HALF_WIDTH_PIN: 31, // Изображение метки 62px / 2
    HEIGHT_PIN: 62,
    TAIL_HEIGHT_PIN: 84 // Изображения метки 62px + хростик метки 22px
  };
  window.MainPinSize = MainPinSize;

  // При ограничении перемещения метки по горизонтали её острый конец должен указывать на крайнюю точку блока
  var MIN_COORD_X = 0 - MainPinSize.HALF_WIDTH_PIN;
  var MAX_COORD_X = 1200 - MainPinSize.HALF_WIDTH_PIN;
  var MIN_COORD_Y = 130;
  var MAX_COORD_Y = 630;

  // Функция переноса данных координат в поле "адрес"
  var getAddress = function () {
    if (!isPageActive) {
      var coords = {
        x: window.mainPin.offsetLeft + MainPinSize.HALF_WIDTH_PIN,
        y: window.mainPin.offsetTop + MainPinSize.HEIGHT_PIN
      };
      window.map.inputAddress.value = coords.x + ', ' + coords.y;
    } else {
      var newCoords = {
        x: window.coordinates.x + MainPinSize.HALF_WIDTH_PIN,
        y: window.coordinates.y + MainPinSize.TAIL_HEIGHT_PIN
      };
      window.map.inputAddress.value = newCoords.x + ', ' + newCoords.y;
    }
  };

  window.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };
    window.startCoords = startCoords;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var coordinates = {
        x: window.mainPin.offsetLeft - shift.x,
        y: window.mainPin.offsetTop - shift.y
      };
      window.coordinates = coordinates;

      if (coordinates.x < MIN_COORD_X) {
        coordinates.x = MIN_COORD_X;
      } else if (coordinates.x > MAX_COORD_X) {
        coordinates.x = MAX_COORD_X;
      }

      if (coordinates.y < MIN_COORD_Y) {
        coordinates.y = MIN_COORD_Y;
      } else if (coordinates.y > MAX_COORD_Y) {
        coordinates.y = MAX_COORD_Y;
      }

      window.mainPin.style.left = coordinates.x + 'px';
      window.mainPin.style.top = coordinates.y + 'px';

      getAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
