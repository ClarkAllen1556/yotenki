const W_KEY = require('./key.api.json').W_KEY

const apiConfig = {
  wCurrentData: (loc) => {
    return `http://api.openweathermap.org/data/2.5/weather?zip=${loc.zip},${loc.region}&units=metric&lang=ja&appid=${W_KEY}`
  },
  wForecastData: (loc) => {
    return `http://api.openweathermap.org/data/2.5/forecast?zip=${loc.zip},${loc.region}&units=metric&lang=ja&appid=${W_KEY}`
  },
  wMap: (loc) => {
    return `https://tile.openweathermap.org/map/precipitation/${loc.z}/${loc.x}/${loc.y}.png?appid=${W_KEY}`
  },
  wIcon: (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`,
  map: (loc) => {
    return `https://{s}.tile.openstreetmap.org/${loc.z}/${loc.x}/${loc.y}.png`
  },
}

module.exports = apiConfig