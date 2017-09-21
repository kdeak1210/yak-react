/** A class to handle all the axios HTTP request methods */
import axios from 'axios';

export default {

  get: (url, params, callback) => {
    axios.get(url, params)
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
        const confirmation = response.data.confirmation
        if (confirmation != 'success') {
          callback({message: response.data.message}, null);
        }
        callback(null, response.data);

      }).catch((err) => {
        callback(err, null);
      });
  },

  put: () => {

  },

  delete:() => {

  }

}