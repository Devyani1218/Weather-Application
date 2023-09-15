import "./App.css";

import { useState } from "react";
import Search from "./components/search/search";
import Currentweather from "./components/current-weather/current-weather";
import { weather_api_url, weather_key } from "./api";
import Forecast from "./components/forecast/forecast";

function App() {
     const [currentweather, setcurrentweather] = useState(null)
     const [forecast, setforecast] = useState(null)
    

  const handleonSearchchange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentweatherFetch = fetch(
      `${weather_api_url}/weather?lat=${lat}&lon=${lon}&appid=${weather_key}&units=metric`
    );
    const forecastweather = fetch(
      `${weather_api_url}/forecast?lat=${lat}&lon=${lon}&appid=${weather_key}&units=metric`
    );
   
    try{
    Promise.all([currentweatherFetch, forecastweather])
    .then(
      async (response) => {
        const weatherresponse = await response[0].json();
        const forecastresponse = await response[1].json();

        setcurrentweather({city:searchData.label,...weatherresponse})
        setforecast({city:searchData.label,...forecastresponse})
      })}
      catch(err){
        console.error(err)
      }
  }

  console.log(currentweather);
  console.log(forecast)

  return (
    <div className="container">
      <Search onSearchchange={handleonSearchchange} />
      {currentweather && <Currentweather data={currentweather} />}
      {Forecast && <Forecast data={forecast}/>}
    </div>
  );
}

export default App;
