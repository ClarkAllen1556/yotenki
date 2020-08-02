<template>
  <div id="nav">
    <b-navbar class="rounded-bottom navi">
      <b-navbar-brand href="#/">
        <b-img
          id="logo"
          class="d-inline-block align-middle"
          rounded
          :src="require('../assets/logo.png')"
          alt="Yo. Tenki"
        />
      </b-navbar-brand>

      <b-navbar-nav>
        <b-nav-form>
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
        </b-nav-form>

        <b-nav-dropdown left>
          <template v-slot:button-content>{{ getCurrentLocale }}</template>
          <b-dropdown-item-button
            v-for="(lang, i) in locales"
            :key="`Lang${i}`"
            @click="$emit(`CHANGE_LOCALE`, lang)"
          >{{ lang }}</b-dropdown-item-button>
        </b-nav-dropdown>

        <b-nav-item href="#/about" v-b-tooltip.hover :title="$t('labels.aboutToolTip')"> {{ $t('labels.about') }} </b-nav-item>
        <b-nav-item href="#/"> <b-icon-house-fill v-b-tooltip.hover :title="$t('labels.homeIcon')" /> </b-nav-item>

      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
  export default {
    name: "Navbar",
    props: {
      currentLocal: String,
      localeList: Array,
    },
    data() {
      return {
        postalCode: "",
        locale: "",
        locales: this.$props.localeList,
      };
    },
    methods: {
      emitSearchButton: function () {
        try {
          if (this.postalCode.length < 7)
            throw new Error(`Postal code is invalid: ${this.postalCode}`);

          if (!this.postalCode.includes("-"))
            this.postalCode =
              this.postalCode.slice(0, 3) + "-" + this.postalCode.slice(3, 7);

          this.$emit("EMIT_SEARCH", this.postalCode);
        } catch (e) {
          alert(e);
          this.$log.error(e);
        }
      },
    },
    computed: {
      getCurrentLocale: function () {
        this.locale = this.$props.currentLocal;
        return this.locale;
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