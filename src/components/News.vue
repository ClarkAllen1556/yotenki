<template>
  <div id="news-el">
    <div>{{ newsArticles.length }}: news articles found...</div>
    <b-list-group>
      <b-list-group-item v-for="(art, i) in updateNewsArticles" :key="i">
        <template>
          <b-card no-body class="overflow-hidden" style="max-width: 100%; max-height: 10em;">
            <b-row no-gutters>
              <b-col md="6">
                <b-card-img
                  :src="art.thumb"
                  alt="Article thumbnail"
                  class="rounded-0"
                  style="min-height: 100%;"
                />
              </b-col>
              <b-col md="6">
                <b-card-body>
                  <b-card-text class="overflow-auto" style="text-align: right">{{ art.title }}</b-card-text>
                </b-card-body>
                <b-card-footer>
                  <span>{{ art.published }} {{ art.source }}</span>
                </b-card-footer>
              </b-col>
            </b-row>
          </b-card>
        </template>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
  export default {
    name: "News",
    props: {
      articleList: Array,
    },
    data() {
      return {
        newsArticles: Array,
      };
    },
    computed: {
      updateNewsArticles: function () {
        this.newsArticles = this.$props.articleList;
        return this.newsArticles;
      },
    },
  };
</script>

<style lang="scss" scoped>
  #news-el {
    height: 25em;
  }
</style>