<template>
    <div class="yjz-layout">
        <div class="yjz-layout-wrapper">
            <router-view></router-view>
        </div>
        
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { Drawer } from "@ui/index.js"
import { Tabbar, TabbarItem, Group, Cell } from "@ui/index.js"
export default {
    name: "Index",
    components: {
        Tabbar, TabbarItem, Group, Cell
    },
    data() {
        return {
            selected: ''
        }
    },
    computed: {
        
    },
    created() {
        // 组件创建完后获取数据，
        // // 此时 data 已经被 observed 了
        // this.fetchData();
        // this.loadMessageNum();
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': 'fetchData'
    },
    methods: {
        fetchData() {
            switch (this.$route.path) {
                case '/mine':
                    this.selected = 'mine';
                    break;
                case '/info':
                    this.selected = 'info';
                    break;
                case '/service':
                    this.selected = 'service';
                    break;
                case '/goods':
                    this.selected = 'goods';
                    break;
                default:
                    this.selected = '';
            }
        },

        loadMessageNum(){
             let self = this;
            this.$vux.loading.show({
                text: '加载数据中...'
            })
            this.$store.dispatch('message/loadMessageNum').then(res => {
                this.$vux.loading.hide();
            }).catch(error => {
                this.$vux.loading.hide()
                this.$vux.toast.show({
                    text: '加载数据失败。',
                    type: "text",
                    time: 2000,

                })
            })
        },
    }
}
</script>
<style lang="scss">
@import "~@scss/helpers/_mixins.scss";

</style>

