'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var inputImage = document.querySelector('#images');
  var blockPhoto = document.querySelector('.ad-form__photo-container');
  var pictureContainer = document.querySelector('.ad-form__photo');
  var picturePreview = document.querySelector('.ad-form-header__preview img');
  var inputAvatar = document.querySelector('#avatar');
  var fragment = document.createDocumentFragment();

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

  inputAvatar.addEventListener('change', function () {
    addPicture(inputAvatar, picturePreview, 0);
  });

  window.photo = {
    createPictures: createPictures,
  };

})();
