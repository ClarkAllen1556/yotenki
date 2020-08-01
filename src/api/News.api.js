import NewsAPI from "newsapi"
import NData from "../models/NData.model"

const N_KEY = require("../../key.api.json").N_KEY
const newsapi = new NewsAPI(N_KEY, { corsProxyUrl: 'https://cors-anywhere.herokuapp.com/' }); // https://github.com/bzarras/newsapi/pull/26

const nAPI = {
  fetchNews: function (postCode) {
    return newsapi.v2.topHeadlines({
      country: "jp",
      q: postCode
    }).then( resp => {
      console.log("resp")
      console.log(resp)
      return resp.articles
    }).catch( e => {
      console.log(N_KEY)
      console.log("e")
      console.log(e)
      return e
    })
  },
  fetchNewsFormated: function (postCode) {
    return this.fetchNews(postCode).then( respArt => {
      console.log(respArt)

      const formatedList = []
      for (const art of respArt) {
        formatedList.push(new NData(art))
      }

      return formatedList
    })
  }
}

export default nAPI