'use strict';

(function () {
  window.data = {
    // Функция случайного элемента
    getRandomElement: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },

    // Функция случайного числа
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Массив создания случайных элементов
    getRandomArr: function (arr) {
      var length = window.data.getRandomInt(1, arr.length);
      var resultedArr = [];

      for (var j = 0; j < length; j++) {
        resultedArr.push(window.data.getRandomElement(arr));
      }

      return resultedArr;
    }
  };
})();
