<template>
  <div class="g2-notice-detail">
    <header class="notice-detail-title g2-text-header">{{title}}</header>
    <sub class="notice-detail-sub">
      <span>发布时间： {{time | date_format("YYYY-MM-DD")}}</span>
      <span>|</span>
      <span>发布人： {{createName}}</span>
    </sub>
    <div class="notice-detail-content" v-html="content"></div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "g2NoticeDetail",
  data() {
    return {
      type: undefined,
      id: undefined
    };
  },
  computed: {
    ...mapState("home/detail", {
      title: "title",
      time: "time",
      content: "content",
      createName: "createName"
    })
  },
  created() {
    let { type, id } = this.$route.params;
    this.loadArticleDetail(type, id);
  },
  mounted() {},
  watch: {},
  methods: {
    /**
     * 根绝 type 的不同 加载不懂类型的文章
     */
    loadArticleDetail(type, id) {
      this.$vux.loading.show({
        text: "加载中..."
      });

      this.$store
        .dispatch("home/detail/fnLoadArticleDetail", {
          type,
          id
        })
        .then(result => {
          this.$vux.loading.hide();
        })
        .catch(_ => {
          // 显示文字
          this.$vux.toast.show({
            type: "warn",
            position: "middle",
            text: "加载内容失败。"
          });
          this.$vux.loading.hide();
        });
    }
  }
};
</script>

<style scoped lang="scss" src="./index.scss">
</style>
