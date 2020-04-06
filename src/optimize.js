"use strict";

/* eslint-disable */
const imagemin = require('imagemin');
const imageminJpegoptim = require('imagemin-jpegoptim');
const imageminPngquant = require('imagemin-pngquant');

module.exports = {

  optimize (path, destination) {
    return imagemin(path, {
      destination: destination,
      plugins: [
        imageminJpegoptim({max: 79}),
        imageminPngquant({quality: [0.78, 0.79]})
      ]
    });
  }

}
