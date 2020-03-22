'use strict';

(function () {
  var cardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  // Возврат названий
  var translateType = function (type) {
    var typeRoom = {
      'house': 'Дом',
      'flat': 'Квартира',
      'palace': 'Дворец',
      'bungalo': 'Бунгало'
    };
    var nameType = typeRoom[type];
    return nameType;
  };

  // Создание модального окна объявления
  var createElementCard = function (cardData) {
    var card = cardTemplateElement.cloneNode(true);
    var imgFragment = document.createDocumentFragment();
    var featureElement = card.querySelectorAll('.popup__feature');
    var photo = card.querySelector('.popup__photo');
    var popupClose = card.querySelector('.popup__close');

    card.querySelector('.popup__title').textContent = cardData.offer.title;
    card.querySelector('.popup__text--address').textContent = cardData.offer.address;
    card.querySelector('.popup__text--price').textContent = cardData.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = translateType(cardData.offer.type).ru;
    card.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
    card.querySelector('.popup__description').textContent = cardData.offer.description;
    card.querySelector('.popup__avatar').src = cardData.author.avatar;
    card.querySelector('.popup__photos').replaceChild(imgFragment, card.querySelector('.popup__photo'));

    // Создание списка удобст
    for (var i = 0; i < FEATURES.length; i++) {
      if (cardData.offer.features.indexOf(FEATURES[i]) === -1) {
        featureElement[i].style.display = 'none';
      }
    }

    // Создание списка изображений
    for (var j = 0; j < cardData.offer.photos.length; j++) {
      var photoElement = photo.cloneNode(true);
      photoElement.src = cardData.offer.photos[j];
      imgFragment.appendChild(photoElement);
    }

    popupClose.addEventListener('click', window.card.closeCard);
    document.addEventListener('keydown', window.card.onKeyEsc);

    return card;
  };

  // Закрытие модального окна объявления
  var closeCard = function () {
    var popup = document.querySelector('.map__card');
    if (popup !== null) {
      popup.remove();
    }
    document.removeEventListener('keydown', window.card.onKeyEsc);
    var activePin = document.querySelector('.map__pin--active');
    if (activePin !== null) {
      activePin.classList.remove('map__pin--active');
    }
  };

  // Закрытие модального окна объявления по ESC
  var onKeyEsc = function (evt) {
    if (evt.keyCode === window.backend.ESC_KEYCODE) {
      window.card.closeCard();
    }
  };

  // Закрытие модального окна объявления по ENTER
  var onKeyEnter = function (evt) {
    if (evt.keyCode === window.backend.ENTER_KEYCODE) {
      window.card.closeCard();
    }
  };

  window.card = {
    translateType: translateType,
    createElementCard: createElementCard,
    onKeyEsc: onKeyEsc,
    onKeyEnter: onKeyEnter,
    closeCard: closeCard
  };

})();
