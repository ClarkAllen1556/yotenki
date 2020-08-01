const KEY = `a243fbc125c986c3dd41cc3ae886796d`

const apiConfig = {
  wCurrentData: (loc) => {
    console.log(`http://api.openweathermap.org/data/2.5/weather?zip=${loc.zip},${loc.region}&units=metric&appid=${KEY}`)
    return `http://api.openweathermap.org/data/2.5/weather?zip=${loc.zip},${loc.region}&units=metric&appid=${KEY}`
  },
  wForecastData: (loc) => {
    console.log(`http://api.openweathermap.org/data/2.5/forecast?zip=${loc.zip},${loc.region}&units=metric&appid=${KEY}`)
    return `http://api.openweathermap.org/data/2.5/forecast?zip=${loc.zip},${loc.region}&units=metric&appid=${KEY}`
  },
  wMap: (loc) => {
    console.log(`https://tile.openweathermap.org/map/precipitation/${loc.z}/${loc.x}/${loc.y}.png?appid=${KEY}`)
    return `https://tile.openweathermap.org/map/precipitation/${loc.z}/${loc.x}/${loc.y}.png?appid=${KEY}`
  },
  wIcon: (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`,
  map: (loc) => {
    console.log(`https://tile.openstreetmap.org/${loc.z}/${loc.x}/${loc.y}.png`)
    return `https://{s}.tile.openstreetmap.org/${loc.z}/${loc.x}/${loc.y}.png`
  },
}

export default apiConfig