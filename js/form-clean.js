'use strict';
(function () {
  var FILE_TYPES = ['gif', 'png', 'jpg', 'jpeg'];
  var inputAddress = document.querySelector('#address');
  var inputImage = document.querySelector('#images');
  var description = document.querySelector('#description');
  var pictureContainer = document.querySelector('.ad-form__photo');
  var blockPhoto = document.querySelector('.ad-form__photo-container');
  var fragment = document.createDocumentFragment();
  var form = document.querySelector('.ad-form');
  var mapPinMainElement = document.querySelector('.map__pin--main');

  // Очистка формы после отправки объявления
  var inputClean = function () {
    window.form.inputTitle.value = '';
    window.form.inputPrice.value = '';
    inputAddress.value = window.map.getLocation();
    description.value = '';
    description.placeholder = 'Здесь расскажите о том, какое ваше жилье замечательное и вообще';
    window.form.typeRoom.value = 'flat';
    window.form.timeIn.value = '12:00';
    window.form.roomNumberElement.value = '1';
    window.form.inputAvatar.value = '';
    window.form.picturePreview.src = 'img/muffin-grey.svg';
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
      window.backend.save(new FormData(window.form.form), function () {
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
    window.map.mapElement.appendChild(fragment);
  };

  var keydownOnSuccesClose = function (evt) {
    if (evt.keyCode === window.backend.escCode) {
      onSuccesClose();
    }
  };

  var onSuccesClose = function () {
    document.removeEventListener('keydown', keydownOnSuccesClose);
    document.querySelector('.success-close').parentNode.removeChild(document.querySelector('.success-close'));
    mapPinMainElement.addEventListener('mouseup', window.map.activateMap);
    mapPinMainElement.addEventListener('keydown', window.map.keydownActivateMap);
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
    addPicture: addPicture,
    form: document.querySelector('.ad-form'),
    inputTitle: document.querySelector('#title'),
    inputPrice: document.querySelector('#price'),
    typeRoom: document.querySelector('#type'),
    roomNumberElement: document.querySelector('#room_number'),
    timeIn: document.querySelector('#timein'),
    inputAvatar: document.querySelector('#avatar'),
    picturePreview: document.querySelector('.ad-form-header__preview img')
  };
})();
