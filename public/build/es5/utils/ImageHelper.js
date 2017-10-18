"use strict";

/**
 * A series of functions to interact with Cloudinary URLs and manip images
 */
module.exports = {

  thumbnail: function (url, dimension) {
    var thumbParams = "upload/c_thumb,h_" + dimension + ",w_" + dimension;
    return url.replace("upload", thumbParams);
  }
};