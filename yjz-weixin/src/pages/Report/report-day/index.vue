<template>
  <div class="g2-page-view">
    <div class="page-view-container">
      <ViewBox>
        <group title="所写内容会实时保存" class="g2-group">
          <XTextarea
            inline-desc
            title="今日的工作情况"
            :max="200"
            placeholder="补充说明"
            :rows="4"
            :cols="30"
            v-model="form.content"
            class="g2-textarea-column"
          ></XTextarea>
          <XTextarea
            inline-desc
            title="备注"
            :max="200"
            placeholder="补充说明"
            :rows="2"
            :cols="30"
            v-model="form.content"
            class="g2-textarea-column"
          ></XTextarea>
          <g2-uploader auto v-model="form.pics"></g2-uploader>
          <g2-uploader auto v-model="form.urlList"></g2-uploader>
          <g2-user-selected auto v-model="form.userList"></g2-user-selected>
        </group>
      </ViewBox>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import {
  Card,
  ViewBox,
  Group,
  Cell,
  PopupPicker,
  PopupRadio,
  Datetime,
  XTextarea,
  XInput,
  XButton
} from "vux";
export default {
  name: "g2ReportDay",
  components: {
    Card,
    ViewBox,
    Group,
    Cell,
    PopupPicker,
    PopupRadio,
    Datetime,
    XTextarea,
    XInput,
    XButton
  },
  data() {
    return {
      form: {
        content: "",
        pics: [],
        urlList: [],
        userList: []
      }
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {}
};
</script>

<style scoped lang="scss">
</style>
