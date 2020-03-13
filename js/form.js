'use strict';

(function () {
  var MIN_PRICES = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var isPageActive = false;
  window.isPageActive = isPageActive;
  var mainForm = document.querySelector('.ad-form');
  window.mainForm = mainForm;
  var map = document.querySelector('.map');

  window.form = {
    formFieldset: document.querySelectorAll('fieldset'),
    titleInput: document.querySelector('#title'),
    priceInput: document.querySelector('#price'),
    typeInput: document.querySelector('#type'),
    timeInInput: document.querySelector('#timein'),
    timeOutInput: document.querySelector('#timeout'),
    roomsSelect: document.querySelector('#room_number'),
    capacitySelect: document.querySelector('#capacity'),
    descriptionInput: document.querySelector('#description'),

    // Добавление/удаление атрибута disabled
    setDisabledAdd: function () {
      for (var i = 0; i < window.form.formFieldset.length; i++) {
        window.form.formFieldset[i].disabled = true;
      }
    },

    setDisabledRemove: function () {
      for (var j = 0; j < window.form.formFieldset.length; j++) {
        window.form.formFieldset[j].removeAttribute('disabled');
      }
    },

    // Открытие/закрытие попапа
    getPopupOpen: function () {
      map.classList.remove('map--faded');
      mainForm.classList.remove('ad-form--disabled');
      window.form.setDisabledRemove();
    }
  };

  window.form.setDisabledAdd();

  window.map.getAddress();

  // Все элементы option
  var inputCapacityOptions = window.form.capacitySelect.querySelectorAll('option');

  // Удаление option
  var inputRoomValidateNumber = function () {
    inputCapacityOptions.forEach(function (element) {
      element.remove();
    });

    switch (window.form.roomsSelect.selectedIndex) {
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

  var inputTimeOutOptions = window.form.timeOutInput.querySelectorAll('option');

  var inputTimeInValidateOptions = function () {
    inputTimeOutOptions.forEach(function (element) {
      element.remove();
    });

    switch (window.form.timeInInput.selectedIndex) {
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
      window.form.capacitySelect.appendChild(inputCapacityOptions[element]);
    });
  };
  var insertInputTimeInOptions = function (elements) {
    elements.forEach(function (element) {
      window.form.timeOutInput.appendChild(inputTimeOutOptions[element]);
    });
  };

  inputRoomValidateNumber();
  inputTimeInValidateOptions();
  window.form.roomsSelect.addEventListener('change', inputRoomValidateNumber);
  window.form.timeInInput.addEventListener('change', inputTimeInValidateOptions);

  // Валидация заголовка
  window.form.titleInput.addEventListener('invalid', function () {
    if (window.form.titleInput.validity.tooShort) {
      window.form.titleInput.setCustomValidity('Заголовок объявления должен состоять минимум из 30 символов');
    } else if (window.form.titleInput.validity.tooLong) {
      window.form.titleInput.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
    } else if (window.form.titleInput.validity.valueMissing) {
      window.form.titleInput.setCustomValidity('Обязательное поле');
    } else {
      window.form.titleInput.setCustomValidity('');
    }
  });

  // Валидация формы стоимости
  window.form.typeInput.addEventListener('change', function (evt) {
    var priceValue = MIN_PRICES[evt.target.value];

    window.form.priceInput.setAttribute('min', priceValue);
    window.form.priceInput.setAttribute('placeholder', priceValue);
  });
  window.form.priceInput.placeholder = MIN_PRICES.flat;
})();
