/** A class to handle all the axios HTTP request methods */
import axios from 'axios';
import superagent from 'superagent';

export default {

  get: (url, params, callback) => {
    axios.get(url, {params: params})
      .then((response) => {      
        const confirmation = response.data.confirmation;
        if (confirmation != 'success') {
          // Send our custom error message, along with null (no response)
          callback({message: response.data.message}, null);
        }
        callback(null, response.data);

      }).catch((err) => {
        callback(err, null);
      });
  },

  post: (url, body, callback) => {
    axios.post(url, body)
      .then((response) => {
        const confirmation = response.data.confirmation;
        if (confirmation != 'success') {
          callback({message: response.data.message}, null);
        }
        callback(null, response.data);

      }).catch((err) => {
        callback(err, null);
      });
  },

  put: (url, body, callback) => {
    axios.put(url, body)
      .then((response) => {
        const confirmation = response.data.confirmation;
        if (confirmation != 'success') {
          callback({message: response.data.message}, null);
        }
        callback(null, response.data);
        
      }).catch((err) => {
        callback(err, null);
      });
  },

  delete: () => {

  },

  upload: (endpoint, file, params, callback) => {
    console.log('APIManager - upload: ');

    let uploadRequest = superagent.post(endpoint);

    uploadRequest.attach('file', file);
    Object.keys(params).forEach((key) => {
      uploadRequest.field(key, params[key]);
    });

    uploadRequest.end((err, response) => {
      if (err){
        callback(err, null);
        return;
      }
      callback(null, response);
    });
  }

}