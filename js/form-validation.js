'use strict';
(function () {
  var capacityElement = document.querySelector('#capacity');
  var mapFeaturesFilterElement = document.querySelector('.map__features');
  var roomNumberElement = document.querySelector('#room_number');
  var typeRoom = document.querySelector('#type');
  var inputTitle = document.querySelector('#title');
  var inputPrice = document.querySelector('#price');
  var inputAvatar = document.querySelector('#avatar');
  var picturePreview = document.querySelector('.ad-form-header__preview img');
  var timeOut = document.querySelector('#timeout');
  var timeIn = document.querySelector('#timein');
  var mapFilterElements = document.querySelectorAll('.map__filter');
  var adFormHeader = document.querySelector('.ad-form-header');
  var adFormElements = document.querySelectorAll('.ad-form__element');

  var disabledItem = function (item, status) {
    item.disabled = status;
  };

  // Активация формы
  var initForm = function (status) {

    Array.from(adFormElements).forEach(function (item) {
      disabledItem(item, status);
    });

    adFormHeader.disabled = status;

    Array.from(mapFilterElements).forEach(function (item) {
      disabledItem(item, status);
    });
    mapFeaturesFilterElement.disabled = status;
  };

  // Валидация формы
  // Комнаты/гости
  var onValidityRoomAndCapacityClick = function () {
    Array.from(capacityElement.options).forEach(function (item) {
      item.classList.add('hidden');
    });

    if (roomNumberElement.value === '1') {
      capacityElement.value = '1';
      Array.from(capacityElement.options).forEach(function (item) {
        if (item.value === '1') {
          item.classList.remove('hidden');
        }
      });

    } else if (roomNumberElement.value === '2') {
      capacityElement.value = '2';
      Array.from(capacityElement.options).forEach(function (item) {
        if (item.value === '1' || item.value === '2') {
          item.classList.remove('hidden');
        }
      });

    } else if (roomNumberElement.value === '3') {
      capacityElement.value = '3';
      Array.from(capacityElement.options).forEach(function (item) {
        if (item.value !== '0') {
          item.classList.remove('hidden');
        }
      });

    } else {
      capacityElement.value = '0';
      Array.from(capacityElement.options).forEach(function (item) {
        if (item.value === '0') {
          item.classList.remove('hidden');
        }
      });
    }
  };

  // Наименование
  var onValidityInputTitleClick = function () {
    return inputTitle.addEventListener('input', function () {
      var inValid = false;

      if (Array.from(inputTitle.value).length > 30 && Array.from(inputTitle.value).length < 100) {
        inValid = true;
        inputTitle.classList.remove('error-input');
      } else {
        inputTitle.classList.add('error-input');
      }
      return inValid;
    });
  };

  // Цена
  var onInputPriseInput = function () {
    inputPrice.addEventListener('input', function () {
      if (inputPrice.value < inputPrice.min || inputPrice.value > inputPrice.max) {
        inputPrice.classList.add('error-input');
        var inValid = false;
      } else {
        inputPrice.classList.remove('error-input');
        inValid = true;
      }
      return inValid;
    });
  };

  // Наименование/Цена
  var onValidityTypeRoomClick = function (type, max, min) {
    if (typeRoom.value === type) {
      inputPrice.placeholder = min;
      inputPrice.min = min;
      inputPrice.max = max;
    }
  };

  var choseTime = function (timeFirst, timeSecond) {
    timeFirst.addEventListener('change', function () {
      timeSecond.selectedIndex = timeFirst.selectedIndex;
    });
  };

  choseTime(timeIn, timeOut);
  choseTime(timeOut, timeIn);
  onValidityTypeRoomClick('flat', '5000', '1000');
  typeRoom.addEventListener('change', function () {
    onValidityTypeRoomClick('bungalo', '1000', '0');
    onValidityTypeRoomClick('palace', '100000', '10000');
    onValidityTypeRoomClick('flat', '5000', '1000');
    onValidityTypeRoomClick('house', '10000', '5000');
  });

  // Подбор элементов при фильтровке
  roomNumberElement.addEventListener('input', onValidityRoomAndCapacityClick);
  onValidityRoomAndCapacityClick();
  onValidityInputTitleClick();
  onInputPriseInput();
  initForm('disabled');
  inputAvatar.addEventListener('change', function () {
    window.form.addPicture(inputAvatar, picturePreview, 0);
  });

  window.validation = {
    initForm: initForm,
    disabledItem: disabledItem,
    onValidityInputTitleClick: onValidityInputTitleClick,
    onInputPriseInput: onInputPriseInput
  };
})();
