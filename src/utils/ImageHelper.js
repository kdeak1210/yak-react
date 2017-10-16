/**
 * A series of functions to interact with Cloudinary URLs and manip images
 */
export default {

  thumbnail: (url, dimension) => {
    let thumbParams = `upload/c_thumb,h_${dimension},w_${dimension}`;
    return url.replace('upload', thumbParams);
  }
}