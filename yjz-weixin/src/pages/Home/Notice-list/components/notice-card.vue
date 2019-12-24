<template>
  <div class="g2-notice">
    <div class="notice-time">
      <span class="g2-time">{{formatTime}}</span>
    </div>
    <Card class="g2-card">
      <header slot="header" class="card-header">
        <div>{{title}}</div>
      </header>
      <main slot="content" class="card-content">{{intro}}</main>
      <footer slot="footer" class="card-footer" @click="handleClickGotoDetail">
        <span>查看详情</span>
        <span>
          <i class="iconfont icon-arrow"></i>
        </span>
      </footer>
    </Card>
  </div>
</template>

<script>
import { Scroller, Card } from "vux";
import { formateDateLocal } from "@/utils/date";

export default {
  name: "g2NoticeCard",
  props: ["time", "title", "type", "intro", "id"],
  components: {
    Card
  },
  data() {
    return {};
  },
  computed: {
    formatTime() {
      return formateDateLocal(new Date(this.time).getTime() / 1000);
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    handleClickGotoDetail() {
      this.$router.push({
        path: `/home/detail/${this.type}/${this.id}`
      });
    }
  }
};
</script>

<style lang="scss" src="./notice-card.scss">
</style>
