<style>
h2 {
  text-decoration: underline;
}
</style>

![Logo](./logo.png)

# Yo' Tenki

[![Build Status](https://travis-ci.org/ClarkAllen1556/yotenki.svg?branch=master)](https://travis-ci.org/ClarkAllen1556/yotenki)

Hello and welcome to Yo' Tenki, a basic web development exercise. This site was created from the ground up by me, Allen Clark, over two-ish days. It can be used as a weather and radar, and basic news agitation site. Enter a valid Japanese postal code, hit the search button, and see the three-day forecast for the region you specified.

The map will show you the current radar for the location you specified and the news feed will show you news stories for the region's prefecture.

## Tech and Tools used to build this project

This site is written in JavaScript and is using the Vue.js framework. It was also initialized using the Vue CLI.

### Frameworks, Libraries, and API

- Bootstrap-vue
- Axios
- Moment
- leaflet
- Vuex
- Vue Router
- Vue Leaflet
- Vue logger
- Vue i18n

APIs that this site interacts with :

- japan-postal-code: for finding information about postal codes
- newsapi: API for aggregating news articles
- Open Street Map: open source/public map API
- Open Weather Map: open source/public weather forecasting API

### Continious Intergration

This project's git repository is public and can be found [here](https://github.com/ClarkAllen1556/yotenki). It also has a CI build cycle that is being handled by [Travis CI](https://travis-ci.org/github/ClarkAllen1556/yotenki).

This project is small and doesn't have many branches, but anytime a commit is pushed to the remote master a build is triggered on Travis. Once the build is completed it is deployed to the static hosting site [Surge.sh](yotenki.surge.sh).

If you have any questions, please feel free to contact me via my website, [theallenc.com](http://www.theallenc.com). Thank you!

## Links

[Personal](http://www.theallenc.com) - [Linkedin](https://www.linkedin.com/in/allenclark1556/) - [Github](https://github.com/ClarkAllen1556)