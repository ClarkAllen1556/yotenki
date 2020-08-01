<template>
  <div id="w-map" style="height: 20em;">
    <l-map
      style="height: 100%; width: 100%"
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
</template>

<script>
  import "leaflet/dist/leaflet.css";
  import { LMap, LTileLayer } from "vue2-leaflet";

  export default {
    name: "WMap",
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
        zoom: 10,
        center: [35.75, 139.69],
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
    watch: {
      changeCoords: function() {
        this.center[this.$store.getCoordLon, this.$store.getCoordLon]
      }
    }
  };
</script>
