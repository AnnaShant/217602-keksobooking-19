'use strict';

(function () {
  var MIN_PRICES = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var mainForm = document.querySelector('.ad-form');
  window.mainForm = mainForm;
  var fieldsetForm = mainForm.querySelectorAll('fieldset');
  var roomsSelect = mainForm.querySelector('#room_number');
  var capacitySelect = mainForm.querySelector('#capacity');
  var titleInput = mainForm.querySelector('#title');
  var priceInput = mainForm.querySelector('#price');
  var typeInput = mainForm.querySelector('#type');
  var timeInInput = mainForm.querySelector('#timein');
  var timeOutInput = mainForm.querySelector('#timeout');

  window.form = {
  // Добавление/удаление атрибута disabled
    setDisabledAdd: function () {
      for (var d = 0; d < fieldsetForm.length; d++) {
        fieldsetForm[d].disabled = true;
      }
    },

    setDisabledRemove: function () {
      for (var r = 0; r < fieldsetForm.length; r++) {
        fieldsetForm[r].removeAttribute('disabled');
      }
    },

    // Открытие/закрытие попапа
    getPopupOpen: function () {
      window.pin.getAddress();
      window.map.classList.remove('map--faded');
      mainForm.classList.remove('ad-form--disabled');
      window.form.setDisabledRemove();
    }
  };

  window.form.setDisabledAdd();

  // Все элементы option
  var inputCapacityOptions = capacitySelect.querySelectorAll('option');

  // Удаление option
  var inputRoomValidateNumber = function () {
    inputCapacityOptions.forEach(function (element) {
      element.remove();
    });

    switch (roomsSelect.selectedIndex) {
      case 0:
        insertInputCapacityOptions([2]);
        break;
      case 1:
        insertInputCapacityOptions([2, 1]);
        break;
      case 2:
        insertInputCapacityOptions([2, 1, 0]);
        break;
      case 3:
        insertInputCapacityOptions([3]);
        break;
    }
  };

  var inputTimeOutOptions = timeOutInput.querySelectorAll('option');

  var inputTimeInValidateOptions = function () {
    inputTimeOutOptions.forEach(function (element) {
      element.remove();
    });

    switch (timeInInput.selectedIndex) {
      case 0:
        insertInputTimeInOptions([0]);
        break;
      case 1:
        insertInputTimeInOptions([1]);
        break;
      case 2:
        insertInputTimeInOptions([2]);
        break;
    }
  };

  // Добавление элементов option
  var insertInputCapacityOptions = function (elements) {
    elements.forEach(function (element) {
      capacitySelect.appendChild(inputCapacityOptions[element]);
    });
  };
  var insertInputTimeInOptions = function (elements) {
    elements.forEach(function (element) {
      timeOutInput.appendChild(inputTimeOutOptions[element]);
    });
  };

  inputRoomValidateNumber();
  inputTimeInValidateOptions();
  roomsSelect.addEventListener('change', inputRoomValidateNumber);
  timeInInput.addEventListener('change', inputTimeInValidateOptions);

  // Валидация заголовка
  titleInput.addEventListener('invalid', function () {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Заголовок объявления должен состоять минимум из 30 символов');
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    } else {
      titleInput.setCustomValidity('');
    }
  });

  // Валидация формы стоимости
  typeInput.addEventListener('change', function (evt) {
    var priceValue = MIN_PRICES[evt.target.value];

    priceInput.setAttribute('min', priceValue);
    priceInput.setAttribute('placeholder', priceValue);
  });
  priceInput.placeholder = MIN_PRICES.flat;
})();
