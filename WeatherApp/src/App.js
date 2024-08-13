import { useEffect, useState } from "react";
export default function App() {
  return (
    <div>
      <DisplayWeather></DisplayWeather>
    </div>
  );
}

function DisplayWeather() {
  const [latitude, setLatitude] = useState(0); //maintain latitude, longitude
  const [longitude, setLongitude] = useState(0);
  const [airQuality, setAirQuality] = useState(0);

  const [weather, setWeather] = useState({
    temp: null,
    feels_like: null,
    name: "",
    wind_speed: null,
    country: "",
    weatherType: "",
  });

  //get coordinates of the current location

  useEffect(() => {
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude: lat, longitude: long } = pos.coords;
          setLatitude(lat);
          setLongitude(long);
        },
        () => {
          alert("Please allow the location access");
          console.log("Please allow location access.");
        }
      );
    };

    getLocation();
  }, []);

  //get weather data based on coords
  useEffect(
    function () {
      if (latitude && longitude) {
        //work only when both long and lat are updated
        async function getWeatherData() {
          const data = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=eb2afa1fdab203f1c97ade85de93dd03&units=metric`
          );

          const res = await data.json();

          // console.log(res);

          const { temp, feels_like } = res.main;
          const { name } = res;
          const { speed: wind_speed } = res.wind;
          const { country } = res.sys;
          const { main: weatherType } = res.weather[0];
          console.log(weatherType);
          // console.log(temp, feels_like, wind_speed, country, name);

          //updating all the states

          setWeather({
            temp,
            feels_like,
            name,
            wind_speed,
            country,
            weatherType,
          });
          // console.log({ temp, feels_like, name, wind_speed, country });
        }
        getWeatherData();
      }
    },
    [latitude, longitude]
  );

  //sync document title with the weather
  useEffect(
    function () {
      if (weather.weatherType)
        document.title = ` WeatherApp| ${weather.weatherType}`;
      else document.title = "WeatherApp";
    },
    [weather.weatherType]
  );

  //Fetch AQI from the API request

  useEffect(
    function () {
      async function GetAQI() {
        const data = await fetch(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=eb2afa1fdab203f1c97ade85de93dd03`
        );
        const res = await data.json();

        const { aqi } = res.list[0].main;

        console.log(res);
        setAirQuality(aqi);
        console.log(airQuality);
      }
      GetAQI();
    },
    [latitude, longitude, airQuality]
  );

  const getBackgroundImage = (weatherType) => {
    console.log(weatherType.toLowerCase());
    if (!weatherType) return "url(/images/loading.jpg)";
    switch (weatherType.toLowerCase()) {
      case "clear":
        return "url(/images/clear.webp)";
      case "rain":
        return "url(/images/rainy.webp)";
      case "cloudy":
        return "url(/images/cloudy.jpg)";
      case "snow":
        return "url(/images/snow.jpg)";
      case "storm":
        return "url(/images/storm.jpg)";
      default:
        return "url(/images/default.avif)";
    }
  };

  const style = {
    backgroundImage: getBackgroundImage(weather.weatherType),
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="boxing" style={style}>
      {weather ? (
        <section>
          <h2 className="text-style">
            <span className="text-line">
              City Name: {weather.name},{weather.country}
            </span>
          </h2>
          <h4 className="text-style">
            Temperature: <span className="text-line"> {weather.temp}°C</span>
          </h4>
          <h4 className="text-style">
            Feels like:{" "}
            <span className="text-line">{weather.feels_like}°C</span>
          </h4>
          <h4 className="text-style">
            Wind speed:{" "}
            <span className="text-line"> {weather.wind_speed} Km/h</span>
          </h4>
          <h4 className="text-style">
            Weather Type:{" "}
            <span className="text-line">{weather.weatherType}</span>
          </h4>
          <h4 className="text-style">
            Air Quality: <span className="text-line">{airQuality}</span>
          </h4>
        </section>
      ) : (
        <h2>Loading weather data, please wait...🫷🫷</h2>
      )}
    </div>
  );
}
