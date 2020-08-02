import Vue from 'vue'
import axios from 'axios'

import { W_KEY } from "../../key.api.json"

const wAPI = {
  uri: {
    wCurrentData: (postalCode, locale) => {
      return `https://api.openweathermap.org/data/2.5/weather?zip=${postalCode},jp&units=metric&lang=${locale}&appid=${W_KEY}`
    },
    wForecastData: (postalCode, locale) => {
      return `https://api.openweathermap.org/data/2.5/forecast?zip=${postalCode},jp&units=metric&lang=${locale}&appid=${W_KEY}`
    }
  },
  fetchCurrentWeatherData: function (postalCode, locale) {
    return axios.get(this.uri.wCurrentData(postalCode, locale)).then(resp => {
      Vue.$log.debug(`Fetch weather data succeeded`)
      return resp.data
    }).catch(e => {
      Vue.$log.error(`Fetch weather data failed ${e}`)
      alert(`Failed to fetch weather data; please check the entered postal code.\n${e}`)
      return e
    })
  },
  fetchForecastWeatherData: function (postalCode, locale) {
    return axios.get(this.uri.wForecastData(postalCode, locale)).then(resp => {
      Vue.$log.debug(`Fetch forecast data succeeded`)
      return resp.data
    }).catch(e => {
      Vue.$log.error(`Fetch forecast data failed ${e}`)
      alert(`Failed to fetch forecast data; please check the entered postal code.\n${e}`)
      return e
    })
  }
}

export default wAPI