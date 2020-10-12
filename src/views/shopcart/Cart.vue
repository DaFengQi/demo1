<template>
  <div class="Cart">
    <NavBar class="navbar">
      <div slot="center">购物车（{{ cartLength }}）</div>
    </NavBar>
    <!-- 商品列表 -->
    <CartList></CartList>

    <!-- 底部汇总 -->
    <CheckButtonBar></CheckButtonBar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childcomps/CartList";
import CheckButtonBar from "./childcomps/CheckButtonBar";

import { mapGetters } from "vuex";

export default {
  components: {
    NavBar,
    CartList,
    CheckButtonBar
  },
  computed: {
    ...mapGetters(["cartLength", "cartlist"])
  }
};
</script>

<style>
.navbar {
  background-color: var(--color-tint);
  color: #ffffff;
  font-weight: 700;
}
</style>
