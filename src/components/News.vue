<template>
  <div id="news">
    <b-card-header>{{ newsArticles.length }}: news articles found...</b-card-header>
    <div v-if="updateNewsArticles.length === 0">
      <template>
        <h4 style="text-align: center;">If there is news happening in the searched location you can read it here.</h4>
      </template>
    </div>
    <div
      v-else
      v-for="(art, i) in updateNewsArticles"
      :key="i"
    >
      <template>
        <b-card
        :href="art.url"
        no-body
        class="overflow-hidden news-el"
        style="max-width: 100%; max-height: 10em;"
        >
          <a :href="art.url" class="stretched-link" />
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
      </div>
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
  .news-el {
    margin: 0.25em;
    box-shadow: none;
  }
  .news-el:hover {

  }
  #news {
    height: 25em;
  }
</style>