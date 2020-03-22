'use strict';

(function () {

  var roomsNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var title = document.querySelector('#title');
  var price = document.querySelector('#price');
  var typeRoom = document.querySelector('#type');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var form = document.querySelector('.ad-form');
  window.form = form;
  var submitButton = document.querySelector('.ad-form__submit');
  var resetButton = document.querySelector('.ad-form__reset');

  // Комнаты/гости
  var onValidityRoomAndCapacity = function () {
    Array.from(capacity.options).forEach(function (item) {
      item.classList.add('hidden');
    });

    if (roomsNumber.value === '1') {
      capacity.value = '1';
      Array.from(capacity.options).forEach(function (item) {
        if (item.value === '1') {
          item.classList.remove('hidden');
        }
      });

    } else if (roomsNumber.value === '2') {
      capacity.value = '2';
      Array.from(capacity.options).forEach(function (item) {
        if (item.value === '1' || item.value === '2') {
          item.classList.remove('hidden');
        }
      });

    } else if (roomsNumber.value === '3') {
      capacity.value = '3';
      Array.from(capacity.options).forEach(function (item) {
        if (item.value !== '0') {
          item.classList.remove('hidden');
        }
      });

    } else {
      capacity.value = '0';
      Array.from(capacity.options).forEach(function (item) {
        if (item.value === '0') {
          item.classList.remove('hidden');
        }
      });
    }
  };

  // Подбор элементов при фильтровке
  roomsNumber.addEventListener('input', onValidityRoomAndCapacity);

  // Наименование
  var onValidityTitle = function () {
    if (title.value.length < 30 || title.value.length > 100) {
      title.setCustomValidity('Длина заголовка от 30 до 100 символов');
    } else {
      title.setCustomValidity('');
    }
  };

  // Цена
  var onValidityPrise = function () {
    price.addEventListener('input', function () {
      if (price.value < price.min || price.value > price.max) {
        price.classList.add('error-input');
        var inValid = false;
      } else {
        price.classList.remove('error-input');
        inValid = true;
      }
      return inValid;
    });
  };

  // Наименование/Цена
  var onValidityTypeRoom = function (type, max, min) {
    if (typeRoom.value === type) {
      price.placeholder = min;
      price.min = min;
      price.max = max;
    }
  };
  onValidityTypeRoom('flat', '5000', '1000');
  typeRoom.addEventListener('change', function () {
    onValidityTypeRoom('bungalo', '1000', '0');
    onValidityTypeRoom('palace', '100000', '10000');
    onValidityTypeRoom('flat', '5000', '1000');
    onValidityTypeRoom('house', '10000', '5000');
  });

  // Время заезда/выезда
  var onValidityTime = function (timeFirst, timeSecond) {
    timeFirst.addEventListener('change', function () {
      timeSecond.selectedIndex = timeFirst.selectedIndex;
    });
  };
  onValidityTime(timeIn, timeOut);
  onValidityTime(timeOut, timeIn);

  // Функция активации фалидации формы
  var checkValidity = function () {
    onValidityRoomAndCapacity();
    onValidityTitle();
    onValidityPrise();
    onValidityTypeRoom();
  };

  // Закрытие окна при отправке формы
  var createOnSucces = function () {
    var successPopupTemplate = document.querySelector('#success').content.querySelector('.success');
    var successPopup = successPopupTemplate.cloneNode(true);
    document.querySelector('main').appendChild(successPopup);

    document.addEventListener('click', removeSuccess);
    document.addEventListener('keydown', onRemoveEsc);

    window.map.inactivateMap();
  };

  var removeSuccess = function () {
    document.querySelector('.success').remove();
    document.removeEventListener('click', removeSuccess);
    document.removeEventListener('keydown', onRemoveEsc);
  };

  var onRemoveEsc = function (evt) {
    if (evt.keyCode === window.backend.ESC_KEYCODE) {
      removeSuccess();
    }
  };

  submitButton.addEventListener('click', checkValidity);
  resetButton.addEventListener('click', window.map.inactivateMap);
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), createOnSucces, window.backend.onError);
    evt.preventDefault();
  });
})();
