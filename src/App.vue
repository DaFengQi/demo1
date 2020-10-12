<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <MainTabBar></MainTabBar>
    <Icon></Icon>
    <SvgIcon></SvgIcon>
  </div>
</template>

<script>
// import MainTabBar from "components/content/MainTabBar/MainTabBar";
import MainTabBar from "./components/content/MainTabBar/MainTabBar";
import Icon from "./components/content/Icon/Icon";
import SvgIcon from "./components/content/Icon/svg";

export default {
  name: "app",
  components: {
    MainTabBar,
    Icon,
    SvgIcon
  }
};
</script>
<style>
@import url("./assets/css/base.css");
</style>
