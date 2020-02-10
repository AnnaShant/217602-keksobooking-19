'use strict';

var HEIGHT_MAP = 630;
var WIDTH_MAP = 1200;
var HEIGHT_HADER = 130;
var WIDTH_PIN = 50;
var HEIGHT_PIN = 70;

var TITLES = [
  'Квартира',
  'Квартира-студия',
  'Небольшая квартирка',
  'Большой дом'
];
var PRICE = [5000, 10000, 30000, 50000];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var QUESTS = [1, 2, 3, 4];
var ROOMS = [1, 2, 3, 4];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['13:00', '14:00', '12:00'];
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

var AMOUNT_QUARTERS = 8;
var quarters = [];

var mapElement = document.querySelector('.map');
var pinTemplateElement = document.querySelector('#pin').content;
var pinElement = pinTemplateElement.querySelector('.map__pin');
var mapPinsElement = document.querySelector('.map__pins');

// Функция рандомного числа
var getRandomInt = function (max) {
  return Math.floor(Math.random() * max);
};

// Функция рандомного расположения метки
var getRandomLocation = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var createElementPin = function (num) {
  var element = pinElement.cloneNode(true);
  var imgElement = element.querySelector('img');

  element.style.top = quarters[num].location.y - HEIGHT_PIN + 'px';
  element.style.left = quarters[num].location.x - WIDTH_PIN / 2 + 'px';

  imgElement.src = quarters[num].author.avatar;
  imgElement.alt = quarters[num].offer.title;

  return element;
};

var createDateForRooms = function () {
  for (var i = 0; i < AMOUNT_QUARTERS; i++) {
    var objectDate = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },

      'offer': {
        'title': TITLES[getRandomInt(TYPE.length)],
        'address': location.x + ', ' + location.y,
        'price': PRICE[getRandomInt(PRICE.length)],
        'type': TYPE[getRandomInt(TYPE.length)],
        'rooms': ROOMS[getRandomInt(ROOMS.length)],
        'guests': QUESTS[getRandomInt(QUESTS.length)],
        'checkin': CHECKIN[getRandomInt(CHECKIN.length)],
        'checkout': CHECKOUT[getRandomInt(CHECKOUT.length)],
        'features': FEATURES[getRandomInt(FEATURES.length)],
        'description': DESCRIPTIONS[getRandomInt(TYPE.length)],
        'photos': PHOTOS
      },

      'location': {
        'x': getRandomInt(WIDTH_MAP),
        'y': getRandomLocation(HEIGHT_HADER, HEIGHT_MAP)
      }
    };
    quarters.push(objectDate);
  }
};

var fragment = document.createDocumentFragment();
createDateForRooms();
for (var j = 0; j < AMOUNT_QUARTERS; j++) {
  fragment.appendChild(createElementPin(j));
}
mapPinsElement.appendChild(fragment);
mapElement.classList.remove('map--faded');
