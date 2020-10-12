<template>
  <div class="cart">
    <Scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartlist"
        :key="index"
        :itemInfo="item"
      ></cart-list-item>
    </Scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(["cartlist"])
  },
  activated() {
    this.$refs.scroll.refresh();
  }
};
</script>

<style scoped>
.cart {
  height: calc(100vh - 44px - 49px - 40px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>
