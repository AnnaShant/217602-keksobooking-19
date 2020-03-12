'use strict';

(function () {
  // elem - вставиться модальное окно
  var elem;
  var ESC_KEYCODE = 27;

  var Types = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };

  var similarCardTemplate = document.querySelector('#card')
      .content
      .querySelector('.map__card');

  // Функция генерации списка удобств
  var getFeaturesList = function (featureObject) {
    var fragmentFeature = document.createDocumentFragment();

    for (var f = 0; f < featureObject.length; f++) {
      var featureElementList = document.createElement('li');
      featureElementList.textContent = featureObject[f];
      featureElementList.className = 'popup__feature popup__feature--' + featureObject[f];
      fragmentFeature.appendChild(featureElementList);
    }
    return fragmentFeature;
  };

  // Функция генерации списка изображений
  var getPhotosList = function (photoObject) {
    var fragmentPhoto = document.createDocumentFragment();

    for (var p = 0; p < photoObject.length; p++) {
      var photoElement = document.createElement('img');

      photoElement.className = 'popup__photo';
      photoElement.src = photoObject[p];
      photoElement.alt = 'Фото для объявления';
      photoElement.setAttribute('width', '45');
      photoElement.setAttribute('height', '40');

      fragmentPhoto.appendChild(photoElement);
    }
    return fragmentPhoto;
  };

  // Создание модального окна объявления
  window.card = {
    renderCards: function (cardData) {
      window.card.closeCard();

      var card = similarCardTemplate.cloneNode(true);

      card.querySelector('.popup__title').textContent = cardData.offer.title;
      card.querySelector('.popup__text--address').textContent = cardData.offer.address;
      card.querySelector('.popup__text--price').textContent = cardData.offer.price + '₽/ночь';
      card.querySelector('.popup__type').textContent = Types[cardData.offer.type.toUpperCase()];
      card.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.rooms + ' гостей';
      card.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
      card.querySelector('.popup__description').textContent = cardData.offer.description;
      card.querySelector('.popup__avatar').src = cardData.author.avatar;
      card.querySelector('.popup__photos').removeChild(card.querySelector('.popup__photo'));
      card.querySelector('.popup__photos').appendChild(getPhotosList(cardData.offer.photos));
      card.querySelector('.popup__features').innerHTML = '';
      card.querySelector('.popup__features').appendChild(getFeaturesList(cardData.offer.features));

      // Вставка/закрытие/окрытие модального окна
      document.querySelector('.map').insertBefore(card, document.querySelector('.map__filters-container'));
      elem = document.querySelector('.map__card');
      card.querySelector('.popup__close').addEventListener('click', window.card.closeCard);
      card.querySelector('.popup__close').addEventListener('keydown', onKeyEsc);
    },

    // Закрытие модального окна объявления
    closeCard: function () {
      if (elem) {
        elem.querySelector('.popup__close').removeEventListener('click', window.card.closeCard);
        document.removeEventListener('keydown', onKeyEsc);
        elem.remove();
      }
    }
  };

  // Функция закрытия модального окна при нажатии Esc
  var onKeyEsc = function (evt) {
    if (elem && evt.keyCode === ESC_KEYCODE) {
      window.card.closeCard();
    }
  };
})();
