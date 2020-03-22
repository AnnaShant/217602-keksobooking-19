'use strict';

(function () {

  var MainPinAddress = {
    x: 601,
    y: 437
  };

  var inputList = document.querySelectorAll('.ad-form input, ad-form select, .ad-form fieldset');
  var map = document.querySelector('.map');
  var inputAvatar = document.querySelector('#avatar');
  var picturePreview = document.querySelector('.ad-form-header__preview img');
  var inputPrice = document.querySelector('#price');
  var typeRoom = document.querySelector('#type');
  var description = document.querySelector('#description');
  var inputTitle = document.querySelector('#title');
  var timeIn = document.querySelector('#timein');
  var roomNumberElement = document.querySelector('#room_number');
  var capacityElement = document.querySelector('#capacity');
  var timeOut = document.querySelector('#timeout');

  var getMainPinAddress = function () {
    window.mainPin.style.left = MainPinAddress.x - window.MainPinSize.HALF_WIDTH_PIN + 'px';
    window.mainPin.style.top = MainPinAddress.y - window.MainPinSize.HEIGHT_PIN + 'px';

    return MainPinAddress.x + ', ' + MainPinAddress.y;
  };

  var getMainPinAddressActive = function () {
    window.mainPin.style.left = MainPinAddress.x - window.MainPinSize.HALF_WIDTH_PIN + 'px';
    window.mainPin.style.top = MainPinAddress.y - window.MainPinSize.HEIGHT_PIN + 'px';

    return MainPinAddress.x + ', ' + (MainPinAddress.y + window.MainPinSize.HALF_WIDTH_PIN);
  };

  window.map = {
    originalPinCoords: {
      'x': window.mainPin.style.left,
      'y': window.mainPin.style.top
    },

    inputAddress: document.querySelector('#address'),
    inputAddressValue: getMainPinAddress(),
    inputAddressActiveValue: getMainPinAddressActive(),

    // Возвращение карты и формы в неактивное состояние
    inactivateMap: function () {
      map.classList.add('map--faded');
      window.form.classList.add('ad-form--disabled');
      toggleInput();
      inputClean();
      window.pin.removeList();
      setOriginalCoordsToMainPin();
      window.form.reset();
      window.card.closeCard();
      window.map.inputAddress.value = window.map.inputAddressValue;
      window.mainPin.addEventListener('mousedown', activateMap);
      window.filter.reset();

      // Очистка контейнера с фотографиями
      var pictureContainers = document.querySelectorAll('.ad-form__photo');
      Array.from(pictureContainers).forEach(function (item, i) {
        if (i === 0) {
          var img = item.querySelector('img');
          img.parentNode.removeChild(img);
        } else {
          item.parentNode.removeChild(item);
        }
      });
    }
  };

  // Очистка полей формы после отправки объявления
  var inputClean = function () {
    inputPrice.placeholder = '1000';
    inputPrice.value = '';
    typeRoom.value = 'flat';
    inputTitle.value = '';
    description.value = '';
    description.placeholder = 'Здесь расскажите о том, какое ваше жилье замечательное и вообще';
    timeIn.value = '12:00';
    timeOut.value = '12:00';
    roomNumberElement.value = '1';
    capacityElement.value = '1';
    inputAvatar.value = '';
    picturePreview.src = 'img/muffin-grey.svg';
  };

  inputClean();

  // Добавление/удаление disabled
  var toggleInput = function () {
    for (var i = 0; i < inputList.length; i++) {
      inputList[i].disabled = !inputList[i].disabled;
    }
  };

  // Активация карты и формы
  var activateMap = function () {
    map.classList.remove('map--faded');
    window.form.classList.remove('ad-form--disabled');
    toggleInput();
    window.backend.load(window.filter.set, window.backend.onError);
    window.map.inputAddress.value = window.map.inputAddressActiveValue;
    window.mainPin.removeEventListener('mousedown', activateMap);
    window.photo.createPictures();
  };

  toggleInput();
  window.map.inputAddress.value = window.map.inputAddressValue;

  window.mainPin.addEventListener('mousedown', activateMap);
  window.mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.backend.ENTER_KEYCODE) {
      activateMap();
    }
  });

  // Возвращение основного пина в начальное положение
  var setOriginalCoordsToMainPin = function () {
    window.mainPin.style.left = window.map.originalPinCoords.x;
    window.mainPin.style.top = window.map.originalPinCoords.y;
  };

})();
