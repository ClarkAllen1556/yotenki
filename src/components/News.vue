<template>
  <div id="news">
    <b-card-header style="padding: 1em;">
      <b-icon-newspaper />
      {{ newsArticles.length + $t('labels.newsCount') }}
    </b-card-header>
    <b-row v-if="updateNewsArticles.length === 0" no-gutters>
      <b-col class="text-center">
        <template>
          <div style="padding: 1em;">
            <h4>{{ $t('labels.newsContainerBlank')}}</h4>
            <div style="font-size: 4rem;">
              <b-icon-newspaper class="rounded p-2" rotate="45" />
            </div>
          </div>
        </template>
      </b-col>
    </b-row>
    <div v-else v-for="(art, i) in updateNewsArticles" :key="i">
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
              <b-card-img-lazy
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