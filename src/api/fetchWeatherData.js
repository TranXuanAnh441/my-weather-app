const WEATHER_API_URL = 'https://api.open-meteo.com/v1'

export async function fetchWeatherData(lat, lon) {
    try {
        const response = await fetch(`${WEATHER_API_URL}/forecast?latitude=${lat}&longitude=${lon}&&daily=weather_code,precipitation_probability_mean,wind_speed_10m_max,temperature_2m_max,temperature_2m_min&&hourly=temperature_2m,weather_code,is_day`)
        return response.json();
    } catch (error) {
        console.log(error);
    }
}