'use strict';

(function () {

  var PINS_QUANTITY = 5;
  var offers = [];
  var mapFiltersForm = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeaturesFieldset = document.querySelector('#housing-features');

  var set = function (data) {
    offers = data;
    updatePinsList();
  };

  var reset = function () {
    housingType.value = 'any';
    housingPrice.value = 'any';
    housingRooms.value = 'any';
    housingGuests.value = 'any';
    housingFeaturesFieldset.querySelectorAll('input:checked').forEach(function (element) {
      element.checked = false;
    });
  };

  var filterType = function (item) {
    if (housingType.value !== 'any') {
      return item.offer.type === housingType.value;
    }
    return item;
  };

  var filterPrice = function (item) {
    if (housingPrice.value !== 'any') {
      if (housingPrice.value === 'low') {
        return item.offer.price < 10000;
      } else if (housingPrice.value === 'middle') {
        return (item.offer.price >= 10000 && item.offer.price <= 50000);
      } else {
        return item.offer.price > 50000;
      }
    }
    return item;
  };

  var filterRooms = function (item) {
    if (housingRooms.value !== 'any') {
      return item.offer.rooms === parseInt(housingRooms.value, 10);
    }
    return item;
  };

  var filterGuests = function (item) {
    if (housingGuests.value !== 'any') {
      return item.offer.guests === parseInt(housingGuests.value, 10);
    }
    return item;
  };

  var filterFeatures = function (item) {
    var checkedFeatures = housingFeaturesFieldset.querySelectorAll('input:checked');
    return Array.from(checkedFeatures).every(function (element) {
      return item.offer.features.includes(element.value);
    });
  };

  // Обновление меток
  var updatePinsList = function () {
    var filteredPins = offers.filter(function (item) {
      return filterType(item) && filterPrice(item) && filterRooms(item) && filterGuests(item) && filterFeatures(item);
    });

    window.pin.removeList();
    window.card.closeCard();
    window.pin.renderList(filteredPins.slice(0, PINS_QUANTITY));
  };

  mapFiltersForm.addEventListener('change', window.debounce(updatePinsList));

  window.filter = {
    set: set,
    reset: reset
  };
})();
