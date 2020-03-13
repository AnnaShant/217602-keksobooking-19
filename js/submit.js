'use strict';

(function () {

  // ----Отправка формы----

  var formSend = function () {
    var map = document.querySelector('.map');
    map.classList.add('hidden');

    var successHandler = function () {
      var similarSuccessTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');

      var nodeSuccess = similarSuccessTemplate.cloneNode(true);

      document.body.insertAdjacentElement('afterbegin', nodeSuccess);

      // Событие клика на на произвольную область экрана
      window.addEventListener('click', function () {
        closePopup();
        similarSuccessTemplate.style = '';
      });

      // Событие нажатия клавиши Esc на произвольную область экрана
      window.addEventListener('keydown', function (evtKey) {
        if (evtKey.keyCode === window.card.ESC_KEYCODE) {
          closePopup();
          similarSuccessTemplate.style = '';
        }
      });

      // Функция удаления обработчика закрытия попапа по нажатию на Esc
      var onPopupEscPress = function (evt) {
        if (evt.keyCode === window.card.ESC_KEYCODE) {
          closePopup();
        }
      };

      // Функция закрытия попапа
      var closePopup = function () {
        nodeSuccess.classList.add('hidden');
        window.removeEventListener('keydown', onPopupEscPress);
      };
    };

    var showSuccess = function (nodeSuccess) {
      successHandler(nodeSuccess);
    };

    showSuccess();
    pageStatus();
  };

  var errorHandler = function (errorMessage) {
    var similarErrorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

    var nodeError = similarErrorTemplate.cloneNode(true);
    nodeError.querySelector('.error__message').textContent = errorMessage;

    document.body.insertAdjacentElement('afterbegin', nodeError);

    // Кнопка закрытия окна об ошибке
    var errorButton = document.querySelector('.error__button');

    // Событие клика на кнопку закрытия
    errorButton.addEventListener('click', function () {
      closePopup();
      similarErrorTemplate.style = '';
    });

    // Событие клика на на произвольную область экрана
    window.addEventListener('click', function () {
      closePopup();
      similarErrorTemplate.style = '';
    });

    // Событие нажатия клавиши Esc на произвольную область экрана
    window.addEventListener('keydown', function (evtKey) {
      if (evtKey.keyCode === window.card.ESC_KEYCODE) {
        closePopup();
        similarErrorTemplate.style = '';
      }
    });

    // Функция удаления обработчика закрытия попапа по нажатию на Esc
    var onPopupEscPress = function (evt) {
      if (evt.keyCode === window.card.ESC_KEYCODE) {
        closePopup();
      }
    };

    // Функция закрытия попапа
    var closePopup = function () {
      nodeError.classList.add('hidden');
      window.removeEventListener('keydown', onPopupEscPress);
    };
  };

  var featuresFieldset = window.mainForm.querySelectorAll('.feature__checkbox');

  var getMainPinAddress = function () {
    mainPin.style.left = MainPinAddress.x - MainPinData.HALF_WIDTH_PIN + 'px';
    mainPin.style.top = MainPinAddress.y - MainPinData.HEIGHT_PIN + 'px';

    window.mainForm.querySelector('#address').value = MainPinAddress.x + ', ' + MainPinAddress.y;
  };

  var MainPinData = {
    HALF_WIDTH_PIN: 31, // Изображение метки 62px / 2
    HEIGHT_PIN: 62,
    ALL_HEIGHT_PIN: 84 // Изображения метки 62px + хростик метки 22px
    // MainPinData.HALF_WIDTH_PIN
  };

  var MainPinAddress = {
    x: 601,
    y: 437
  };

  var isPageActive = false;

  var mainPin = document.querySelector('.map__pin--main');
  // Активное и неактивное состояния страницы
  var pageStatus = function () {
    if (!isPageActive) {
      // Открытие попапа
      window.form.getPopupOpen();
      // Отрисовка меток
      window.pin.renderPinList();

      isPageActive = true;
    } else {
    // Затемнение карты
      var map = document.querySelector('.map');
      map.classList.add('map--faded');
      // Затемнение формы
      window.mainForm.classList.add('ad-form--disabled');
      // Добавление атрибута disabled
      window.form.setDisabledAdd();
      // Удаление меток
      window.pin.removePins();
      // Скрытие объявлений
      window.card.closeCard();
      // Координаты главной метки
      getMainPinAddress();
      // Сброс фильтра
      window.filters.clearFilters();

      // Сброс данных до исходного состояния
      var syncValues = function (element, value) {
        element.value = value;
      };

      syncValues(window.form.titleInput, '');
      syncValues(window.form.typeInput, 'flat');
      syncValues(window.form.priceInput, '1000');
      syncValues(window.form.timeInInput, '12:00');
      syncValues(window.form.timeOutInput, '12:00');
      syncValues(window.form.descriptionInput, '');
      syncValues(window.form.roomsSelect, '1');
      syncValues(window.form.capacitySelect, '1');

      featuresFieldset.forEach(function (element) {
        element.checked = false;
      });

      window.map.isPageActive = false;
    }
  };

  // Функция отправки формы на сервер
  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(window.mainForm), formSend, errorHandler);

    // Скрытие объявлений
    window.card.closeCard();
  };

  window.mainForm.addEventListener('submit', onFormSubmit);

})();
