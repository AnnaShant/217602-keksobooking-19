'use strict';

(function () {
  var HEIGHT_MAP = 630;
  var WIDTH_MAP = 1200;
  var HEIGHT_HADER = 130;

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
  window.AMOUNT_QUARTERS = AMOUNT_QUARTERS;
  var quarters = [];

  for (var i = 0; i < AMOUNT_QUARTERS; i++) {
    var objectDate = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },

      'offer': {
        'title': TITLES[window.data.getRandomInt(TYPE.length)],
        'address': location.x + ', ' + location.y,
        'price': PRICE[window.data.getRandomInt(PRICE.length)],
        'type': TYPE[window.data.getRandomInt(TYPE.length)],
        'rooms': ROOMS[window.data.getRandomInt(ROOMS.length)],
        'guests': QUESTS[window.data.getRandomInt(QUESTS.length)],
        'checkin': CHECKIN[window.data.getRandomInt(CHECKIN.length)],
        'checkout': CHECKOUT[window.data.getRandomInt(CHECKOUT.length)],
        'features': FEATURES[window.data.getRandomInt(FEATURES.length)],
        'description': DESCRIPTIONS[window.data.getRandomInt(TYPE.length)],
        'photos': PHOTOS
      },

      'location': {
        'x': window.data.getRandomInt(WIDTH_MAP),
        'y': window.data.getRandomLocation(HEIGHT_HADER, HEIGHT_MAP)
      }
    };
    quarters.push(objectDate);
  }
})();
