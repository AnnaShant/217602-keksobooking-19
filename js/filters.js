'use strict';

(function () {
  var ENTER_KEY = 13;
  var LEFT_MOUSE_BUTTON = 0;

  var mainForm = document.querySelector('.ad-form');
  window.mainForm = mainForm;
  var mapElement = document.querySelector('.map');
  var mainPinElement = mapElement.querySelector('.map__pin--main');
  var filterFormElements = document.querySelectorAll('.map__filters > select');
  var filterFieldset = document.querySelector('.map__filters > fieldset');
  var mainFormFieldsets = mainForm.querySelectorAll('fieldset');

  var setDisabled = function (someNode) {
    someNode.setAttribute('disabled', true);
  };

  var setDisabledAll = function (collection) {
    collection.forEach(function (el) {
      setDisabled(el);
    });
  };

  var offDisabled = function (someNode) {
    someNode.disabled = false;
  };

  var offDisabledAll = function (collection) {
    collection.forEach(function (el) {
      offDisabled(el);
    });
  };

  setDisabledAll(mainFormFieldsets);
  setDisabledAll(filterFormElements);
  setDisabled(filterFieldset);

  var setAdress = function () {
    var address = mainForm.querySelector('input[name="address"]');
    var coordinateX = mainPinElement.offsetLeft;
    var coordinateY = mainPinElement.offsetTop;

    address.value = coordinateX + ', ' + coordinateY;
  };

  var onActiveClick = function (evt) {
    if (evt.button === LEFT_MOUSE_BUTTON) {
      activeWindow();
      setAdress();
    }
  };

  var onActivePress = function (evt) {
    if (evt.keyCode === ENTER_KEY) {
      activeWindow();
    }
  };

  setAdress();

  // Активное состояние окна
  var activeWindow = function () {
    mapElement.classList.remove('map--faded');
    mainForm.classList.remove('ad-form--disabled');
    // eslint-disable-next-line no-unused-expressions
    window.pin.renderAd;
    offDisabledAll(mainFormFieldsets);
    offDisabledAll(filterFormElements);
    offDisabled(filterFieldset);
  };

  mapElement.addEventListener('mousedown', onActiveClick);
  mapElement.addEventListener('keydown', onActivePress);

  // Отправка данных формы
  var formSend = function () {
    mapElement.classList.add('hidden');
  };

  var errorHandler = function (errorMessage) {
    var similarErrorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

    var node = similarErrorTemplate.cloneNode(true);

    node.querySelector('.error__message').textContent = errorMessage;

    document.body.insertAdjacentElement('afterbegin', node);
  };

  var showError = function (errorMessage) {
    errorHandler(errorMessage);
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(mainForm), formSend, showError);
  };

  mainForm.addEventListener('submit', onFormSubmit);
})();
