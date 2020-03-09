'use strict';

var quarters = [];
var AMOUNT_QUARTERS = 8;

var MIN_WIDTH = 0;
var MAX_WIDTH = 1200;
var MIN_HEIGHT = 130;
var MAX_HEIGHT = 630;

var PinSizes = {
  WIDTH_PIN: 50,
  HEIGHT_PIN: 70
};
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

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var elementPin = map.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin')
    .content;
var similarCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

// Переменная блока фильтрации объявлений
var mapFiltersContainer = document.querySelector('.map__filters-container');

// Функция случайного элемента
var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Функция случайного числа
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Массив создания случайных элементов
var getRandomArr = function (arr) {
  var length = getRandomInt(1, arr.length);
  var resultedArr = [];

  for (var j = 0; j < length; j++) {
    resultedArr.push(getRandomElement(arr));
  }

  return resultedArr;
};

// Цикл создания массива объявлений
for (var i = 0; i < AMOUNT_QUARTERS; i++) {
  var coordinatesX = getRandomInt(MIN_WIDTH, MAX_WIDTH);
  var coordinatesY = getRandomInt(MIN_HEIGHT, MAX_HEIGHT);

  quarters.push({
    author: {
      avatar: {
        src: 'img/avatars/user0' + (i + 1) + '.png'
      }
    },
    offer: {
      title: getRandomElement(TITLES),
      address: coordinatesX + ', ' + coordinatesY,
      price: getRandomElement(PRICE),
      type: getRandomElement(TYPES),
      rooms: getRandomElement(ROOMS),
      guests: getRandomElement(QUESTS),
      checkin: getRandomElement(TIME),
      checkout: getRandomElement(TIME),
      features: getRandomArr(FEATURES),
      description: getRandomElement(DESCRIPTIONS),
      photos: getRandomArr(PHOTOS)
    },
    location: {
      x: coordinatesX,
      y: coordinatesY
    }
  });
}

// Функция отрисовки метки
var pinRendering = function (arr) {
  var element = similarPinTemplate.cloneNode(true);

  element.querySelector('.map__pin').style.left = arr.location.x - PinSizes.WIDTH_PIN / 2 + 'px';
  element.querySelector('.map__pin').style.top = arr.location.y - PinSizes.HEIGHT_PIN + 'px';
  element.querySelector('img').src = arr.author.avatar.src;
  element.querySelector('img').alt = arr.offer.title;

  return element;
};

// Цикл создания меток на карте из массива объявлений
var fragment = document.createDocumentFragment();
for (var j = 0; j < quarters.length; j++) {
  fragment.appendChild(pinRendering(quarters[j]));
}
elementPin.appendChild(fragment);

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
var renderCards = function (cardData) {
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

  mapFiltersContainer.insertAdjacentElement('beforebegin', card);
};

renderCards(quarters[1]);
