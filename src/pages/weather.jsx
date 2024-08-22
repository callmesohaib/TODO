import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./weather.css";

const Weather = () => {
  const [searchValue, setSearchValue] = useState("Lahore");
  const [tempInfo, setTempInfo] = useState({});
  const [weatherState, setWeatherState] = useState("");
  const [localTime, setLocalTime] = useState(new Date().toLocaleString());

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=cdf94e9e0a5611b8b75f685131276896`
      );

      if (response.status === 200) {
        const data = await response.json();
        const { temp, humidity, pressure } = data.main;
        const { main: weatherMood } = data.weather[0];
        const { name } = data;
        const { speed } = data.wind;
        const { country, sunset } = data.sys;

        const weatherObj = {
          temp,
          humidity,
          pressure,
          weatherMood,
          name,
          speed,
          country,
          sunset,
        };
        setTempInfo(weatherObj);
        updateLocalTime();
      } else {
        toast.warn("Invalid city name. Please try again.");
        setSearchValue("");
      }
    } catch (error) {
      console.log("Error fetching weather data:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const updateLocalTime = () => {
    setInterval(() => {
      setLocalTime(new Date().toLocaleString());
    }, 1000);
  };

  useEffect(() => {
    if (tempInfo.weatherMood) {
      switch (tempInfo.weatherMood) {
        case "Clouds":
          setWeatherState("wi wi-day-cloudy");
          break;
        case "Haze":
          setWeatherState("wi wi-day-haze");
          break;
        case "Sleet":
          setWeatherState("wi wi-sleet");
          break;
        case "Clear":
          setWeatherState("wi wi-day-sunny");
          break;
        case "Mist":
          setWeatherState("wi wi-dust");
          break;
        default:
          setWeatherState("wi wi-day-sunny");
          break;
      }
    }
  }, [tempInfo.weatherMood]);

  useEffect(() => {
    handleSearch();
  }, []);

  const {
    temp,
    humidity,
    pressure,
    weatherMood,
    sunset,
    country,
    name,
    speed,
  } = tempInfo;

  let timestr = "N/A";
  if (sunset) {
    const date = new Date(sunset * 1000);
    timestr = `${date.getHours()}:${date.getMinutes()}`;
  }

  return (
    <div className="weather" id="weather">
      <div className="main-container1">
        <div className="search">
          <input
            type="search"
            name="search"
            id="search"
            required
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className="btn-search" onClick={handleSearch}>
            <i className="bx bx-search-alt-2"></i>
          </div>
        </div>
        <div className="container1">
          <i className={`${weatherState} top`}></i>
        </div>
        <div className="mid-container1">
          <div className="info">
            <span className="deg">
              {temp} <i className="wi wi-celsius"></i>
            </span>
            <span className="mood">
              {weatherMood}
              <span className="area">
                {name} , {country}
              </span>
            </span>
          </div>
          <div className="Date-Time">
            <span className="time">{localTime}</span>
          </div>
        </div>
        <div className="last-container1">
          <div className="box">
            <i className="wi wi-sunset"></i>
            <span className="min-info">
              <p>{timestr}</p>
              <p>Sunset</p>
            </span>
          </div>
          <div className="box">
            <i className="wi wi-humidity"></i>
            <span className="min-info">
              <p>{humidity}%</p>
              <p>Humidity</p>
            </span>
          </div>
          <div className="box">
            <i className="wi wi-sandstorm"></i>
            <span className="min-info">
              <p>{pressure} hPa</p>
              <p>Pressure</p>
            </span>
          </div>
          <div className="box">
            <i className="wi wi-train"></i>
            <span className="min-info">
              <p>{speed} m/s</p>
              <p>Wind Speed</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
