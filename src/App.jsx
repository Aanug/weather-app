import React, { useState } from 'react'
import axios from 'axios'
import { atom, RecoilRoot, useRecoilState } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()
const counterState = atom({
  key: 'data',
  default: {},
effects_UNSTABLE: [persistAtom],
})
const API_KEY = import.meta.env.VITE_API_KEY
function App() {
  const [data, setData] = useRecoilState(counterState)
  // const [data, setData] = useState({})
  const [location, setLocation] = useState("")
  const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
  const searchLocation =(e)=>{
    if (e.key=="Enter") {
      axios.get(url)
    .then((response)=>{
      setData(response.data)
      console.log(response.data)}
      )
      setLocation("")
    }
       
    }
  return (
    <div className="App">
       <div className='search'>
        {/* <img className="search icon" src='./assets/search icon.png'></img> */}
        <input
        placeholder="Search" 
        value={location}
        onKeyPress={searchLocation}
        type="text" 
         onChange={e => setLocation(e.target.value)}
        />
       </div>
 <div className="container">
    <div className="top"> 
    <div className ="location"><p>{data.name}</p></div>
    {data.main ? <h1>{data.main.temp.toFixed()}&#8451;</h1>:null}
    {/* <div className="temp"><h1>{data.main.temp}</h1></div> */}
    {data.main ? <h1>{data.weather[0].main}</h1>:null}
    {/* <div className="description"><p>{data.weather[0].main}</p></div> */}
    </div>
    <div className="bottom">
      <div className="content">
      <div className="feels"></div>
      <div className="temps">{data.main ? <h1>{data.main.pressure}mmHg </h1>:null}
      <p>Pressure</p>
      </div>
      <div className="humidity"></div>
      <div className="humid">{data.main ? <h1>{data.main.humidity}&#8451;</h1> :null}
      <p>Humidity</p>
      </div>
      <div className="speed"></div>
      <div className="wind">{data.wind ? <h1>{data.wind.speed.toFixed()}MPH </h1>:null}
      <p>Wind Speed</p>
      </div>
      </div>
      
    </div>
    </div>
    </div>
   
  )
}

export default App