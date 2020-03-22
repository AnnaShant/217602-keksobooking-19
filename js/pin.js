'use strict';

(function () {

  var PinSizes = {
    WIDTH_PIN: 50,
    HEIGHT_PIN: 70
  };

  var mainPin = document.querySelector('.map__pin--main');
  window.mainPin = mainPin;
  var pinsList = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin')
      .content.querySelector('.map__pin');

  // Создание метки
  var renderPin = function (arr) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = arr.location.x - PinSizes.WIDTH_PIN / 2 + 'px';
    pinElement.style.top = arr.location.y - PinSizes.HEIGHT_PIN + 'px';
    pinElement.querySelector('img').src = arr.author.avatar;
    pinElement.querySelector('img').alt = arr.offer.title;

    // Открытие/Закрытие модального окна метки
    var openCard = function () {
      window.card.closeCard();
      document.querySelector('.map__filters-container').before(window.card.createElementCard(arr));
      pinElement.classList.add('map__pin--active');
    };

    pinElement.addEventListener('click', openCard);
    pinElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.backend.ENTER_KEYCODE) {
        openCard();
      }
    });

    return pinElement;
  };

  // Добавление меток
  var renderList = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(renderPin(arr[i]));
    }
    pinsList.appendChild(fragment);
  };

  // Удаление меток
  var removeList = function () {
    var pins = document.querySelectorAll('.map__pin');
    for (var i = 0; i < pins.length; i++) {
      pinsList.removeChild(pins[i]);
    }
    pinsList.appendChild(mainPin);
  };

  window.pin = {
    renderList: renderList,
    removeList: removeList
  };
})();
