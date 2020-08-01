<template>
  <div id="loc">
    <template v-for="(data, i) in updateLocationInfo">
      <h4 class="loc-print" :key="i">
        {{ data }}
        <slot v-if="data && i !== 'area'">、</slot>
      </h4>
    </template>
  </div>
</template>

<script>
  export default {
    name: "LocationInfo",
    props: {
      locationData: {
        prefecture: String,
        city: String,
        area: String,
      },
    },
    data() {
      return {
        location: {},
      };
    },
    methods: {
      printLocation: function () {
        return this.location;
      },
    },
    computed: {
      updateLocationInfo: function () {
        this.location = this.$props.locationData;
        return this.location;
      },
    },
  };
</script>

<style lang="scss" scoped>
  #loc {
    min-height: 3em;
  }
  .loc-print {
    display: inline-block;
  }
</style>