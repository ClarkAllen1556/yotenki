import moment from "moment"

export default class NData {
  constructor(data) {
    this.source = data.source.name
    this.title = data.title
    this.published = moment(data.publishedAt).format("YYYY-MM-DD")
    this.url = data.url
    this.thumb = data.urlToImage
  }
}