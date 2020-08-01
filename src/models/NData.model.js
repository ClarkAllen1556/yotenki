
export default class NData {
  constructor(data) {
    this.source = data.source.name
    this.title = data.title
    this.published = data.publishedAt
    this.url = data.url
    this.thumb = data.urlToImage
  }
}