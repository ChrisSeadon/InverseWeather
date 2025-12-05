export async function fetchWeatherData(lat:string,lon:string){
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const units = 'metric';
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`);
        if (response.ok){
            return await response.json();
        }
        else{
            throw new Error("Failed to fetch data from openweathermap");
        }
    }catch (error){
        console.error("Weather API error: ",error)
        throw error;
    }
}