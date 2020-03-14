'use strict';
(function () {
  var dataLoad = [];
  var onSuccess = function (data) {
    data.forEach(function (item, i) {
      if (item.offer) {
        item.id = i;
        item.name = i;
        dataLoad.push(item);
      }
    });
    return dataLoad;
  };
  window.backend.load(onSuccess);

  window.dataLoad = {
    dataLoad: dataLoad
  };
})();
