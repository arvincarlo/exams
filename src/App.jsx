import { useReducer } from 'react'
import './App.css'

const initialState = {
  query: "",
  notFound: false,
  windspeed: "",
  temperature: "",
  humidity: "",
  cities: []
}

const WeatherData = {
  "Manila": {
    windspeed: "12 km/h",
    temperature: "32°C",
    humidity: "75%"
  },
  "Cebu City": {
    windspeed: "10 km/h",
    temperature: "30°C",
    humidity: "80%"
  },
  "Davao City": {
    windspeed: "8 km/h",
    temperature: "31°C",
    humidity: "78%"
  },
  "Baguio": {
    windspeed: "15 km/h",
    temperature: "20°C",
    humidity: "85%"
  }
}

const CITIES = Object.keys(WeatherData);

function reducer(state, action) {
  switch (action.type) {
    case "setQuery": 
      return {
        ...state,
        query: action.payload
      }
    
    case "search": 
      if (!action.payload) return state;
      if (!CITIES.includes(action.payload)) {
        return {
          ...state,
          notFound: true
        }
      }

      return {
        query: action.payload,
        temperature: WeatherData[action.payload].temperature,
        windspeed: WeatherData[action.payload].windspeed,
        humidity: WeatherData[action.payload].humidity,
        notFound: false,
        cities: (state.cities.includes(action.payload)) ? state.cities : [...state.cities, action.payload]
      }
    default: return state;
  }
}

function App() {

  const [{query, temperature, windspeed, humidity, notFound, cities}, dispatch] = useReducer(reducer, initialState);
  console.log(cities);
  

  return (
    <>
      <div>
        <input type="text" value={query} onChange={(e) => dispatch({type: "setQuery", payload: e.target.value})}/>
        <button onClick={() => dispatch({type: "search", payload: query})}>Search</button>
        <ul>
          {cities?.map(city => <button onClick={() => dispatch({type: "search", payload: city})} key={city}>{city}</button>)}
        </ul>
      </div> 
      <div>
        <div>
          Temperature: {!notFound && temperature}
        </div>  
        <div>
          Windspeed: {!notFound && windspeed}
        </div>  
        <div>
          Humidity: {!notFound && humidity}
        </div>  
        {notFound && <div>City not found</div>}
      </div> 
    </>
  )
}

export default App
