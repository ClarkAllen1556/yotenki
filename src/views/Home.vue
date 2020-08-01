<template>
  <div class="home">
    <b-row>
      <b-col id="loc-el" fluid>
        Three-day weather forcast for:
        <LocationInfo :locationData="updateLocationData" />
      </b-col>
    </b-row>
    <b-row id="forecast-row">
      <b-col>
        <Forecast :forecastData="updateForecastData"/>
      </b-col>
    </b-row>
    <b-row id="content">
      <b-col class="secondary-content">
        <b-card class="content-card">
          <WMap :coords="updateCoords" />
        </b-card>
      </b-col>
      <b-col class="secondary-content">
        <b-card class="content-card overflow-auto">
          <News :articleList="updateArts" />
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import WMap from "@/components/WMap.vue"
  import News from "@/components/News.vue"
  import Forecast from "@/components/Forecast.vue"
  import apiConfig from "../../api.config"
  import LocationInfo from "@/components/LocationInfo.vue"

  export default {
    name: "Home",
    components: {
      WMap,
      News,
      Forecast,
      LocationInfo,
    },
    methods: {
      mapWeather: function () {
        return this.$store.getters.getMapWeather
      },
      mapBase: function () {
        return this.$store.getters.getMapBase
      },
    },
    computed: {
      updateLocationData: function () {
        return this.$store.getters.getLocationData
      },
      updateCoords: function () {
        return this.$store.getters.getCoords
      },
      updateArts: function () {
        return this.$store.getters.getNewsArticles
      },
      updateForecastData: function () {
        return this.$store.getters.getForecastData
      }
    },
  };
</script>

<style lang="scss" scoped>
  @import "../styles/custom.scss";

  #forecast-row {
    min-height: 15em;
    margin-bottom: 1em;
  }

  .secondary-content {
    min-height: 25em;
  }
</style>
