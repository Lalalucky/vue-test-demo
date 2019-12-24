<template>
  <div>
    <g2UserCard></g2UserCard>
    <!-- <group class="g2-oa-group" style="margin-top:.533333rem">
      <cell title="个人信息" is-link link="/my/setting"></cell>
    </group> -->
  </div>
</template>

<script>
import { Cell, CellBox, CellFormPreview, Group, Badge } from "vux";

import g2UserCard from "@/pages/Profile/Home/components/user-card.vue";

export default {
  name: "g2ProfileHome",
  props: {},
  components: {
    g2UserCard,
    Cell,
    CellBox,
    CellFormPreview,
    Group,
    Badge
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {}
};
</script>

<style lang="scss" src="./index.scss">
</style>
