<template>
  <b-col fluid>
    <div style="height: 350px;">
      <l-map
        style="height: 80%; width: 100%"
        :zoom="zoom"
        :center="center"
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
        @update:bounds="boundsUpdated"
      >
        <l-tile-layer :url="map"></l-tile-layer>
        <l-tile-layer :url="weatherMap"></l-tile-layer>
      </l-map>
    </div>
  </b-col>
</template>

<script>
  import "leaflet/dist/leaflet.css";
  import { LMap, LTileLayer } from "vue2-leaflet";

  export default {
    components: {
      LMap,
      LTileLayer,
    },
    data() {
      return {
        map: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        wData: {},
        weatherMap:
          "https://tile.openweathermap.org/map/precipitation/{z}/{x}/{y}.png?appid=a243fbc125c986c3dd41cc3ae886796d",
        weatherAPI:
          "http://api.openweathermap.org/data/2.5/weather?zip=174-0073,jp&appid=a243fbc125c986c3dd41cc3ae886796d",
        zoom: 3,
        center: [47.41322, -1.219482],
        bounds: null,
      };
    },
    methods: {
      zoomUpdated(zoom) {
        this.zoom = zoom;
      },
      centerUpdated(center) {
        this.center = center;
      },
      boundsUpdated(bounds) {
        this.bounds = bounds;
      },
      printWeather: function () {
        // return this.wData.weather[0].description
      },
    },
    mounted() {
      fetch(this.weatherAPI)
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          // this.$data.wData = data
          this.wData = data;
        });
    },
  };
</script>
