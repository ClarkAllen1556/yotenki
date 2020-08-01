
import moment from "moment"

export default class WData {
  constructor(data) {
    this.date = moment(data.dt_txt).format("YYYY-MM-DD")
    this.temp = Math.floor(data.main.temp)
    this.feels_like = Math.floor(data.main.feels_like)
    this.temp_min = Math.floor(data.main.temp_min)
    this.temp_max = Math.floor(data.main.temp_max)
    this.humidity = Math.floor(data.main.humidity)
    this.description = data.weather[0].description
    this.icon = data.weather[0].icon
  }
}