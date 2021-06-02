import NData from "../models/NData.model"
import Vue from 'vue'

import { N_KEY } from "../../key.api.json"

const nAPI = {
  fetchNews: function (location) {

    const proxyUrl = "https://cors-anywhere.herokuapp.com/"
    const url = `${proxyUrl}https://newsapi.org/v2/everything?qInTitle=${location}&apiKey=${N_KEY}`;
    const request = new Request(url);

    return fetch(request).then(resp => {
      return resp.json()
    }).catch(err => {
      Vue.$log(err);
    });
  },
  fetchNewsFormated: function (location) {
    return this.fetchNews(location).then(respArt => {
      const formatedList = []

      for (const art of respArt.articles) {
        formatedList.push(new NData(art))
      }

      return formatedList
    })
  }
}

export default nAPI