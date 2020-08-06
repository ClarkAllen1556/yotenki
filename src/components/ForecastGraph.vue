<template>
  <div id="data-graphs">
    <b-card-header style="padding: 1em;">
      <b-icon-graph-up />
      {{ $t('labels.forecastCount') + forecastData.length}}
    </b-card-header>
    <b-row v-if="updateForecastData.length === 0" no-gutters>
      <b-col class="text-center">
        <template>
          <div style="padding: 1em;">
            <h4>{{ $t('labels.forecastContainerBlank')}}</h4>
            <div style="font-size: 4rem;">
              <b-icon-graph-up class="rounded p-2" />
            </div>
          </div>
        </template>
      </b-col>
    </b-row>
    <div v-else>
      <template>
        <D3LineChart :config="chart_config" :datum="forecastData" />
      </template>
    </div>
  </div>
</template>

<script>
  import { D3LineChart } from "vue-d3-charts";

  export default {
    name: "ForecastGraph",
    components: {
      D3LineChart,
    },
    props: {
      forecastDataList: Array,
    },
    data() {
      return {
        forecastData: Array,
        chart_config: {
          date: {
            key: "date",
            inputFormat: "%Y-%m-%d",
            outputFormat: "%m-%d",
          },
          values: [ "temp_max" ],
          axis: {
            yTitle: "Maximum Temperature",
            xTitle: false,
            yFormat: ".0f",
            xFormat: "%m-%d",
            yTicks: 10,
            xTicks: 3,
          },
          color: {
            key: false,
            keys: false,
            scheme: false,
            current: "#1f77b4",
            default: "#AAA",
            axis: "#000",
          },
          curve: "curveLinear",
          margin: {
            top: 20,
            right: 20,
            bottom: 20,
            left: 40,
          },
          points: {
            visibleSize: 3,
            hoverSize: 6,
          },
          tooltip: {
            labels: false,
          },
          transition: {
            duration: 350,
            ease: "easeLinear",
          },
        },
      };
    },
    computed: {
      updateForecastData: function () {
        this.forecastData = this.$props.forecastDataList;
        return this.forecastData;
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>