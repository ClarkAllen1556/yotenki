
export default class WData {
  constructor(data) {
    this.date = data.dt_txt
    this.temp = data.main.temp
    this.feels_like = data.main.feels_like
    this.temp_min = data.main.temp_min
    this.temp_max = data.main.temp_max
    this.humidity = data.main.humidity
    this.description = data.weather[0].description
    this.icon = data.weather[0].icon
  }
}