<template>
  <b-container id="app" fluid>
    <b-row>
      <b-col>
        <Navbar @EMIT_SEARCH="storeUserQuery" />
      </b-col>
    </b-row>
    <b-row style="padding: 1em;">
      <b-col>
        <router-view />
      </b-col>
    </b-row>
  </b-container>
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
        this.$store.dispatch("updateMetaData", params);
      },
    },
  };
</script>
