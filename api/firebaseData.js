import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const createMovie = (movieObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/movie.json`, movieObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/movie/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const editMovie = (movieObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/movie/${movieObj.firebaseKey}.json`, movieObj)
    .then(resolve)
    .catch(reject);
});

const getMovie = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/movie.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((error) => reject(error));
});

const deleteMovie = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/movie/${firebaseKey}.json`)
    .then(() => resolve('deleted'))
    .catch((error) => reject(error));
});

const getSingleMovie = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/movie/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export {
  createMovie, editMovie, getMovie, deleteMovie, getSingleMovie,
};
