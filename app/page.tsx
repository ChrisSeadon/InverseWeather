'use client'
import Image from "next/image";
import {useEffect,useState} from 'react';
import { fetchWeatherData } from '@/lib/weather-api';
import { geolocation } from '@/lib/geolocation';
import dynamic from "next/dynamic";
const Map = dynamic(() => import('./components/Map'), {ssr:false});
import WeatherDisplay from "./components/WeatherDisplay";

export default function Home() {

  const [lat,setLat] = useState<number | null>(null);
  const [lon,setLon] = useState<number | null>(null);
  const [weather,setWeather] = useState<any>(null);
  const [inverseWeather,setInverseWeather] = useState<any>(null);

  useEffect(() => {
    async function load(){
      try{
        const pos = await geolocation();
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        setLat(lat);
        setLon(lon);

        const inverseLat = -lat;
        const inverseLon = 180-Math.abs(lon);

        const w = await fetchWeatherData(lat.toString(),lon.toString());
        const w2 = await fetchWeatherData(inverseLat.toString(),inverseLon.toString());

        setWeather(w);
        setInverseWeather(w2);

      }catch (err){
        console.error(err);
      }
    }

    load();
  }, []);

  if (lat == null || lon == null || weather == null || inverseWeather == null){
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        Loading... <br></br>
      </main>
      </div>
    )
  }

  const invlat = -lat;
  const invlon = 180-Math.abs(lon);

  if (weather.name == ""){
    weather.name = `${lat.toFixed(4)}, ${lon.toFixed(4)}`
  }
  if (inverseWeather.name == ""){
    inverseWeather.name = `${invlat.toFixed(4)}, ${invlon.toFixed(4)}`
  }

  return (
    <div className="flex min-h-screen font-sans">
      <main className="flex w-full flex-col py-32 px-16 bg-white dark:bg-black items-center">
        <h1 className="text-bold text-4xl py-4">Inverse Weather </h1>

        <div className="flex flex-row">
          <div className="flex flex-col mx-4">

            <WeatherDisplay location={weather.name} description={weather.weather[0].description} temperature={weather.main.temp} feels_like={weather.main.feels_like} humidity={weather.main.humidity} icon={weather.weather[0].icon} antipode={false} ></WeatherDisplay>
            
            <Map lat={lat} lon={lon} zoom={5} ></Map>

          </div>
          <div className="flex flex-col mx-4">
            
            <WeatherDisplay location={inverseWeather.name} description={inverseWeather.weather[0].description} temperature={inverseWeather.main.temp} feels_like={inverseWeather.main.feels_like} humidity={inverseWeather.main.humidity} icon={inverseWeather.weather[0].icon} antipode={true} ></WeatherDisplay>

            <Map lat={invlat} lon={invlon} zoom={5} ></Map>

          </div>
        </div>

      </main>
    </div>
  );
}
