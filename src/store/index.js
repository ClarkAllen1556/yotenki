import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import nAPI from "../api/News.api"
import apiConfig from "../../api.config"
import WData from "../models/WData.model"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    queriedCode: 0,
    postalCode: "0000000",
    forecastDump: [],
    weatherDataMeta: {
      name: "",
      coord: { lat: 0, lon: 0}
    },
    newsDump: [],
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
    updateDataMeta: function (state) {
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
    updateCode: async function ({ commit, state }, postalCode) {
      commit('updateCode', postalCode)
      commit('updateWeatherDump', await this.dispatch('fetchCurrentWeatherData'))
      commit('updateDataMeta')
      commit('updateForecastDump', await this.dispatch('fetchForecastWeatherData'))
      commit('updateNewsArticleDump', await this.dispatch('fetchNewsArticleData'))
    },
    updateDataMeta: function ({ commit, state }) {
      commit('updateDataMeta', state.weatherDataDump)
    },
    fetchNewsArticleData: function ({ state }) {
      return nAPI.fetchNewsFormated(state.queriedCode.slice('-')[0])
    },
    fetchCurrentWeatherData: function ({ state }) {
      return axios.get(apiConfig.wCurrentData({ zip: state.queriedCode, region: "jp" })).then(resp => {
        Vue.$log.debug(`Fetch weather data succeeded`)
        return resp.data
      }).catch(e => {
        Vue.$log.error(`Fetch weather data failed ${e}`)
      })
    },
    fetchForecastWeatherData: function ({ state }) {
      return axios.get(apiConfig.wForecastData({ zip: state.queriedCode, region: "jp" })).then(resp => {
        Vue.$log.debug(`Fetch forecast data succeeded`)
        return resp.data
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
    },
    getCoordLat: function (state) {
      return state.weatherDataMeta.coord.lat
    },
    getCoordLon: function (state) {
      return state.weatherDataMeta.coord.lon
    },
    getMapWeather: function (state) {
      return apiConfig.wMap({ z: 1, x: state.weatherDataMeta.coord.lat, y: state.weatherDataMeta.coord.lon })
    },
    getMapBase: function (state) {
      return apiConfig.map({ z: 1, x: state.weatherDataMeta.coord.lat, y: state.weatherDataMeta.coord.lon })
    }
  }
})
