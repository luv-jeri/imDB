import React, { useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const getMovies = async () => {
    const { data } = await axios.get('movies');
    console.log(data);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return <div>Home</div>;
}
