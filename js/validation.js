'use strict';

(function () {
  var roomsSelect = window.mainForm.querySelector('#room_number');
  var capacitySelect = window.mainForm.querySelector('#capacity');

  // Сравнение количества комнат с количеством гостей
  function compareRoomsAndGuests() {
    var msg = '';
    var roomsNumber = parseInt(roomsSelect.value, 10);
    var guestsNumber = parseInt(capacitySelect.value, 10);

    switch (roomsNumber) {
      case 1:
        if (guestsNumber !== 1) {
          msg = 'Комната для одного гостя';
        }
        break;
      case 2:
        if (guestsNumber !== 1 && guestsNumber !== 2) {
          msg = 'Комнаты для одного/двух гостей';
        }
        break;
      case 3:
        if (guestsNumber !== 1 && guestsNumber !== 2 && guestsNumber !== 3) {
          msg = 'Комнаты для одного/двух/трех гостей';
        }
        break;
      case 100:
        if (guestsNumber !== 0) {
          msg = 'Комнаты не для гостей';
        }
        break;
    }

    capacitySelect.setCustomValidity(msg);
  }

  var onSelectChange = function () {
    compareRoomsAndGuests();
  };

  roomsSelect.addEventListener('change', onSelectChange);
  capacitySelect.addEventListener('change', onSelectChange);
})();
