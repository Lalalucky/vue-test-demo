<template>
  <div class="yjz-home">
    <scroller
      use-pullup
      :pullup-config="pullupDefaultConfig"
      @on-pullup-loading="loadMore"
      use-pulldown
      :pulldown-config="pulldownDefaultConfig"
      @on-pulldown-loading="refresh"
      lock-x
      ref="scrollerBottom"
      height="-48"
    >
      <div class="box1">
        <g2NoticeCard
          v-for="item in list"
          :key="item.id"
          :time="item.time"
          :title="item.title"
          :intro="item.intro"
          :id="item.id"
          :type="type"
        ></g2NoticeCard>
      </div>
    </scroller>
  </div>
</template>
<script>
import { Scroller, Card } from "vux";
import { mapState, mapGetters } from "vuex";
import g2NoticeCard from "@/pages/Home/Notice-list/components/notice-card.vue";

const pulldownDefaultConfig = {
  content: "下拉刷新",
  height: 40,
  autoRefresh: false,
  downContent: "下拉刷新",
  upContent: "释放后刷新",
  loadingContent: "正在刷新...",
  clsPrefix: "xs-plugin-pulldown-"
};
const pullupDefaultConfig = {
  content: "上拉加载更多",
  pullUpHeight: 60,
  height: 40,
  autoRefresh: false,
  downContent: "释放后加载",
  upContent: "上拉加载更多",
  loadingContent: "加载中...",
  clsPrefix: "xs-plugin-pullup-"
};
export default {
  name: "LoginPage",
  components: {
    Scroller,
    Card,
    g2NoticeCard
  },
  data() {
    return {
      type: "1"
    };
  },
  computed: {
    ...mapGetters("home/list", {
      currentPage: "g_page_currentPage",
      pageNumber: "g_page_pageNumber",
      totalNumber: "g_page_totalNumber",
      list: "g_list"
    })
  },
  created() {
    let { type } = this.$route.params;
    this.type = type;
    this.$store.commit("home/list/s_type", type);
    this.loadContent(type);
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.scrollerBottom.reset({ top: 0 });
    });
  },
  data() {
    return {
      pullupDefaultConfig: pullupDefaultConfig,
      pulldownDefaultConfig: pulldownDefaultConfig
    };
  },
  methods: {
    /**
     * 上拉刷新，此时需要重置分页和数据
     */
    refresh() {
      this.$store.commit("home/list/s_page", {
        currentPage: 1
      });
      this.loadContent();
    },
    loadMore() {
      this.$vux.loading.show({
        text: "加载中..."
      });
      this.$store
        .dispatch("home/list/fnLoadMore", {
          type: this.type
        })
        .then(result => {
          let { page } = result;
          this.$vux.loading.hide();
          debugger;
          // 没有更多数据了
          if (page.currentPage >= page.totalPage) {
            // 这是没有跟多数据了
            this.$nextTick(() => {
              this.$refs.scrollerBottom.disablePullup();
            });
          } else {
            // 这是没有跟多数据了
            this.$nextTick(() => {
              this.$refs.scrollerBottom.donePullup();
            });
          }
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
    },
    loadContent() {
      this.$vux.loading.show({
        text: "加载中..."
      });

      this.$store
        .dispatch("home/list/fnLoadAllNews", {
          type: this.type
        })
        .then(result => {
          let { page } = result;
          this.$vux.loading.hide();
          // 第一页 禁止上拉刷新
          if (page.currentPage === 1) {
            this.$nextTick(() => {
              this.$refs.scrollerBottom.donePulldown();
            });
          }
          // 没有更多数据了
          if (page.currentPage >= page.totalPage) {
            // 这是没有跟多数据了
            this.$nextTick(() => {
              this.$refs.scrollerBottom.disablePullup();
            });
          }
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