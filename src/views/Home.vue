<template>
  <div class="home">
    <b-row>
      <b-col fluid> Weather forcast for: </b-col>
    </b-row>
    <b-row>
      <b-col fluid> <LocationInfo :locationData="updateLocationData" /> </b-col>
    </b-row>
    <b-row>
      <b-col>[weather.cards]</b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card>
          <WMap :wMap="mapWeather()" :bMap="mapBase()" />
        </b-card>
      </b-col>
      <b-col>
        <b-card>[free.space]</b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import WMap from "@/components/WMap.vue";
  import apiConfig from "../../api.config";
  import LocationInfo from "@/components/LocationInfo.vue"

  export default {
    name: "Home",
    components: {
      WMap,
      LocationInfo
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
      }
    }
  };
</script>
