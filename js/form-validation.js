'use strict';
(function () {
  var capacityElement = document.querySelector('#capacity');
  var timeOut = document.querySelector('#timeout');
  var mapFilterElements = document.querySelectorAll('.map__filter');
  var mapFeaturesFilterElement = document.querySelector('.map__features');
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

    if (window.form.roomNumberElement.value === '1') {
      capacityElement.value = '1';
      Array.from(capacityElement.options).forEach(function (item) {
        if (item.value === '1') {
          item.classList.remove('hidden');
        }
      });

    } else if (window.form.roomNumberElement.value === '2') {
      capacityElement.value = '2';
      Array.from(capacityElement.options).forEach(function (item) {
        if (item.value === '1' || item.value === '2') {
          item.classList.remove('hidden');
        }
      });

    } else if (window.form.roomNumberElement.value === '3') {
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
    return window.form.inputTitle.addEventListener('input', function () {
      var inValid = false;

      if (Array.from(window.form.inputTitle.value).length > 30 && Array.from(window.form.inputTitle.value).length < 100) {
        inValid = true;
        window.form.inputTitle.classList.remove('error-input');
      } else {
        window.form.inputTitle.classList.add('error-input');
      }
      return inValid;
    });
  };

  // Цена
  var onInputPriseInput = function () {
    window.form.inputPrice.addEventListener('input', function () {
      if (window.form.inputPrice.value < window.form.inputPrice.min || window.form.inputPrice.value > window.form.inputPrice.max) {
        window.form.inputPrice.classList.add('error-input');
        var inValid = false;
      } else {
        window.form.inputPrice.classList.remove('error-input');
        inValid = true;
      }
      return inValid;
    });
  };

  // Наименование/Цена
  var onValidityTypeRoomClick = function (type, max, min) {
    if (window.form.typeRoom.value === type) {
      window.form.inputPrice.placeholder = min;
      window.form.inputPrice.min = min;
      window.form.inputPrice.max = max;
    }
  };

  var choseTime = function (timeFirst, timeSecond) {
    timeFirst.addEventListener('change', function () {
      timeSecond.selectedIndex = timeFirst.selectedIndex;
    });
  };

  choseTime(window.form.timeIn, timeOut);
  choseTime(timeOut, window.form.timeIn);
  onValidityTypeRoomClick('flat', '5000', '1000');
  window.form.typeRoom.addEventListener('change', function () {
    onValidityTypeRoomClick('bungalo', '1000', '0');
    onValidityTypeRoomClick('palace', '100000', '10000');
    onValidityTypeRoomClick('flat', '5000', '1000');
    onValidityTypeRoomClick('house', '10000', '5000');
  });

  // Подбор элементов при фильтровке
  window.form.roomNumberElement.addEventListener('input', onValidityRoomAndCapacityClick);
  onValidityRoomAndCapacityClick();
  onValidityInputTitleClick();
  onInputPriseInput();
  initForm('disabled');
  window.form.inputAvatar.addEventListener('change', function () {
    window.form.addPicture(window.form.inputAvatar, window.form.picturePreview, 0);
  });

  window.validation = {
    initForm: initForm,
    disabledItem: disabledItem,
    onValidityInputTitleClick: onValidityInputTitleClick,
    onInputPriseInput: onInputPriseInput
  };
})();
