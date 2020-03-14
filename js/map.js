'use strict';
(function () {
  var MainPinData = {
    PIN_MAIN_WIDTH: 65,
    PIN_MAIN_HEIGHT: 84
  };

  var MapHeight = {
    MAP_HEIGHT: 630,
    MAP_HEADER_HEIGHT: 130
  };

  var PIN_WIDTH = 50;

  var mapElement = document.querySelector('.map');
  var mapHeaderHeight = MapHeight.MAP_HEADER_HEIGHT;
  var mapHeight = MapHeight.MAP_HEIGHT;
  var mapWidth = mapElement.offsetWidth;
  var inputAddressElement = document.querySelector('#address');
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var mapPinsElement = document.querySelector('.map__pins');
  var data = window.dataLoad.dataLoad;
  var btnReset = document.querySelector('.ad-form__reset');

  var getLocation = function () {
    var locationX = +(mapPinMainElement.style.left).slice(0, -2) + MainPinData.PIN_MAIN_WIDTH / 2;
    var locationY = +(mapPinMainElement.style.top).slice(0, -2) + MainPinData.PIN_MAIN_HEIGHT;

    return Math.floor(locationX) + ', ' + Math.floor(locationY);
  };

  // Активация карты
  var activateMap = function () {
    mapPinMainElement.removeEventListener('mouseup', activateMap);
    mapPinMainElement.removeEventListener('keydown', keydownActivateMap);
    window.map.mapElement.classList.remove('map--faded');
    window.form.form.classList.remove('ad-form--disabled');
    window.form.form.classList.remove('ad-form--disabled');
    window.validation.initForm(false);
    mapPinsElement.appendChild(window.pin.createElementPin(data));
    window.pin.controlPinMap();
    window.form.createPictures();
  };

  // Возвращение в исходное состояние
  var inactivateMap = function () {
    var mapFilters = document.querySelectorAll('.map__filter');
    var checkboxFilters = document.querySelectorAll('.map__checkbox');
    var checkboxForm = document.querySelectorAll('.feature__checkbox');

    Array.from(checkboxFilters).forEach(function (item) {
      item.checked = false;
    });

    Array.from(checkboxForm).forEach(function (item) {
      item.checked = false;
    });

    Array.from(mapFilters).forEach(function (item) {
      item.value = 'any';
    });

    // Расположение основной метки по умолчанию
    window.validation.initForm('disabled');
    var pinElement = document.querySelectorAll('.pin-open-card');
    mapElement.classList.add('map--faded');
    window.form.form.classList.add('ad-form--disabled');

    mapPinMainElement.style.left = '570px';
    mapPinMainElement.style.top = '375px';

    Array.from(pinElement).forEach(function (item) {
      item.parentNode.removeChild(item);
    });
    var mapCard = document.querySelector('.map__card');
    mapCard.classList.add('hidden');
  };

  // Перемещение метки
  mapPinMainElement.addEventListener('mousedown', function (evt) {

    evt.preventDefault();
    var startCoord = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (evtMove) {
      evtMove.preventDefault();

      dragged = true;

      var shift = {
        x: startCoord.x - evtMove.clientX,
        y: startCoord.y - evtMove.clientY
      };

      startCoord = {
        x: evtMove.clientX,
        y: evtMove.clientY
      };

      var pinY = mapPinMainElement.offsetTop - shift.y;
      var pinX = mapPinMainElement.offsetLeft - shift.x;

      if (pinY >= mapHeaderHeight && pinY <= mapHeight &&
        pinX < mapWidth - PIN_WIDTH && pinX > 0) {
        mapPinMainElement.style.top = pinY + 'px';
        mapPinMainElement.style.left = pinX + 'px';
      }
    };

    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      inputAddressElement.value = getLocation();
      if (dragged) {
        var onPreventDefaultClick = function (evtClick) {
          evtClick.preventDefault();
          mapPinMainElement.removeEventListener('click', onPreventDefaultClick);
        };
        mapPinMainElement.addEventListener('click', onPreventDefaultClick);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Активация карты по ENTER
  var keydownActivateMap = function (evt) {
    if (evt.keyCode === window.map.enterCode) {
      activateMap();
    }
  };

  mapPinMainElement.addEventListener('mouseup', activateMap);
  mapPinMainElement.addEventListener('keydown', keydownActivateMap);
  btnReset.addEventListener('click', function () {
    window.form.inputClean();
    inactivateMap();
    mapPinMainElement.addEventListener('mouseup', activateMap);
    mapPinMainElement.addEventListener('keydown', keydownActivateMap);

  });

  window.map = {
    getLocation: getLocation,
    inactivateMap: inactivateMap,
    activateMap: activateMap,
    keydownActivateMap: keydownActivateMap,
    enterCode: 13,
    mapElement: document.querySelector('.map')
  };
})();
