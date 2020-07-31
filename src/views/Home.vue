<template>
  <div class="home">
    <b-row>
      <b-col fluid>[city.info]</b-col>
    </b-row>
    <b-row>
      <b-col>[weather.cards]</b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card>
          <WMap />
        </b-card>
      </b-col>
      <b-col>
        <b-card>
          [free.space]
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import WMap from "@/components/WMap.vue";

  export default {
    name: "Home",
    components: {
      WMap,
    },
  };
</script>
