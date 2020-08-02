<template>
  <div id="fore-el">
    <b-row>
      <b-col>
        <div v-if="updateForecast.length === 0">
          <template>
            <b-card>
              <b-card-body>
                <div style="margin: 1em">
                  <h4> {{ $t('labels.searchDescription') }} </h4>
                  <img :src="require('../assets/logo-sun.png')" style="height: 10em; width: 10em;"/>
                </div>
              </b-card-body>
            </b-card>
          </template>
        </div>
        <b-card-group v-else deck>
          <b-card
            class="w-card"
            v-for="(data, i) of updateForecast"
            :key="i"
            :title="data.date"
          >
            <b-img-lazy :src="`http://openweathermap.org/img/wn/${data.icon}@2x.png`" :alt="`data.icon`" style="object-fit: cover;" />
            <b-card-text>
              <h2>{{ data.description }}</h2>
              <strong>Min: {{ data.temp_min }} Max: {{ data.temp_max }}</strong>
            </b-card-text>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
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

<style lang="scss" scoped>
  .card {
    display: grid;
    align-content: center;
    min-height: 20em;
    text-align: center;
  }
</style>