import NewsAPI from "newsapi"
import NData from "../models/NData.model"
import Vue from 'vue'

const N_KEY = require("../../key.api.json").N_KEY
const newsapi = new NewsAPI(N_KEY, { corsProxyUrl: 'https://cors-anywhere.herokuapp.com/' }); // https://github.com/bzarras/newsapi/pull/26

const nAPI = {
  fetchNews: function (location) {
    return newsapi.v2.everything({
      qInTitle: `"${location}"`
    }).then( resp => {
      Vue.$log.debug(`Fetch news data succeeded`)
      return resp.articles
    }).catch( e => {
      Vue.$log.error(`Fetch news data failed ${e}`)
      alert(`Failed to fetch news data.\n${e}`)
      return e
    })
  },
  fetchNewsFormated: function (location) {
    return this.fetchNews(location).then( respArt => {
      const formatedList = []

      for (const art of respArt) {
        formatedList.push(new NData(art))
      }

      return formatedList
    })
  }
}

export default nAPI