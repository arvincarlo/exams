import { useReducer } from 'react'
import './App.css'

const initialState = {
  query: "",
  notFound: false
}

const WeatherData = {
  "Makati": {
    windSpeed: 10,
    temperature: 20,
    humidity: 50,
  },
  "BGC": {
    windSpeed: 20,
    temperature: 20,
    humidity: 50,
  },
  "Mandaluyong": {
    windSpeed: 30,
    temperature: 20,
    humidity: 50,
  },
}

const CITIES = Object.keys(WeatherData);

function reducer(state, action) {
  switch(action.type) {
    case "setQuery":
      return {
        ...state,
        query: action.payload
      }

    case "search": 
      if (!state.query) return state;
      if (!CITIES.includes(state.query)) {
        return {
          ...state,
          notFound: true
        }
      }
    break;

    default: 
      return state
  }
}

function App() {
  const [{query, notFound}, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <div>
        <input type="text" value={query} onChange={(e) => dispatch({type: "setQuery", payload: e.target.value})}/>
        <button onClick={() => dispatch({type: "search"})}>Search</button>
      </div> 
      <div>
        <div>
          Temperature: 
        </div>  
        <div>
          Windspeed: 
        </div>  
        <div>
          Humidity: 
        </div>  
        {notFound && <div>City not found</div>}
      </div> 
    </>
  )
}

export default App
