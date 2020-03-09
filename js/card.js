'use strict';

(function () {
  var quarters = [];
  window.quarters = quarters;
  // elem - вставиться модальное окно
  var elem;
  var AMOUNT_QUARTERS = 8;
  var ESC_KEYCODE = 27;

  var MIN_WIDTH = 0;
  var MAX_WIDTH = 1200;
  var MIN_HEIGHT = 130;
  var MAX_HEIGHT = 630;
  var TITLES = [
    'Квартира',
    'Квартира-студия',
    'Небольшая квартирка',
    'Большой дом'
  ];
  var PRICE = [5000, 10000, 30000, 50000, 5000, 4000];
  var QUESTS = [1, 2, 3, 4, 5, 6, 7, 8];
  var ROOMS = [1, 2, 3, 4, 5, 6, 7, 8];
  var TYPES = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];
  var Types = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };
  var TIME = [
    '12:00',
    '13:00',
    '14:00'
  ];
  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var DESCRIPTIONS = [
    'Квартира в центре с двумя комнатами',
    'Просторная студия',
    'Уютная квартирка с видом на парк',
    'Роскошный дом с бассейном'
  ];
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var similarCardTemplate = document.querySelector('#card')
      .content
      .querySelector('.map__card');

  // Цикл создания массива объявлений
  for (var i = 0; i < AMOUNT_QUARTERS; i++) {
    var coordinatesX = window.data.getRandomInt(MIN_WIDTH, MAX_WIDTH);
    var coordinatesY = window.data.getRandomInt(MIN_HEIGHT, MAX_HEIGHT);

    quarters.push({
      author: {
        avatar: {
          src: 'img/avatars/user0' + (i + 1) + '.png'
        }
      },
      offer: {
        title: window.data.getRandomElement(TITLES),
        address: coordinatesX + ', ' + coordinatesY,
        price: window.data.getRandomElement(PRICE),
        type: window.data.getRandomElement(TYPES),
        rooms: window.data.getRandomElement(ROOMS),
        guests: window.data.getRandomElement(QUESTS),
        checkin: window.data.getRandomElement(TIME),
        checkout: window.data.getRandomElement(TIME),
        features: window.data.getRandomArr(FEATURES),
        description: window.data.getRandomElement(DESCRIPTIONS),
        photos: window.data.getRandomArr(PHOTOS)
      },
      location: {
        x: coordinatesX,
        y: coordinatesY
      }
    });
  }

  // Функция закрытия модального окна при нажатии Esc
  var onKeyEsc = function (evt) {
    if (elem && evt.keyCode === ESC_KEYCODE) {
      closeCard();
    }
  };

  // Закрытие модального окна объявления
  var closeCard = function () {
    if (elem) {
      elem.querySelector('.popup__close').removeEventListener('click', window.card.closeCard);
      document.removeEventListener('keydown', window.card.onKeyEsc);
      elem.remove();
    }
  };

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
      closeCard();

      var card = similarCardTemplate.cloneNode(true);

      card.querySelector('.popup__title').textContent = cardData.offer.title;
      card.querySelector('.popup__text--address').textContent = cardData.offer.address;
      card.querySelector('.popup__text--price').textContent = cardData.offer.price + '₽/ночь';
      card.querySelector('.popup__type').textContent = Types[cardData.offer.type.toUpperCase()];
      card.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.rooms + ' гостей';
      card.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
      card.querySelector('.popup__description').textContent = cardData.offer.description;
      card.querySelector('.popup__avatar').src = cardData.author.avatar.src;
      card.querySelector('.popup__photos').removeChild(card.querySelector('.popup__photo'));
      card.querySelector('.popup__photos').appendChild(getPhotosList(cardData.offer.photos));
      card.querySelector('.popup__features').innerHTML = '';
      card.querySelector('.popup__features').appendChild(getFeaturesList(cardData.offer.features));

      // Вставка/закрытие/окрытие модального окна
      document.querySelector('.map').insertBefore(card, document.querySelector('.map__filters-container'));
      elem = document.querySelector('.map__card');
      card.querySelector('.popup__close').addEventListener('click', closeCard);
      card.querySelector('.popup__close').addEventListener('keydown', onKeyEsc);
    }
  };
})();
