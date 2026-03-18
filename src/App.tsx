import { useState, useEffect } from 'react'
import axios from 'axios'
import NavBar from './components/NavBar'


const App = () => {

    interface CityData {
        name: string,
        country: string,
        latitude: number,
        longitude: number,
    }

    interface GeocodingResponse {
        results?: CityData[]
    }

    interface WeatherResponse {
        current: CurrentWeather
    }

    interface CurrentWeather {
        temperature_2m: number;
        wind_speed_10m: number;
        weather_code: number;
    }

    interface WeatherData {
        city: string,
        country: string,
        temperature: number,
        windSpeed: number,
        weather_code: number,
    }

    const [city, setCity] = useState<string>('')
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchData(city);
    };

    const fetchData = async (city: string) => {
        setLoading(true)
        try {
            const getGeocode = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`)
            const data: GeocodingResponse = getGeocode.data
            if (!data.results || data.results.length < 1) {
                setError('City was not found')
                return
            }
            const latitude = data.results[0].latitude
            const longitude = data.results[0].longitude

            const getWeather = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code&timezone=auto`)

            const weatherData: WeatherResponse = await getWeather.data

            setWeatherData({
                city: data.results[0].name,
                country: data.results[0].country,
                temperature: weatherData.current.temperature_2m,
                windSpeed: weatherData.current.wind_speed_10m,
                weather_code: weatherData.current.weather_code
            })

        }
        catch (err: any) {
            setError(err.message)
        }
        finally {
            setLoading(false)
        }
    }


    if (loading) return <h1>Loading....</h1>


    return (
        <>
            <h1>Weather App </h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="" required onChange={e => setCity(e.target.value)} />
                <button>Search</button>
            </form>
            {!error && !loading && weatherData && (
                <>
                    <ul>
                        <li>City : {weatherData?.city} </li>
                        <li>Country : {weatherData?.country} </li>
                        <li>Temperature : {weatherData?.temperature} </li>
                        <li>Wind speed : {weatherData?.windSpeed} </li>
                        <li>Weather code : {weatherData?.weather_code}</li>
                    </ul>
                </>
            )}
            {error && <p>{error}</p>}
        </>
    )
}


export default App