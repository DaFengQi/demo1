<template>
  <Tabbar>
    <TabbarItem path="/home">
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" />
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" />
      <div slot="item-text">首页</div>
    </TabbarItem>
    <TabbarItem path="/category">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg" />
      <img
        slot="item-icon-active"
        src="~assets/img/tabbar/category_active.svg"
      />
      <div slot="item-text">分类</div>
    </TabbarItem>
    <TabbarItem path="/shopcart">
      <img slot="item-icon" src="~assets/img/tabbar/cart.svg" />
      <img slot="item-icon-active" src="~assets/img/tabbar/cart_active.svg" />
      <div slot="item-text">购物车</div>
    </TabbarItem>
    <TabbarItem path="/profile">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg" />
      <img
        slot="item-icon-active"
        src="~assets/img/tabbar/profile_active.svg"
      />
      <div slot="item-text">我的</div>
    </TabbarItem>
  </Tabbar>
</template>

<script>
import Tabbar from "../../common/tabbar/Tabbar";
import TabbarItem from "components/common/tabbar/TabbarItem";
export default {
  name: "MainTabBar",
  components: {
    Tabbar,
    TabbarItem
  }
};
</script>

<style></style>
