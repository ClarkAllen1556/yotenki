<template>
  <div id="fore-el">
    <b-row>
      <b-col>
        <b-card-group deck>
          <b-card
            class="w-card"
            v-for="(data, i) of updateForecast"
            :key="i"
            :title="data.date"
            :img-src="`http://openweathermap.org/img/wn/${data.icon}@2x.png`"
            :img-alt="data.icon"
            img-top
          >
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
      }
    },
  };
</script>

<style lang="scss" scoped>
  .card-img-top {
    max-height: 50%;
    max-width: 50%;
    align-self: center;
  }

  #fore-el {
    height: 100%;
  }

  .w-card {
    min-height: inherit;
    text-align: center;
  }
</style>