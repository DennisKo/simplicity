import { format } from 'date-fns'

interface WeatherProps {
  city: string
  unit: 'C' | 'F'
  weather: {
    current: {
      temp: number
      condition: string
      conditionIcon: string
    }
    forecast: {
      date: string
      temp: number
      condition: string
      conditionIcon: string
    }[]
  }
}
export const Weather = ({ city, unit, weather }: WeatherProps) => {
  return (
    <div className="border-1">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{city}</h2>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-center">
          <span className="text-6xl font-bold">{weather.current.temp}</span>
          <span className="text-4xl font-bold">
            {unit === 'C' ? '°C' : 'F'}
          </span>
        </div>
        <div>
          <span>
            <img
              src={weather.current.conditionIcon}
              alt={weather.current.condition}
            ></img>
          </span>
        </div>
      </div>
      {weather.forecast.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold">Forecast</h3>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {weather.forecast.map(day => (
              <div
                key={day.date}
                className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4"
              >
                <p className="font-bold">{format(day.date, 'eeee')}</p>
                <p>{Math.round(day.temp)}°C</p>
                <p>
                  <img src={day.conditionIcon} alt={day.condition}></img>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
