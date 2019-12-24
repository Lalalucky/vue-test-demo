<template>
    <div class="page_msg">

        <div class="msg_icon-weixin">
            <i class="f-icon"></i>
        </div>
        <div class="msg-txt">
            请在微信客户端打开链接
        </div>

    </div>
</template>
<style lang="scss" scoped>
@import "~@scss/helpers/_color.scss";
@import "~@scss/helpers/_text.scss";
@import "~@scss/helpers/_mixins.scss";
@import "~@scss/helpers/_utils.scss";
@import "~@scss/themes/index.scss";

.page_msg {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;

  .msg_icon-weixin {
    margin-top: 2.666667rem;
    padding: 0.266667rem 0;
    text-align: center;
    i.f-icon{
        background:url('~@static/img/weixin.png') 0 0 no-repeat;
        background-size: 2.666667rem 2.666667rem;
        width: 2.666667rem;
        height: 2.666667rem;
    }
  }
  .msg-txt {
    @include font-dpr(16px);
    line-height: 2;
    color: #333333;
    text-align: center;
  }
}
</style>

