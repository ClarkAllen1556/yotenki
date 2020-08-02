import NewsAPI from "newsapi"
import NData from "../models/NData.model"
import Vue from 'vue'

import { N_KEY } from "../../key.api.json"

const nAPI = {
  fetchNews: function (location) {
    const newsapi = new NewsAPI(N_KEY, { corsProxyUrl: 'https://cors-anywhere.herokuapp.com/' }); // https://github.com/bzarras/newsapi/pull/26

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