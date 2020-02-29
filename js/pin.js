'use strict';

(function () {
  var PinData = {
    WIDTH_PIN: 50,
    HEIGHT_PIN: 70
  };

  var mapPinsElement = document.querySelector('.map__pins');
  var pinTemplateElement = document.querySelector('#pin').content;
  var pinElement = pinTemplateElement.querySelector('.map__pin');

  var createElementPin = function (num) {
    var element = pinElement.cloneNode(true);

    element.querySelector('.map__pin').style.left = num.location.x - PinData.WIDTH_PIN / 2 + 'px';
    element.querySelector('.map__pin').style.top = num.location.y - PinData.HEIGHT_PIN + 'px';
    element.querySelector('img').src = num.author.avatar.src;
    element.querySelector('img').alt = num.offer.title;

    return element;
  };

  window.pin = {
    renderAd: function () {
      var fragment = document.createDocumentFragment();
      window.card();
      var onLoad = function (advertisments) {
        advertisments.forEach(function (pin) {
          fragment.appendChild(createElementPin(pin));
        });
        mapPinsElement.appendChild(fragment);
      };
      window.backend.load(onLoad);
    }
  };
})();
