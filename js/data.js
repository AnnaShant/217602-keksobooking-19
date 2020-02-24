'use strict';

(function () {
  window.data = {
    // Функция рандомного числа
    getRandomInt: function (max) {
      return Math.floor(Math.random() * max);
    },

    // Функция рандомного расположения метки
    getRandomLocation: function (min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    }
  };
})();
