<template>
  <div id="fore-el">
    <b-card-group deck>
        <b-card
          class="w-card"
          v-for="(data, i) of updateForecast" :key="i"
          :title="data.date"
          :img-src="`http://openweathermap.org/img/wn/${data.icon}@2x.png`"
          img-alt="Image"
          img-top
          style="text-align: center"
          >
        <b-card-text>
          <h2> {{ data.description }} </h2>
          <strong> Min: {{ data.temp_min }} Max: {{ data.temp_max }} </strong>
        </b-card-text>
      </b-card>

    </b-card-group>
  </div>
</template>

<script>
  export default {
    name: "Forecast",
    props: {
      forecastData: Array,
    },
    data() {
      return {
        forecastList: Array,
      };
    },
    computed: {
      updateForecast: function () {
        this.forecastList = this.$props.forecastData.slice(0, 3);
        return this.forecastList;
      },
    },
  };
</script>

<style>
  .w-card {
    height: 10em;
  }
</style>