<template>
  <div id="app">
    <b-container fluid="sm">
      <b-row>
        <b-col xl="auto">
          <Navbar @EMIT_SEARCH="storeUserQuery" />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <router-view />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import Navbar from "@/components/Navbar.vue";

  export default {
    name: "App",
    components: {
      Navbar,
    },
    methods: {
      storeUserQuery: function (params) {
        this.$store.dispatch("updateCode", params);
      },
    },
  };
</script>
<style lang="scss">
</style>
