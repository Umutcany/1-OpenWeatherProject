import React, { useState } from "react";
import axios from "axios";
import "./App.css";

type WeatherType = {
  main: string;
};

type Usertype = {
  name: string;
  weather: WeatherType[];
  wind: { speed: number };
  main: { temp: number; feels_like: number; humidity: number };
};

function App() {
  const [data, setData] = useState<Usertype | null>(null);
  const [location, setLocation] = useState("");

  const fetchWeatherData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=e61114fa6d75c177534d63d90594d875`;

    try {
      const response = await axios.get(url);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchWeatherData();
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Lütfen konum giriniz..."
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data?.name}</p>
          </div>
          <div className="temp">
            {data?.main ? <h1>{data?.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data?.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data?.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data?.main ? <p>{data?.main.feels_like.toFixed()}</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data?.main ? (
                <p className="bold">{data.main.humidity.toFixed()} %</p>
              ) : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data?.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
