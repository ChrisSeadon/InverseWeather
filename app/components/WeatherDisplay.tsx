import Image from "next/image"

interface WeatherProps{
    location : string,
    description : string,
    temperature : string,
    feels_like : string,
    humidity : string,
    icon : string,
    antipode : boolean
}

export default function WeatherDisplay(props:WeatherProps){
    var locationText = props.antipode ? "Your Antipode" : "Your Location";
    return (
        <div className="flex flex-col m-4">
            <Image src={`https://openweathermap.org/img/wn/${props.icon}@2x.png`} width={100} height={100} alt='weather icon'/>
            <span>{locationText}: {props.location}</span>
            <span>Description: {props.description}</span>
            <span>Temperature: {props.temperature}°</span>
            <span>Feels Like: {props.feels_like}°</span>
            <span>Humidity: {props.humidity}%</span>
        </div>
                    
    );
}