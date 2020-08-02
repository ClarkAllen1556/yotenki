import Vue from 'vue'
import Vuex from 'vuex'
import wAPI from "../api/Weather.api"
import nAPI from "../api/News.api"
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
    weatherDataDump: {},
    currentLocale: "EN",
    locales: [ "EN", "JA" ]
  },
  mutations: {
    updateRawCode: function (state, postalCode) {
      state.rawCode = postalCode
      Vue.$log.debug(`Update postal code`)
    },
    updateLocale: function (state, locale) {
      state.currentLocale = locale
      Vue.$log.debug(`Update locale`)
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
    updateLocale: function ({ commit }, locale) {
      commit('updateLocale', locale)
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
      return wAPI.fetchCurrentWeatherData(state.rawCode, state.currentLocale)
    },
    fetchForecastWeatherData: function ({ state }) {
      return wAPI.fetchForecastWeatherData(state.rawCode, state.currentLocale)
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
    },
    getLocales: function (state) {
      return state.locales
    },
    getCurrentLocale: function (state) {
      return state.currentLocale
    }
  }
})
