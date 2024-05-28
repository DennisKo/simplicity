export async function getForecastWeather({
  city,
  unit
}: {
  city: string
  unit: string
}) {
  console.log('Getting forecast Weather for: ', city, unit)
  const forecastResponse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}&days=4&aqi=no&alerts=no`
  )
  const forecastWeatherData = await forecastResponse.json()
  const current = {
    temp:
      unit === 'C'
        ? forecastWeatherData.current.temp_c
        : forecastWeatherData.current.temp_f,
    condition: forecastWeatherData.current.condition.text,
    conditionIcon: forecastWeatherData.current.condition.icon
  }

  const forecast = forecastWeatherData.forecast.forecastday.map(day => ({
    date: day.date,
    temp: unit === 'C' ? day.day.avgtemp_c : day.day.avgtemp_f,
    condition: day.day.condition.text,
    conditionIcon: day.day.condition.icon
  }))

  forecast.shift()

  return {
    current,
    forecast
  }
}
