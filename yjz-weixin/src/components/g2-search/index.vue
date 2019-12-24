<template>
  <div class="g2-search g2-header-fixed" :class="[ dialog.visible ? 'is-open' : '' ]">
    <div class="search-header">
      <div class="search-header-input" @click="hanleClickOpenSearch">
        <i class="iconfont icon-search"></i>
        <input class="search-header__input" placeholder="搜索" ref="input">
        <i class="iconfont icon-guanbi search-header-input-right" @click="hanleClickCloseSearch"></i>
      </div>
      <span class="header-actions" v-if="!dialog.visible">
        <i class="iconfont icon-shaixuan g2-icon is-large"></i>
      </span>
      <span class="header-actions" v-else @click="handleClickSearch">搜索</span>
    </div>
    <transition name="collapse-top">
      <div class="g2-search-wrapper" v-show="dialog.visible">
        <slot name="list" v-if="list && list.length" :list="list"></slot>
        <div class="g2-search-prompt" v-else>
          <div class="g2-icon">
            <i class="iconfont icon-search"></i>
          </div>
          <div class="g2-text-info g2-m-t">输入关键词搜索</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import g2CollapseTransition from "@/plugins/transitions/collapse-transition.js";
import * as api from "@/api/crm/client";
export default {
  name: "g2Search",
  props: {},
  components: {
    g2CollapseTransition
  },
  data() {
    return {
      dialog: {
        visible: false
      },
      list: [],
      page: {
        currentPage: 1,
        pageNumber: 10
      }
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    hanleClickOpenSearch() {
      this.dialog.visible = true;
    },
    hanleClickCloseSearch() {},
    handleClickSearch() {
      let obj = {
        page: {
          currentPage: 1,
          pageNumber: 10
        }
      };
      api
        .selectClientsByPage(obj)
        .then(response => {
          let { respCode, respMsg, result } = response;
          if (response.respCode !== "0") {
            // reject(response.respMsg);
          }
          // if (isConcat) {
          this.list = this.list.concat(response.result.list);
          // } else {
          //   this.list = response.result.list;
          // }
          this.page = response.result.page;
        })
        .catch(error => {
          // reject(error);
        });
    }
  }
};
</script>

<style  lang="scss" src="./index.scss">
</style>
