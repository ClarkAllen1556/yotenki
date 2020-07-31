<template>
  <div id="app">
    <b-container fluid>
    <Navbar @EMIT_SEARCH="storeUserQuery"/>
    <b-row>
      <router-view />
    </b-row>
    </b-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"

export default {
  name: "App",
  components: {
    Navbar
  },
  methods: {
    storeUserQuery: function (params) {


    }
  }
}
</script>
<style lang="scss">

</style>
