<template>
  <b-container id="app" fluid>
    <b-row>
      <b-col>
        <Navbar
          @EMIT_SEARCH="storeUserQuery"
          @CHANGE_LOCALE="changeLocale"
          :currentLocal="getCurrentLocale"
          :localeList="getLocales"
        />
      </b-col>
    </b-row>
    <b-row style="padding: 1em">
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
    mounted() {
      if (localStorage.getItem("locale")) {
        this.changeLocale(localStorage.getItem("locale"));
      }
    },
    methods: {
      storeUserQuery: function (params) {
        this.$store.dispatch("updateMetaData", params);
      },
      changeLocale: function (params) {
        this.$store.dispatch("updateLocale", params);
        this.$i18n.locale = params;
      },
    },
    computed: {
      getCurrentLocale: function () {
        return this.$store.getters.getCurrentLocale;
      },
      getLocales: function () {
        return this.$store.getters.getLocales;
      },
    },
  };
</script>
