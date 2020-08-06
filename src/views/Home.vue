<template>
  <div class="home">
    <b-row>
      <b-col id="loc-el" fluid>
        {{ $t('labels.weatherForecast') }}
        <LocationInfo :locationData="updateLocationData" />
      </b-col>
    </b-row>
    <b-row id="forecast-row">
      <b-col>
        <Forecast :forecastData="updateForecastData" />
      </b-col>
    </b-row>
    <b-row id="content">
      <b-col fluid>
        <b-card-group deck>
          <b-card class="content-card">
            <WMap :coords="updateCoords" />
          </b-card>

          <b-card class="content-card overflow-auto">
            <News :articleList="updateArts" />
            <!-- <ForecastGraph :forecastDataList="updateForecastData" /> -->
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import WMap from "@/components/WMap.vue";
  import News from "@/components/News.vue";
  import Forecast from "@/components/Forecast.vue";
  import ForecastGraph from "@/components/ForecastGraph.vue";
  import LocationInfo from "@/components/LocationInfo.vue";

  export default {
    name: "Home",
    components: {
      WMap,
      News,
      Forecast,
      LocationInfo,
      // ForecastGraph
    },
    methods: {
    },
    computed: {
      updateLocationData: function () {
        return this.$store.getters.getLocationData;
      },
      updateCoords: function () {
        return this.$store.getters.getCoords;
      },
      updateArts: function () {
        return this.$store.getters.getNewsArticles;
      },
      updateForecastData: function () {
        return this.$store.getters.getForecastData;
      }
    },
  };
</script>

<style lang="scss" scoped>
  @import "../styles/custom.scss";

  #forecast-row {
    min-height: 20em;
    margin-bottom: 1em;
  }

  .secondary-content {
    min-height: 25em;
  }
</style>
