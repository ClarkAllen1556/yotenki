import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import apiConfig from "../../api.config"
import WData from "../models/WData.model"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    queriedCode: 0,
    forecastDump: [],
    weatherDataMeta: {
      name: "",
      coord: {
        lon: 0,
        lat: 0
      },
      weather: {
        desc: "",
        temp: 0,
        temp_min: 0,
        temp_max: 0,
        humidity: 0
      },
    },
    weatherDataDump: {}
  },
  mutations: {
    updateCode: function (state, postalCode) {
      state.queriedCode = postalCode
      Vue.$log.debug(`Update postal code ${state.queriedCode}`)
    },
    updateWeatherDump: function (state, weatherData) {
      state.weatherDataDump = weatherData
      Vue.$log.debug(`Weather dump updated`)
    },
    updateDataMeta: function (state, metaData) {
      state.weatherDataMeta = metaData
      Vue.$log.debug(`Weather data updated`)
    },
    updateForecastDump: function (state, forecastData) {
      console.log(forecastData)
      for(let i = 0; i < 3; i++)
        state.forecastDump.push(new WData(forecastData.data.list[i]))

      Vue.$log.debug(`Forecast dump updated`)
    }
  },
  actions: {
    updateCode: async function ({ commit, state }, postalCode) {
      commit('updateCode', postalCode)

      commit('updateWeatherDump', await this.dispatch('fetchCurrentWeatherData'))
      commit('updateForecastDump', await this.dispatch('fetchForecastWeatherData'))
    },
    updateDataMeta: function ({ commit, state }) {
      const data = {
        name: state.weatherDataDump.name,
        coord: state.weatherDataDump.coord,
        weather: state.weatherDataDump.weather[0],
        main: state.weatherDataDump.main,
        icon: state.weatherDataDump.weather[0].icon
      }

      commit('updateDataMeta', data)
    },
    fetchCurrentWeatherData: function ({ state }) {
      return axios.get(apiConfig.wCurrentData({ zip: state.queriedCode, region: "jp" })).then(resp => {
        Vue.$log.debug(`Fetch weather data succeeded`)
        return resp
      }).catch(e => {
        Vue.$log.error(`Fetch weather data failed ${e}`)
      })
    },
    fetchForecastWeatherData: function ({ state }) {
      return axios.get(apiConfig.wForecastData({ zip: state.queriedCode, region: "jp" })).then(resp => {
        Vue.$log.debug(`Fetch forecast data succeeded`)
        return resp
      }).catch(e => {
        Vue.$log.error(`Fetch forecast data failed ${e}`)
      })
    }
  },
  getters: {
    getPostalCode: function (state) {
      return state.queriedCode
    },
    getWeatherDataMeta: function (state) {
      return state.weatherDataMeta
    },
    getWeatherDataDump: function (state) {
      return state.weatherDataDump
    }
  }
})
