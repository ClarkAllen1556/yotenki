<template>
  <div id="nav">
    <b-navbar class="rounded-bottom navi">
      <b-navbar-brand>
        <b-img
          id="logo"
          class="d-inline-block align-middle"
          rounded
          :src="require('../assets/logo.png')"
          alt="Yo. Tenki"
        />
      </b-navbar-brand>
      <b-navbar-nav>
        <b-input-group :prepend="$t('forms.postalCodeLabel')">
          <b-form-input
            v-model="postalCode"
            id="postal-input"
            :placeholder="$t('forms.postalCodeInput')"
            v-b-tooltip.hover
            title="0000-0000"
          />

          <b-input-group-append>
            <b-button
              variant="primary"
              type="submit"
              @click="emitSearchButton"
              v-b-tooltip.hover
              :title="$t('forms.searchButtonToolTip')"
            >
              <b-icon-search />
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
  export default {
    name: "Navbar",
    data() {
      return {
        postalCode: "",
      };
    },
    methods: {
      emitSearchButton: function () {
        try {
          if (this.postalCode.length < 7)
            throw new Error(`Postal code is invalid: ${this.postalCode}`);

          if (!this.postalCode.includes("-"))
            this.postalCode = this.postalCode.slice(0, 3) + "-" + this.postalCode.slice(3, 7)

          this.$emit("EMIT_SEARCH", this.postalCode);
        } catch (e) {
          alert(e);
          this.$log.error(e);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  #logo {
    height: 3em;
    width: 3em;
  }

  .navi {
    // margin-bottom: 1em;
  }
</style>