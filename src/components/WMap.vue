<template>
  <div id="w-el">
    <l-map id="map"
      :zoom="zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
    >

      <l-tile-layer :url="map" :center="changeCoords"></l-tile-layer>
      <l-marker :lat-lng="center" ></l-marker>
      <l-tile-layer :url="weatherMap"></l-tile-layer>
    </l-map>
  </div>
</template>

<script>
  import "leaflet/dist/leaflet.css";
  import { LMap, LTileLayer, LMarker } from "vue2-leaflet";

  export default {
    name: "WMap",
    components: {
      LMap,
      LTileLayer,
      LMarker
    },
    props: {
      coords: Array
    },
    data() {
      return {
        map: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        wData: {},
        weatherMap:
          "https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=a243fbc125c986c3dd41cc3ae886796d",
        zoom: 10,
        center: [35,139],
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
      }
    },
    computed: {
      changeCoords: function() {
        this.center = this.$props.coords
        return this.center
      }
    }
  };
</script>

<style lang="scss" scoped>
  #w-el {
    height: 25em;
  }
  #map {
    height: 100%;
    width: 100%;
  }
</style>
