const { NODE_ENV } = process.env;

const pathEnv = NODE_ENV === 'production' ? '../.env' : '../.env.development';
require('dotenv').config({ path: pathEnv });

require('../database');
const User = require('../database/models/user.model');
const Movie = require('../database/models/movie.model');
const axios = require('axios');
const URLS = require('./URL.data.js');

const createUser = async () => {
  await User.create({
    name: 'Sanjay',
    email: 'xyz@gmail.com',
    password: '123',
    confirmPassword: '123',
  });

  await User.create({
    name: 'Admin',
    email: 'admin@admin.com',
    password: '123',
    confirmPassword: '123',
    role: 'admin',
  });
};

const setMovies = async () => {
  axios.defaults.baseURL = 'https://api.themoviedb.org/3';
  axios.defaults.params = {
    api_key: 'fd4dd68fd6b2055d2000ff63f1258c8b',
  };

  const promises = [];

  URLS.forEach(async (url) => {
    const promise = axios.get(url, {
      headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
    });

    promises.push(promise);
  });

  await Promise.all(promises).then(async (res) => {
    res.forEach((response) => {
      response.data.results.forEach(async (movie) => {
        const {
          original_title,
          overview,
          popularity,
          poster_path,
          release_date,
          title,
          backdrop_path,
          genres,
          adult,
        } = movie;

        await Movie.create({
          original_title,
          overview,
          popularity,
          poster_path,
          release_date,
          title,
          backdrop_path,
          genres,
          adult,
        });
      });
    });
  });
};

try {
  createUser();
  setMovies();
} catch (e) {
  console.log(e);
}
