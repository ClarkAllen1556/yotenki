<template>
  <div id="about">
    <b-row>
      <b-col>
        <b-card>
          <b-card-header>
            {{ $t('labels.about') }}
          </b-card-header>
          <b-card-body style="margin: 5em">
            <AboutPage />
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import AboutPage from '../assets/About.md'

export default {
  name: "About",
  components: {
    AboutPage
  }
}
</script>