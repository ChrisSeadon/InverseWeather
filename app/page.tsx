'use client'
import Image from "next/image";
import {useEffect,useState} from 'react';
import { fetchWeatherData } from '@/lib/weather-api';
import { fetchArticleSummary } from "@/lib/wikimedia-api";
import { geolocation } from '@/lib/geolocation';
import dynamic from "next/dynamic";
const Map = dynamic(() => import('./components/Map'), {ssr:false});

export default function Home() {

  const [lat,setLat] = useState<number | null>(null);
  const [lon,setLon] = useState<number | null>(null);
  const [page,setPage] = useState<any>(null);
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

  useEffect(() => {
    async function load(){
      try{
        const page = await fetchArticleSummary('Antipodes');
        setPage(page);
        console.log(page);
      }catch(error){
        console.error(error);
      }
    }
    load();
  },[]);

  if (lat == null || lon == null || weather == null || inverseWeather == null || page == null){
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        Loading... <br></br>
      </main>
      </div>
    )
  }

  if (weather.name == ""){
    weather.name = "Unknown"
  }
  if (inverseWeather.name == ""){
    inverseWeather.name = "Unknown"
  }

  const invlat = -lat;
  const invlon = 180-Math.abs(lon);

  return (
    <div className="flex min-h-screen font-sans">
      <main className="flex w-full flex-col py-32 px-16 bg-white dark:bg-black items-center">
        <h1 className="text-bold text-4xl py-4">Inverse Weather </h1>

        <div className="flex flex-row">
          <div className="flex flex-col mx-4">
            <Image src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} width={100} height={100} alt='weather icon'/>
            <span>Your Location: {weather.name}</span>
            <span>Description: {weather.weather[0].description}</span>
            <span>Temperature: {weather.main.temp}°</span>
            <span>Feels Like: {weather.main.feels_like}°</span>
            <span>Humidity: {weather.main.humidity}%</span>
            
            <Map lat={lat} lon={lon} zoom={10} ></Map>
          </div>
          <div className="flex flex-col mx-4">
            <Image src={`https://openweathermap.org/img/wn/${inverseWeather.weather[0].icon}@2x.png`} width={100} height={100} alt='weather icon'/>
            <span>Your Antipode: {inverseWeather.name}</span>
            <span>Description: {inverseWeather.weather[0].description}</span>
            <span>Temperature: {inverseWeather.main.temp}°</span>
            <span>Feels Like: {inverseWeather.main.feels_like}°</span>
            <span>Humidity: {inverseWeather.main.humidity}%</span>

            <Map lat={invlat} lon={invlon} zoom={10} ></Map>



          </div>
        </div>

      </main>
    </div>
  );
}
