<template>
  <div id="nav">
    <b-nav>
      <b-navbar-brand>Yo. Tenki</b-navbar-brand>
      <b-navbar-nav>
        <b-input-group prepend="Postal Code">
          <b-form-input
            v-model="postalCode"
            id="postal-input"
            placeholder="Enter a postal code"

          />

          <b-input-group-append>
            <b-button variant="primary" type="submit" @click="emitSearchButton">Find weather</b-button>
          </b-input-group-append>

        </b-input-group>
      </b-navbar-nav>
    </b-nav>
  </div>
</template>

<script>
  export default {
    name: "Navbar",
    data() {
      return {
        postalCode: ""
      }
    },
    methods: {
      emitSearchButton: function () {
        try {
          if (this.postalCode.length < 7)
            throw new Error(`Postal code is invalid: ${this.postalCode}`)

          this.$emit('EMIT_SEARCH', this.postalCode)
        } catch (e) {
          alert(e)
          this.$log.error(e)
        }
      }
    }
  };
</script>

<style>
</style>