import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import nAPI from "../api/News.api"
import apiConfig from "../../api.config"
import WData from "../models/WData.model"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rawCode: 0,
    locationData: {
      prefecture: null,
      city: null,
      area: null
    },
    forecastDump: [],
    weatherDataMeta: {
      name: "",
      coord: { lat: 35, lon: 139 }
    },
    newsDump: [],
    weatherDataDump: {}
  },
  mutations: {
    updateRawCode: function (state, postalCode) {
      state.rawCode = postalCode
      Vue.$log.debug(`Update postal code`)
    },
    updateLocationData: function (state, locationData) {
      state.locationData = locationData
      Vue.$log.debug(`Update location data`)
    },
    updateWeatherDump: function (state, weatherData) {
      state.weatherDataDump = weatherData
      Vue.$log.debug(`Weather dump updated`)
    },
    updateWeatherMeta: function (state) {
      state.weatherDataMeta = new WData(state.weatherDataDump)
      state.weatherDataMeta.name = state.weatherDataDump.name
      state.weatherDataMeta.coord = state.weatherDataDump.coord

      Vue.$log.debug(`Weather data updated`)
    },
    updateNewsArticleDump: function (state, newsArticleList) {
      state.newsDump = newsArticleList
    },
    updateForecastDump: function (state, forecastData) {
      state.forecastDump = []

      /**
       * The open weather API gives its 5-day forecast in three
       * hour increments. I don't want to have to manage 40 3-hour
       * segments of weather data so I'm only storing the data
       * that aligns with 12pm on every day.
       */
      for (let i = 2; i < forecastData.list.length; i += 8)
        state.forecastDump.push(new WData(forecastData.list[i]))

      Vue.$log.debug(`Forecast dump updated`)
    }
  },
  actions: {
    updateMetaData: async function ({ commit, state }, postalCode) {
      commit('updateRawCode', postalCode)
      commit('updateLocationData', await this.dispatch('updateLocationData'))
      commit('updateWeatherDump', await this.dispatch('fetchCurrentWeatherData'))
      commit('updateWeatherMeta')
      commit('updateForecastDump', await this.dispatch('fetchForecastWeatherData'))
      commit('updateNewsArticleDump', await this.dispatch('fetchNewsArticleData'))
    },
    updateLocationData: function ({ state }) {
      const pCodeAPI = require('japan-postal-code');
      let fill = {
        prefecture: null,
        city: null,
        area: null
      }

      pCodeAPI.get(state.rawCode.replace('-', ''), function (address) {
        fill.prefecture = address.prefecture
        fill.city = address.city
        fill.area = address.area
      })

      return fill
    },
    updateWeatherMeta: function ({ commit, state }) {
      commit('updateWeatherMeta', state.weatherDataDump)
    },
    fetchNewsArticleData: function ({ state }) {
      return nAPI.fetchNewsFormated(state.locationData.prefecture)
    },
    fetchCurrentWeatherData: function ({ state }) {
      return axios.get(apiConfig.wCurrentData({ zip: state.rawCode, region: "jp" })).then(resp => {
        Vue.$log.debug(`Fetch weather data succeeded`)
        return resp.data
      }).catch(e => {
        Vue.$log.error(`Fetch weather data failed ${e}`)
        alert(`Failed to fetch weather data; please check the entered postal code.\n${e}`)
        return e
      })
    },
    fetchForecastWeatherData: function ({ state }) {
      return axios.get(apiConfig.wForecastData({ zip: state.rawCode, region: "jp" })).then(resp => {
        Vue.$log.debug(`Fetch forecast data succeeded`)
        return resp.data
      }).catch(e => {
        Vue.$log.error(`Fetch forecast data failed ${e}`)
        alert(`Failed to fetch forecast data; please check the entered postal code.\n${e}`)
        return e
      })
    }
  },
  getters: {
    getPostalCode: function (state) {
      return state.rawCode
    },
    getWeatherDataMeta: function (state) {
      return state.weatherDataMeta
    },
    getWeatherDataDump: function (state) {
      return state.weatherDataDump
    },
    getCoords: function (state) {
      return [state.weatherDataMeta.coord.lat, state.weatherDataMeta.coord.lon]
    },
    getMapWeather: function (state) {
      return apiConfig.wMap({ z: 1, x: state.weatherDataMeta.coord.lat, y: state.weatherDataMeta.coord.lon })
    },
    getMapBase: function (state) {
      return apiConfig.map({ z: 1, x: state.weatherDataMeta.coord.lat, y: state.weatherDataMeta.coord.lon })
    },
    getLocationData: function (state) {
      return {
        prefecture: state.locationData.prefecture,
        city: state.locationData.city,
        area: state.locationData.area
      }
    },
    getNewsArticles: function (state) {
      return state.newsDump
    },
    getForecastData: function (state) {
      return state.forecastDump
    }
  }
})
