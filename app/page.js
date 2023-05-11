'use client';

import Image from 'next/image';
import axios from 'axios';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import Weather from './components/Weather';
import Spinner from './components/Spinner';

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric`;

  const fetchWeather = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.get(url).then((response) => {
      setWeather(response.data);
    });
    setCity('');
    setLoading(false);
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        {/* Overlay + BG Image*/}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[1]" />
        <Image
          src="https://images.unsplash.com/photo-1601134467661-3d775b999c8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1075&q=80"
          fill={true}
          className="object-cover"
          alt="Weather Background Image"
        />

        {/* Search Bar form*/}
        <div className="relative flex flex-col justify-between items-center max-w-[500px] w-full m-auto py-8 text-white z-10">
          <form
            onSubmit={fetchWeather}
            className="flex justify-between items-center w-full m-auto p-3 bg-transparent border
           border-gray-300 text-white rounded-2xl
           "
          >
            <div>
              <input
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                className="bg-transparent border-none text-white focus:outline-none text-2xl"
                type="text"
                placeholder="Search a City"
              />
            </div>
            <button onClick={fetchWeather}>
              <BsSearch size={22} />
            </button>
          </form>

          {/* Weather display */}
          {weather.main && <Weather data={weather} />}
        </div>
      </>
    );
  }
}
