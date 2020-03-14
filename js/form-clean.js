'use strict';
(function () {
  var KEYCODE_ESC = 27;

  var FILE_TYPES = ['gif', 'png', 'jpg', 'jpeg'];
  var inputTitle = document.querySelector('#title');
  var inputPrice = document.querySelector('#price');
  var typeRoom = document.querySelector('#type');
  var roomNumberElement = document.querySelector('#room_number');
  var timeIn = document.querySelector('#timein');
  var inputAddress = document.querySelector('#address');
  var description = document.querySelector('#description');
  var fragment = document.createDocumentFragment();
  var inputAvatar = document.querySelector('#avatar');
  var picturePreview = document.querySelector('.ad-form-header__preview img');
  var inputImage = document.querySelector('#images');
  var form = document.querySelector('.ad-form');
  var pictureContainer = document.querySelector('.ad-form__photo');
  var blockPhoto = document.querySelector('.ad-form__photo-container');
  var mapElement = document.querySelector('.map');

  // Очистка формы после отправки объявления
  var inputClean = function () {
    inputTitle.value = '';
    inputPrice.value = '';
    inputAddress.value = window.map.getLocation();
    description.value = '';
    description.placeholder = 'Здесь расскажите о том, какое ваше жилье замечательное и вообще';
    typeRoom.value = 'flat';
    timeIn.value = '12:00';
    roomNumberElement.value = '1';
    inputAvatar.value = '';
    picturePreview.src = 'img/muffin-grey.svg';
    var pictureContainers = document.querySelectorAll('.ad-form__photo');
    Array.from(pictureContainers).forEach(function (item, i) {
      if (i === 0) {
        var img = item.querySelector('img');
        img.parentNode.removeChild(img);
      } else {
        item.parentNode.removeChild(item);
      }
    });
  };

  form.addEventListener('submit', function (evt) {
    var inValidForm = true;
    evt.preventDefault();

    if (window.validation.onValidityInputTitleClick() === false) {
      inValidForm = false;
    }

    if (window.validation.onInputPriseInput() === false) {
      inValidForm = false;
    }

    if (inValidForm === true) {
      window.backend.save(new FormData(form), function () {
        window.form.inputClean();
        createOnSucces();
        window.map.inactivateMap();
      });
    }
  });

  // Закрытие окна при отправке формы
  var createOnSucces = function () {
    var onSucces = document.querySelector('#success').content.querySelector('.success');
    var elementOnSucces = onSucces.cloneNode(true);
    elementOnSucces.classList.add('success-close');
    elementOnSucces.addEventListener('click', onSuccesClose);
    document.addEventListener('keydown', keydownOnSuccesClose);
    fragment.appendChild(elementOnSucces);
    mapElement.appendChild(fragment);
  };

  var keydownOnSuccesClose = function (evt) {
    if (evt.keyCode === KEYCODE_ESC) {
      onSuccesClose();
    }
  };

  var onSuccesClose = function () {
    document.removeEventListener('keydown', keydownOnSuccesClose);
    document.querySelector('.success-close').parentNode.removeChild(document.querySelector('.success-close'));
    window.map.mapPinMainElement.addEventListener('mouseup', window.map.activateMap);
    window.map.mapPinMainElement.addEventListener('keydown', window.map.keydownActivateMap);
  };

  // Добавление изображений в карточку объявления
  var createPictures = function () {
    var img = document.createElement('img');
    img.style.width = '72px';
    img.style.height = '72px';
    img.style.border = 'none';
    img.style.margin = '-1px';
    fragment.appendChild(img);
    pictureContainer.appendChild(fragment);
  };

  var addPicture = function (element, container, i) {
    var file = element.files[i];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        container.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  var clonePictures = function (i) {
    var containerImg = pictureContainer.cloneNode(true);
    var img = containerImg.querySelector('img');
    addPicture(inputImage, img, i);
    fragment.appendChild(containerImg);
    blockPhoto.appendChild(fragment);
  };

  inputImage.addEventListener('change', function () {
    if (!pictureContainer.querySelector('img').src) {
      var img = pictureContainer.querySelector('img');
      img.setAttribute('src', ' ');
      addPicture(inputImage, img, 0);
    } else {
      clonePictures(0);
    }
  });

  window.form = {
    inputClean: inputClean,
    createPictures: createPictures,
    addPicture: addPicture
  };
})();
