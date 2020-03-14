'use strict';
(function () {
  var cardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');
  var cardClone = cardTemplateElement.cloneNode(true);
  var fragment = document.createDocumentFragment();

  // Создание списка удобст
  var createFeatureElement = function (feature, wrapper) {
    var classElement = '.popup__feature--' + feature;
    var elementCloneFeature = cardTemplateElement.querySelector(classElement);
    var element = elementCloneFeature.cloneNode(true);
    wrapper.appendChild(element);
  };

  // Создание списка изображений
  var createPhoto = function (src, element) {
    var photo = cardTemplateElement.querySelector('.popup__photo').cloneNode(true);
    photo.src = src;
    element.querySelector('.popup__photos').appendChild(photo);
  };

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

  var createElementCard = function (cardData, i) {
    var wrapperFeature = window.card.card.querySelector('.popup__features');
    var featureElement = window.card.card.querySelectorAll('.popup__feature');
    var photoElement = window.card.card.querySelectorAll('.popup__photo');
    window.card.card.querySelector('.popup__avatar').src = cardData[i].author.avatar;
    window.card.card.querySelector('.popup__avatar').alt = cardData[i].offer.title;
    window.card.card.querySelector('.popup__text--address').textContent = cardData[i].offer.address;
    window.card.card.querySelector('.popup__title').textContent = cardData[i].offer.title;
    window.card.card.querySelector('.popup__text--price').innerHTML = cardData[i].offer.price + '₽/ночь';
    window.card.card.querySelector('.popup__type').textContent = translateType(cardData[i].offer.type);
    window.card.card.querySelector('.popup__text--capacity').textContent = cardData[i].offer.rooms + ' комнаты для ' + cardData[i].offer.guests + ' гостей';
    window.card.card.querySelector('.popup__text--time').textContent = 'Заезд после' + cardData[i].offer.checkin + ', выезд до ' + cardData[i].offer.checkout;
    window.card.card.querySelector('.popup__description').textContent = cardData[i].offer.description;
    window.card.card.setAttribute('data-name', cardData[i].name);

    Array.from(featureElement).forEach(function (item) {
      item.parentNode.removeChild(item);
    });

    cardData[i].offer.features.forEach(function (item) {
      createFeatureElement(item, wrapperFeature);
    });

    Array.from(photoElement).forEach(function (item) {
      item.parentNode.removeChild(item);
    });

    cardData[i].offer.photos.forEach(function (item) {
      createPhoto(item, window.card.card);
    });

    return window.card.card;
  };

  cardClone.classList.add('hidden');
  fragment.appendChild(cardClone);

  window.map.mapElement.appendChild(fragment);

  window.card = {
    translateType: translateType,
    createElementCard: createElementCard,
    card: document.querySelector('.map__card')
  };
})();
